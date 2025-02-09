import Dialog from '@/components/ui/Dialog';
// import NewTaskForm from './NewTaskForm'
import { useEffect, useState } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  toggleEditWorkDialog,
  setTaskData,
} from '../../store';
import { getDocument, updateDocument } from '@/utils/firebase/firebaseFunction';
import { Button, Input } from '@/components/ui';

const EditWorkDialog = () => {
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);
  const [workData, setWorkData] = useState<any>({});
  const [contant, setContent] = useState<string>();

  const editWorkDialog = useAppSelector(
    state => state.taskList.data.editWorkDialog,
  );
  const editWorkData = useAppSelector(
    state => state.taskList.data.editWorkData,
  );

  const onDialogClose = () => {
    dispatch(toggleEditWorkDialog(false));
  };

  useEffect(() => {
    setWorkData(editWorkData);
    setContent(JSON.stringify(editWorkData['jsonData']));
  }, [editWorkData,editWorkDialog,editWorkData]);

  const test = () => {
    // console.log(mergeTasksData(exatractNestedChild([workData['jsonData']])))
    console.log(workData);
  };

  const handleEditorChange = (data:any) => {
    setContent(data);
  };


  const handleSubmit = async () => {
    try {
      const response = await updateDocument({
        table: 'reporting',
        jsonData: contant,
        id: workData['id'],
      });
      console.log({ response });
      if (response.status === 200) {
        const getData = await getDocument('reporting');
        if (getData.status === 200) {
          dispatch(setTaskData(getData.data));
        }
        onDialogClose();
      } else {
        alert('Error on creating task reporting:' + response.data.message);
      }
    } catch (error: any) {
      alert(error?.message ? error?.message : error);
      return false;
    }
  };
  const copyObj = () =>{
    setCopied(true)
        navigator.clipboard.writeText(editWorkData['jsonData']);
    }

  return (
    <Dialog
      isOpen={editWorkDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4 onClick={copyObj}>Edit report</h4>

      <div className='mt-4 max-h-[23rem] overflow-auto'>

        <Input
          onChange={e => handleEditorChange(e.target.value)}
          value={contant}
        />

        {/* </ErrorBoundryBox> */}
      </div>
      <br />
      <Button variant='solid' onClick={handleSubmit}>
        Submit
      </Button>
    </Dialog>
  );
};

export default EditWorkDialog;
