import ConfirmDialog from '@/components/shared/ConfirmDialog'
const ReportingDeleteConfirmation = ({dialogOpen,onSubmit,onDialogClose}:{dialogOpen:boolean,onSubmit:()=>void,onDialogClose:()=>void}) => {
    return (
        <ConfirmDialog
            isOpen={ dialogOpen}
            type="danger"
            title="Delete task"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onSubmit}
        >
            <p>
                Are you sure you want to delete this task? All record related
                to this task will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ReportingDeleteConfirmation
