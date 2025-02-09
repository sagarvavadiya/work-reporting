import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { createDocument, getDocument } from '@/utils/firebase/firebaseFunction'
import { getValidParsedJsonData } from '@/utils/helper'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { setTaskData, toggleNewTaskDialog, useAppDispatch } from '../../store'
import { IQuizQue } from '@/views/practice/QuizList/components/AnswerForm'

const checkValidQuizData = (data: string) => {
    try {
        const parsedData = JSON.parse(data);
        let isValid = false

        parsedData.forEach((i: IQuizQue) => {
            if (i.question && i.options && i.options.length > 0 && i.answer) {
                isValid = true
            } else {
                isValid = false
                return false
            }
        })
        return isValid
    } catch (error) {
        console.log(error)
        return false
    }
}
type FormModel = {
    name: string
    jsonData: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter name of quiz!'),
    jsonData: Yup.string()
        .required('Please add json data!')
        // .test(
        //     'validJsonRequired',
        //     'Json object is not valid: format: [{"id":"1","question":"q","options":["a","b","ad","v"],"answer":"1"},...]',
        //     checkValidQuizData
        // ),
})
const NewTaskForm = () => {
    const dispatch = useAppDispatch()
    const onDialogClose = () => {
        dispatch(toggleNewTaskDialog(false))
    }
    const handleSubmit = async (value: FormModel) => {
        try {
            const { jsonData, name } = value
            // const parsedData = JSON.parse(jsonData);
            // console.log(parsedData)
            const response = await createDocument({table:"reporting", jsonData })
            console.log({ response })

            if (response.status === 200) {
                const getData = await getDocument('reporting')
                if (getData.status === 200) {
                    dispatch(setTaskData(getData.data))
                }
                onDialogClose()
            } else {
                alert('Error on creating task reporting:' + response.data.message)
            }
        } catch (error: any) {
            console.log(error);
            alert(error?.message ? error?.message : error)
            return false
        }
    }


    return (
        <div  >
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    jsonData: '',

                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values)

                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Reporting Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Quiz Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Reporting Object In JSON Format"
                                invalid={errors.jsonData && touched.jsonData}
                                errorMessage={errors.jsonData}
                            >
                                <Field
                                    type="text"
                                    name="jsonData"
                                    className='mb-[30px]'
                                    placeholder="Json Data"
                                    component={Input}
                                />
                            </FormItem>



                            <FormItem >
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => resetForm()}
                                >
                                    Reset
                                </Button>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewTaskForm



