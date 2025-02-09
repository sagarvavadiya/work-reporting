import Dialog from '@/components/ui/Dialog'  
import NewTaskForm from './NewTaskForm'
import { useState } from 'react' 
import { useAppSelector,useAppDispatch, toggleNewTaskDialog} from '../../store'


 
const NewTaskDialog = ()  => {
    const dispatch = useAppDispatch()
    const [copied,setCopied] = useState(false)

    const newTaskDialog = useAppSelector(
        (state) => state.taskList.data.newTaskDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewTaskDialog(false))
    }
 const copyCred = () =>{
    setCopied(true)

    setTimeout(() => {
        setCopied(false)
    }, 2000)
        let text = `
        
        Api key : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZXhuZHZvY3hnd2p0ZnVrbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NjUxMjcsImV4cCI6MjA1NDI0MTEyN30.twXz2lZDHyJPMQt_BoQOvZH2XesBkhwMITuk95JS9Is
    
        database url : https://ovexndvocxgwjtfuklxw.supabase.co
    
        project name: demo
    
        user:  svatagline's Org
    
        password : Sagar@1284
    
        gituhub attatched
    
        `
        navigator.clipboard.writeText(text); 
    }
    return (
        <Dialog
            isOpen={newTaskDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4 onClick={copyCred} className={`${copied?"text-red-500":""}`}>Add new report</h4>

            <div className="mt-4">
                <NewTaskForm />
            </div>
        </Dialog>
    )
}

export default NewTaskDialog
