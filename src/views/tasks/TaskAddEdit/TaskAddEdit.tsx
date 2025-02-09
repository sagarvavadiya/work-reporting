import TaskForm, {
    FormModel,
    SetSubmitting,
} from '../TaskForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateTask } from '@/services/SalesService'

const TaskAddEdit = () => {
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
            <TaskForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default TaskAddEdit
