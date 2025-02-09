import { useState, useEffect, forwardRef } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import hooks from '@/components/ui/hooks'
import NewTaskField from './NewTaskField'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, MultiValueGenericProps, OptionProps } from 'react-select'
import {
    getMembers,
    putProject,
    useAppDispatch,
    useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'
import { Radio } from '@/components/ui'
import { optIndex } from '@/utils/helper'

type FormModel = {
    answer: string

}

type TaskCount = {
    completedTask?: number
    totalTask?: number
}

const { MultiValueLabel } = components

const { useUniqueId } = hooks

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<{ img: string }>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${isSelected
                ? 'bg-gray-100 dark:bg-gray-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, ...props }: MultiValueGenericProps) => {
    const { img } = props.data

    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const validationSchema = Yup.object().shape({
    answer: Yup.string().required('Answer required')
    .test('blank string','Answer should not be blank',(value)=>{
        if (value !== '') {
            return true
        } else {
            return false 
        }
    })
})


export interface IQuizQue {
    question: string
    options: string[]
    answer: string
    id: string
}
const AnswerForm = forwardRef((props: { handleNext: (answer:number) => void, quizData: IQuizQue }, formRef) => {
    const { handleNext, quizData } = props
    const dispatch = useAppDispatch()
    const { id, question, answer, options } = quizData

    // const members = useAppSelector((state) => state.projectList.data.allMembers)

    const newId = useUniqueId('project-')

    const [taskCount, setTaskCount] = useState<TaskCount>({})

    // useEffect(() => {
    //     dispatch(getMembers())
    // }, [dispatch])

    const handleAddNewTask = (count: TaskCount) => {
        setTaskCount(count)
    }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const { answer } = formValue

        const { totalTask, completedTask } = taskCount
        handleNext(parseInt(answer))


     
    }

    const handlePrevious = () => {
        console.log('handlePrevious')
    }

    return (
        <Formik
            initialValues={{
                answer: '',
                isSubmited: false
            }}

            validationSchema={validationSchema}
            // @ts-ignore
            innerRef={formRef}
            onSubmit={(values, { setSubmitting }) => {

                onSubmit(values, setSubmitting)

            }}
        >
            {({ touched, errors, values, }) => (
                <Form >
                    <FormContainer >
                        <FormItem

                            asterisk
                            label={`${id}. ${question}`}
                            invalid={errors.answer && touched.answer}
                            errorMessage={errors.answer}
                        >
                            {!values.isSubmited &&

                                <Field name="answer" >
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Radio.Group
                                            // onClick={()=>console.log(values)   }

                                            className='flex flex-col gap-[20px]'
                                            value={values.answer}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={'1'} disabled={values.isSubmited} checked={values.answer == "1"} >{`${optIndex(1)}. ${options[0]}`}</Radio>
                                            <Radio value={'2'} disabled={values.isSubmited} checked={values.answer == "2"}>{`${optIndex(2)}. ${options[1]}`}</Radio>
                                            <Radio value={'3'} disabled={values.isSubmited} checked={values.answer == "3"}>{`${optIndex(3)}. ${options[2]}`}</Radio>
                                            <Radio value={'4'} disabled={values.isSubmited} checked={values.answer == "4"}>{`${optIndex(4)}. ${options[3]}`}</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            }

                            {values.isSubmited &&
                                <div className='flex flex-col  gap-[20px]'> 
                                    <Radio value={'1'} color={values.answer == "1" ? answer == "1" ? "green-500" : "yellow-500" : values.answer == "1" ? "green-500" : answer == "1" ? "green-500" : ""} checked={values.answer == "1"|| answer =="1"} >{`${optIndex(1)}. ${options[0]}`}</Radio>
                                    <Radio value={'2'} color={values.answer == "2" ? answer == "2" ? "green-500" : "yellow-500" : values.answer == "2" ? "green-500" : answer == "2" ? "green-500" : ""} checked={values.answer == "2"|| answer =="2"}>{`${optIndex(2)}. ${options[1]}`}</Radio>
                                    <Radio value={'3'} color={values.answer == "3" ? answer == "3" ? "green-500" : "yellow-500" : values.answer == "3" ? "green-500" : answer == "3" ? "green-500" : ""} checked={values.answer == "3"|| answer =="3"}>{`${optIndex(3)}. ${options[2]}`}</Radio>
                                    <Radio value={'4'} color={values.answer == "4" ? answer == "4" ? "green-500" : "yellow-500" : values.answer == "4" ? "green-500" : answer == "4" ? "green-500" : ""} checked={values.answer == "4"|| answer =="4"}>{`${optIndex(4)}. ${options[3]}`}</Radio>
                                </div>


                            }

                        </FormItem>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default AnswerForm
