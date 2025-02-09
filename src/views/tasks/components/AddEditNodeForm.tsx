import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Button, Checkbox, DatePicker, Dialog, Radio, Select, Switcher, TimeInput } from '@/components/ui'
import { RemoveElement, ViewElement } from '../TaskForm/AddEditTaskModalComponents'
import CreatableSelect from 'react-select/creatable'
import { RichTextEditor } from '@/components/shared'
import { deleteTask, getTasks, useAppDispatch, useAppSelector } from '../store'
import { setSelectedTask, toggleDeleteConfirmation } from '../store'
import { apiCreateTask, apiPutTask } from '@/services/SalesService'
import { getFormFields, getNewId } from '@/utils/helper'
import { childFormFields, rowNestedFormData } from '@/constants/tree.constant'
import { FormModel, INode, IOption, IRowNestedFormState, NodeFormProps, NodeFormSchema } from '../type'
const AddEditNodeForm = forwardRef((props: NodeFormProps, formRef) => {
    const rowNestedFormState:IRowNestedFormState = { data: rowNestedFormData, action: 'none' }
    const [showNestedDialog, setShowNestedDialog] = useState(false);
    const dispatch = useAppDispatch()

    const [nestedFormData, setNestedFormData] = useState<IRowNestedFormState>(rowNestedFormState);
    const handleClose = () => {
        setNestedFormData(rowNestedFormState)
        setShowNestedDialog(false)
    };
    const nestedFormRef = useRef(null)
    const {
        disableSubmit = false,
        handleSubmit,
        data,
        fetchData
    } = props
    let parseData = JSON.parse(JSON.stringify(data))
    let formaData = { ...parseData }
    delete formaData.id
    delete formaData.children
    delete formaData.color
    delete formaData.isExpanded
    delete formaData.parent_id
    // delete formaData.nestedLevelOff
    // delete formaData.childFormType

    let validationObj: any = {
    }
    if (validationObj) {
        Object.keys(formaData).forEach(key => {
            validationObj[key] = Yup.string()
                .required(`Please add ${key}`)
                .label(key) // 
        })
    }

    const validationSchema = Yup.object().shape({
        ...validationObj
    })

    let initialValuesObj: any = {}

    Object.keys(formaData).forEach(key => {
        initialValuesObj[key] = formaData[key]
    })



    const onNestedFormSubmit = () => {
        if (data.children) {
            // @ts-ignore

            let nestedFormRefCurrentValues = nestedFormRef?.current?.values || {}
            if (nestedFormData.action == 'add') {
                const newId = getNewId(data.children.length > 0 ? `${data.children.map(child => child.id)[data.children.length - 1]}` : `${data.id}`)
                const addTask = async (data: any) => {
                    const response = await apiCreateTask<boolean, FormModel>(data)
                    return response.data
                }
                const addData = async () => {
                    const success = await addTask({ ...nestedFormRefCurrentValues, id: newId })
                    if (success) {
                        data.children && data.children.push({ ...nestedFormRefCurrentValues, id: newId })
                        fetchData()
                    }
                }
                addData()

            } else if (nestedFormData.action == 'update') {
                const updateTask = async (data: any) => {
                    const response = await apiPutTask<boolean, FormModel>(data)
                    console.log(response)
                    return response.data
                }
                const updateData = async () => {
                    const success = await updateTask({ ...nestedFormData.data, ...nestedFormRefCurrentValues })
                    if (success) {
                        fetchData()
                        console.log('update success.....')
                        data.children = data.children && data.children.map((child, i) => child.id === nestedFormData.data.id ? { ...nestedFormData.data, ...nestedFormRefCurrentValues } : child)
                    } else {
                        console.log('not update')
                    }
                }
                updateData()
            } else if (nestedFormData.action == 'delete') {
                const deleteData = async () => {
                    if (data.children) {
                        const success = await deleteTask({ id: `${nestedFormData.data.id}` })
                        dispatch(toggleDeleteConfirmation(true))
                        if (success) {
                            dispatch(toggleDeleteConfirmation(false))
                            dispatch(setSelectedTask(nestedFormData.data.id))
                            data.children = data.children.filter((child, i) =>
                                child.id !== nestedFormData.data.id)

                            fetchData()
                        } else {
                            dispatch(toggleDeleteConfirmation(false))
                        }
                    }
                }
                deleteData()

            }
        }
        handleClose()
    }


    const onAction = (action?: string, record?: INode) => {
        if (action === 'add') {
            setShowNestedDialog(true)
            record && setNestedFormData({ data: { ...record, childFormType: `${`${data.id}`.length + 3}` }, action: "add" })
        } else if (action === 'update') {
            setShowNestedDialog(true)
            record && setNestedFormData({ data: record, action: "update" })
        } else if (action === 'delete') {
            setShowNestedDialog(true)
            record && setNestedFormData({ data: record, action: "delete" })
        }
    }

    const FormInputType = ({ type, data, values }: { type: string, values: any, data: any }) => {
        let InputElement = <h1></h1>
        switch (type) {
            case 'text':
                InputElement = <Field
                    type="text"
                    name={data.key}
                    placeholder={data.key}
                    component={Input}
                />

                break;
            case 'number':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (

                        <Input
                            {...field}
                            type="text"
                            maxLength={2}
                            placeholder={data.key}
                            value={values[data.key]}
                            onChange={(e) => form.setFieldValue(field.name, `${e.target.value}`.replace(/\D/g, ""))}
                        />

                    )}
                </Field>

                break;
            case 'select':
                InputElement = <Field
                    name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <Select
                            field={field}
                            form={form}
                            options={data.options}
                            value={data.options.filter(
                                (option: IOption) =>
                                    option.value ==
                                    values[data.key]
                            )}
                            onChange={(option) =>
                                form.setFieldValue(
                                    field.name,
                                    option?.value
                                )
                            }
                        />
                    )}
                </Field>


                break;
            case 'multi_select':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <Select
                            isMulti
                            componentAs={CreatableSelect}
                            field={field}
                            form={form}
                            options={childFormFields[`${data.childFormType}`][data.key]['option']}
                            value={values.tags}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option)
                            }
                        />
                    )}
                </Field>


                break;
            case 'textarea':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <RichTextEditor
                            value={`${field.value}`}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>


                break;
            case 'date':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <DatePicker
                            field={field}
                            form={form}
                            value={values[data.key]}
                            onChange={(date) => {
                                console.log(`${date}`)
                                form.setFieldValue(
                                    field.name,
                                    `${date}`
                                )
                            }}
                        />
                    )}
                </Field>


                break;
            case 'time':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <TimeInput
                            field={field}
                            form={form}
                            value={values[data.key]}
                            onChange={(time) => {
                                form.setFieldValue(
                                    field.name,
                                    time
                                )
                            }}
                        />
                    )}
                </Field>


                break;
            case 'multi_checkbox':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (

                        <Checkbox.Group
                            value={`${values[data.key]}`.split(',')}
                            onChange={(options) => {

                                {
                                    console.log('options', options)
                                    form.setFieldValue(
                                        field.name,
                                        options.join(','),
                                    )
                                }
                            }
                            }
                        >
                            {data.options && data.options.map((i: IOption, index: number) => {
                                return (
                                    <Checkbox name={field.name} key={index} value={i.value}>{i.label}</Checkbox>
                                )
                            }
                            )}
                        </Checkbox.Group>
                    )}
                </Field>
                break;
            case 'radio':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (

                        <Radio.Group
                            value={values[data.key]}
                            onChange={(val) =>
                                form.setFieldValue(
                                    field.name,
                                    val
                                )
                            }
                        >
                            {
                                data.options && data.options.map((i: IOption, index: number) => {
                                    return (
                                        <Radio key={index} value={i.value}>{i.label}</Radio>
                                    )
                                }
                                )}
                        </Radio.Group>
                    )}
                </Field>
                break;
            case 'switch':
                InputElement = <Field name={data.key}>
                    {({
                        field,
                        form,
                    }: FieldProps<FormModel>) => (
                        <Switcher
                            checked={values[data.key] == true}
                            // @ts-ignore
                            onClick={() => {
                                form.setFieldValue(
                                    field.name,
                                    !values[data.key]
                                )
                            }
                            }
                        />

                    )}
                </Field>
                break;
            default:
                InputElement = <Field
                    type="text"
                    name="input"
                    placeholder="Input"
                    component={Input}
                />
                break;
        }
        return InputElement
    }




    const test = () => {
         
    }
    return (
        <div  >

            <h3 onClick={test}> Add/Edit Nodes </h3>
            <br />
            <Formik
                // @ts-ignore
                innerRef={formRef}
                initialValues={{
                    ...initialValuesObj
                }}
                validationSchema={validationSchema}
                onSubmit={(values: NodeFormSchema, { setSubmitting }) => {
                    if (!disableSubmit) {
                        // onSignIn(values, setSubmitting)
                        handleSubmit(values)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting, values }) => (
                    childFormFields[`${data.childFormType}`] && <Form>
                        <FormContainer>
                            {Object.keys(childFormFields[`${data.childFormType}`]).map(key => {
                                return (
                                    <div key={key}  >
                                        <FormItem
                                            label={key}
                                            invalid={
                                                (errors[key] && touched[key]) as boolean
                                            }
                                            errorMessage={`${errors[key]}`}
                                        >
                                            {
                                                (childFormFields[`${data.childFormType}`] && childFormFields[`${data.childFormType}`][key] && childFormFields[`${data.childFormType}`][key]['type'])
                                                    ?
                                                    <FormInputType
                                                        type={`${(childFormFields[`${data.childFormType}`] && childFormFields[`${data.childFormType}`][key] && childFormFields[`${data.childFormType}`][key]['type']) ? childFormFields[`${data.childFormType}`][key]['type'] : 'text'}`}
                                                        values={values}
                                                        data={{
                                                            key: key,
                                                            max_length: (childFormFields[`${data.childFormType}`][key] && childFormFields[`${data.childFormType}`][key]['max_length']) ? childFormFields[`${data.childFormType}`][key]['max_length'] : 100,
                                                            options: (childFormFields[`${data.childFormType}`][key] && childFormFields[`${data.childFormType}`][key]['option']) ? childFormFields[`${data.childFormType}`][key]['option'] : {}
                                                        }}
                                                    />
                                                    :
                                                    <FormInputType
                                                        type={'text'}
                                                        values={values}
                                                        data={{ key: key }}
                                                    />
                                            }
                                        </FormItem>
                                    </div>
                                )
                            })}
                        </FormContainer>
                    </Form>
                )}



            </Formik>
          
                <div className='form-child-list'>
                    {
                        !data.nestedLevelOff &&  data.id && !['24','2','15'].includes(`${`${data.id}`.length}`) &&
                        <div className='flex justify-between'>
                            <h5>Child nodes</h5>
                            <Button
                                size="sm"
                                className="ltr:mr-2 rtl:ml-2"
                                // @ts-ignore
                                onClick={() => onAction('add', { ...getFormFields(`${`${data.id}`.length + 3}`) })}
                                variant='solid'
                            >
                                Add child
                            </Button>

                        </div>}

                    {
                        (!data.nestedLevelOff && data.children && data.children.length  > 0 && data.id && !['24'].includes(`${`${data.id}`.length}`) )  ? (
                            <>

                                {data.children.map((child: INode, index: number) => {
                                    return (
                                        <div key={index} className='relative' >
                                            <Input
                                                asElement="input"
                                                disabled={true}
                                                name={child?.name}
                                                value={child?.name}
                                                field={'text'}
                                                suffix={<div className='flex align-center absolute right-[0px] top-[-10px] gap-1'>
                                                    <span className='cursor-pointer' onClick={() => onAction('update', { ...child, childFormType: `${`${child.id}`.length}` })}>🖊️</span>&nbsp;
                                                    <span className='cursor-pointer' onClick={() => onAction('delete', { ...child })}>❌</span>
                                                </div>}
                                            />

                                        </div>
                                    )
                                })}
                            </>) :
                            (
                                !data.nestedLevelOff && data.childFormType &&
                                <h3 className='text-center'>
                                    No record found
                                </h3>
                            )
                    }
                </div>
         


            <Dialog
                height={'auto'}
                isOpen={showNestedDialog}
                onClose={() => setShowNestedDialog(false)}
                children={
                    nestedFormData.action == 'delete' ?
                        <RemoveElement
                            data={nestedFormData.data}
                            formRef={nestedFormRef}
                            handleClose={handleClose}
                            onSubmitBtn={onNestedFormSubmit}
                        /> :
                        <ViewElement
                            data={{ ...nestedFormData.data, childFormType: nestedFormData.data.childFormType, nestedLevelOff: true }}
                            formRef={nestedFormRef}
                            handleSubmit={onNestedFormSubmit}
                            handleClose={handleClose}
                            // @ts-ignore
                            onSubmitBtn={() => nestedFormRef.current.handleSubmit()}
                        />}
            />

        </div>
    )
})

export default AddEditNodeForm
