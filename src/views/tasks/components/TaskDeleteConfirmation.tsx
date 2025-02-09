import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteTask,
    getTasks,
    useAppDispatch,
    useAppSelector,
} from '../store'

const TaskDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.taskList.data.deleteConfirmation
    )
    const selectedTask = useAppSelector(
        (state) => state.taskList.data.selectedTask
    )
    const tableData = useAppSelector(
        (state) => state.taskList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteTask({ id: selectedTask })

        if (success) {
            dispatch(getTasks(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Task successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={ dialogOpen}
            type="danger"
            title="Delete task"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this task? All record related
                to this task will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default TaskDeleteConfirmation
