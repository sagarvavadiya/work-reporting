import { Button } from "@/components/ui"
import AddEditNodeForm from "../components/AddEditNodeForm"

export const ViewElement = ({ data, formRef,
    handleSubmit,
    handleClose,
    onSubmitBtn,
    fetchData }: ExtendedTreeProps) => {

    return (

        <div className='viewElement'>
            <AddEditNodeForm
                ref={formRef}
                handleSubmit={(record: NodeFormSchema) => handleSubmit && handleSubmit(record)}
                data={{...data,childFormType:data.childFormType?data.childFormType :`${`${data.id}`.length  }`}} 
                fetchData={fetchData ? fetchData:()=>{}}
               
            />
            <div>
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={handleClose}
                    variant='default'
                >
                    Close
                </Button>
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={onSubmitBtn}
                    variant='solid'
                >
                    Submit
                </Button>

            </div>
        </div>
    )
}
export const RemoveElement = ({ data, formRef,
    handleClose,
    onSubmitBtn }: ExtendedTreeProps) => {

    return ( 
        <div className='viewElement'  >
            <h3>Are you sure to delete record?</h3>
            <br />
            <div>
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={handleClose}
                    variant='default'
                >
                    Close
                </Button>
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={onSubmitBtn}
                    variant='solid'
                >
                    Submit
                </Button>

            </div>
        </div>
    )
} 




