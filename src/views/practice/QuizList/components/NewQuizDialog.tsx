import Dialog from '@/components/ui/Dialog' 
import {
    toggleNewQuizDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import NewQuizForm from './NewQuizForm'
import { useState } from 'react'


 
const NewQuizDialog = ()  => {
    const dispatch = useAppDispatch()
    const [copied,setCopied] = useState(false)

    const newQuizDialog = useAppSelector(
        (state) => state.projectList.data.newQuizDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewQuizDialog(false))
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
            isOpen={newQuizDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4 onClick={copyCred} className={`${copied?"text-red-500":""}`}>Add new project</h4>

            <div className="mt-4">
                <NewQuizForm />
            </div>
        </Dialog>
    )
}

export default NewQuizDialog
