import Loading from '@/components/shared/Loading';
import MyTasks from './components/MyTasks';
import { RowData, taskData } from '../RowData';
import {
  exatractNestedChild,
  getValidParsedJsonData,
  mergeTasksData,
} from '@/utils/helper';
import { INode } from '@/views/tasks/type';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import {
  addRecord,
  getList,
  setTaskData,
  toggleNewTaskDialog,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { getDocument } from '@/utils/firebase/firebaseFunction';
import { Button, Pagination } from '@/components/ui';
import { HiChevronLeft, HiChevronRight, HiOutlinePlusCircle } from 'react-icons/hi';
import { toggleNewQuizDialog } from '@/views/practice/QuizList/store';
import NewTaskDialog from './components/NewTaskDialog';
import EditWorkDialog from './components/EditWorkDialog';

const AnalysisDashboard = () => {
  // const allTaskData:INode[] = mergeTasksData(exatractNestedChild([taskData[1]]))
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [allTaskData, setAllTaskData] = useState<INode[]>([]);
  const dispatch = useAppDispatch();
  const taskListState = useAppSelector(state => state.taskList.data.taskList);
  const test = () => {
    console.log(`taskListState`, taskListState, allTaskData, [currentDay - 1]);
    // dispatch(setTaskData({name:"admin"}))

    // getList
    // dispatch(addRecord(jsooooo))
    // dispatch(getList())
  };

  const getData = async () => {
    const res = await getDocument('reporting');
    if (res.status === 200) {
      console.log({ res: res.data });
      if (isArray(res.data)) {
        dispatch(setTaskData(res.data));
      }
    }
    return res;
  };
  useEffect(() => {
    getData();
  }, []);
  const onAddNewTask = () => {
    dispatch(toggleNewTaskDialog(true));
  };
  useEffect(() => {
    try {
      if (taskListState[currentDay - 1]) {
        const parseData = JSON.parse(taskListState[currentDay - 1]['jsonData']);
        // console.log({parseData1:[parseData]});
        console.log({ parseData: exatractNestedChild([parseData]) });
        setAllTaskData(mergeTasksData(exatractNestedChild([parseData])));
      }
    } catch (error) {
      console.log('Error in set taday task:', error);
    }
  }, [currentDay, taskListState]);
  return (
    <div className='flex flex-col gap-4 h-full'>
      <Loading loading={false}>
        <div className='flex justify-between '>
          <div>
            <h4 className='mb-1' onClick={test}>
              Hello,Sagar!{currentDay - 1}
            </h4>
            <p>You have 5 tasks on hand.</p>
          </div>
          <div className='flex gap-3'>
            <Button
              size='sm'
              variant='twoTone'
              icon={<HiOutlinePlusCircle />}
              onClick={onAddNewTask}
            >
              Add New Report
            </Button>

            <Button
              size='sm'
              variant='twoTone'
              icon={<HiChevronLeft />}
              disabled={currentDay == 1}
              onClick={()=>{ setCurrentDay(currentDay-1)}}
            >
            </Button>
            <Button
              size='sm'
              variant='twoTone'
              icon={<HiChevronRight />}
              disabled={currentDay == taskListState.length}
              onClick={()=>{ setCurrentDay(currentDay+1)}}
            >
            </Button>
          </div>
        </div>
        <div className='flex flex-col xl:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-auto'>
            {isArray(allTaskData) && allTaskData.length > 0 && (
              <MyTasks allTaskData={allTaskData} currentDay={currentDay} />
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentDay}
          total={taskListState.length}
          onChange={data => {
            setCurrentDay(data), console.log(data);
          }}
        />

        <NewTaskDialog />
        <EditWorkDialog />
      </Loading>
    </div>
  );
};

export default AnalysisDashboard;

