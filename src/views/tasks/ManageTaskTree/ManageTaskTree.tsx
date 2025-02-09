import TaskForm, {
    FormModel,
    SetSubmitting,
} from '../TaskForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateTask } from '@/services/SalesService' 
import TreeForm from '../TaskForm/TreeForm'
import { injectReducer } from '@/store'
import reducer from '../store'

injectReducer('taskList', reducer)
const ManageTaskTree = () => {
    const navigate = useNavigate()

    const addTask = async (data: FormModel) => {
        const response = await apiCreateTask<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addTask(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Task successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/manage-tasks')
        }
    }

    const handleDiscard = () => {
        navigate('/manage-tasks')
    }

    return (
        <>
            <TreeForm  />
        </>
    )
}

export default ManageTaskTree
