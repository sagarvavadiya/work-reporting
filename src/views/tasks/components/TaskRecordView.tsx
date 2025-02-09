import { Dialog } from '@/components/ui';
import ListItem from './ViewRecordDetails/ListItem';
import { useEffect, useState } from 'react';
import { splitObjectValues } from '@/utils/helper';

const TaskRecordView = ({
  modalData,
  openViewModal,
  handleView,
}: {
  modalData: any;
  openViewModal: boolean;
  handleView: () => void;
}) => {
  const [recordList, setRecordList] = useState([]);

 

  useEffect(() => {
    try {
      if (modalData) {
        if (splitObjectValues(modalData).length > 1) {
          setRecordList([modalData, ...splitObjectValues(modalData)]);
        } else {
          setRecordList([...splitObjectValues(modalData)]);
        }
      }
    } catch (error) {
      console.log(error);
    }

    // fetchTasks() // If you want to fetch data from the API
    // dispatch(getTasks()) // If you want to fetch data from Redux store
  }, [openViewModal]);

  return (
    <Dialog
      isOpen={openViewModal}
      onClose={handleView}
      onRequestClose={handleView}
    >
      <div>
        <div onClick={() => console.log(recordList)} className='mt-2 mb-2 '>
          <h3>{modalData.name}</h3>
        </div>

        <div className='max-h-[70vh] overflow-auto'>
          {[...recordList].map((project, index) => (
            <ListItem
              key={index}
              cardBorder
              data={{ ...project, key: index }}
              records_count={recordList.length}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default TaskRecordView;
