import Loading from '@/components/shared/Loading';
import MyTasks from './components/MyTasks';
import { RowData, taskData } from '../RowData';
import { exatractNestedChild, getValidParsedJsonData, mergeTasksData } from '@/utils/helper';
import { INode } from '@/views/tasks/type';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import { addRecord, getList, setTaskData, toggleNewTaskDialog, useAppDispatch, useAppSelector } from '../store';
import { getDocument } from '@/utils/firebase/firebaseFunction';
import { Button, Pagination } from '@/components/ui';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { toggleNewQuizDialog } from '@/views/practice/QuizList/store';
import NewTaskDialog from './components/NewTaskDialog';

const AnalysisDashboard = () => {
  // const allTaskData:INode[] = mergeTasksData(exatractNestedChild([taskData[1]]))
  const [currentDay, setCurrentDay] = useState<number>(1)
  const [allTaskData, setAllTaskData] = useState<INode[]>([]);
  const dispatch = useAppDispatch()
  const taskListState = useAppSelector(
    (state) => state.taskList.data.taskList
  )
  const test = () => {
    setCurrentDay(1),
      console.log(currentDay)
    console.log(`taskListState`, taskListState)
    // dispatch(setTaskData({name:"admin"}))

    // getList
    // dispatch(addRecord(jsooooo))
    // dispatch(getList())
  }

  const getData = async () => {
    const res = await getDocument('reporting');
    if (res.status === 200) {
      dispatch(setTaskData(res.data))
    }
    return res
  }
  useEffect(() => {
    getData()
  }, [])
  const onAddNewTask = () => {
    dispatch(toggleNewTaskDialog(true))
  }
  useEffect(() => {
    if (taskListState[currentDay - 1]) {
      setAllTaskData(mergeTasksData(exatractNestedChild([taskListState[currentDay - 1]['jsonData']])))
    }
  }, [currentDay, taskListState])
  return (
    <div className='flex flex-col gap-4 h-full' >
      <Loading loading={false}>
        <div className='flex justify-between '>
          <div>
            <h4 className='mb-1' onClick={test}>Hello,Sagar!{currentDay - 1}</h4>
            <p>You have 5 tasks on hand.</p>
          </div>
          <Button
            size="sm"
            variant="twoTone"
            icon={<HiOutlinePlusCircle />}
            onClick={onAddNewTask}
          >
          Add  New Report
          </Button>
        </div>
        <div className='flex flex-col xl:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-auto'>
            {
              isArray(allTaskData) && allTaskData.length > 0 && <MyTasks allTaskData={allTaskData} />
            }
          </div>
        </div>


        <Pagination
          currentPage={currentDay}
          total={taskListState.length}
          onChange={data => { setCurrentDay(data), console.log(data) }}
        />

        <NewTaskDialog />
      </Loading>
    </div>
  );
};

export default AnalysisDashboard;

var jsooooo = { "id": "1738632600", "name": "Reporting", "time": "04 Feb 2025", "children": [{ "id": "1738632600_1738636200", "name": "7 AM to 8 AM", "children": [{ "id": "1738632600_1738636200_01", "name": "eSkill", "description": "conversation in josh talk", "category": 1, "status": "2", "time_spent": "60", "wasted_time": "0", "focus_rate": "100", "satisfaction_rate": "10", "reason_for_satisfaction": "", "notes": "" }] }, { "id": "1738639800_1738654200", "name": "9 AM to 1 PM", "children": [{ "id": "1738639800_1738654200_01", "name": "Programming", "description": "Quiz app", "category": 1, "status": "3", "time_spent": "240", "wasted_time": "0", "estimated_time": "60", "tag": "Quiz application", "focus_rate": "100", "satisfaction_rate": "5", "reason_for_satisfaction": "time estimation is too weak, take 4x time", "notes": "divide task into subtask and calculate time during time estimation" }] }, { "id": "1738654200_1738657800", "name": "1 PM to 2 PM", "children": [{ "id": "1738654200_1738657800_01", "name": "eSkill", "description": "conversation in josh talk", "category": 1, "status": "2", "time_spent": "15", "wasted_time": "15", "estimated_time": "15", "tag": "E skill", "focus_rate": "100", "satisfaction_rate": "9", "reason_for_satisfaction": "time wast due to unwanted user of josh talk,they cut call without conversation, lake of topics for conversation", "notes": "choose topics for conversation so it will be long, suggestion from user: speak on unknown topics ti make better skill" }] }, { "id": "1738657800_1738661400", "name": "2 PM to 3 PM", "children": [{ "id": "1738657800_1738661400_01", "name": "Management", "description": "make proper yesterday and today task", "category": 2, "status": "2", "time_spent": "60", "wasted_time": "60", "estimated_time": "60", "tag": "Management", "focus_rate": "", "satisfaction_rate": "8", "reason_for_satisfaction": "more then enough time spend for manage task data on daily basis", "notes": "" }] }, { "id": "1738661400_1738675800", "name": "3 PM to 7 PM", "children": [{ "id": "1738661400_1738675800_01", "name": "Programming", "description": "add firebase in project for database", "category": 1, "status": "1", "time_spent": "240", "wasted_time": "0", "taken_extra_time_to_finish": "105", "tag": "Quiz application", "estimated_time": "120", "focus_rate": "", "satisfaction_rate": "5", "reason_for_satisfaction": "time estimation is too weak, take 3x time, firebase was not working properly so i change supabase database, time taken in learning supabase", "notes": "as fast as possible find current library workable or not. Practice more and more on task like qiz application. " }] }, { "id": "1738675800_1738679400", "name": "7 PM to 8 PM", "children": [{ "id": "1738675800_1738679400_01", "name": "eSkill", "description": "conversation in josh talk", "category": 1, "status": "1", "taken_extra_time_to_finish": "0", "time_spent": "30", "wasted_time": "0", "estimated_time": "30", "tag": "E skill", "focus_rate": "100", "satisfaction_rate": "10", "reason_for_satisfaction": "", "notes": "" }] }, { "id": "1738683000_1738686600", "name": "9 PM to 10 PM", "children": [{ "id": "1738683000_1738686600_01", "name": "coding", "description": "conversation in josh talk", "category": 0, "status": "3", "time_spent": "60", "wasted_time": "0", "estimated_time": "60", "tag": "E skill", "focus_rate": "100", "satisfaction_rate": "10", "reason_for_satisfaction": "", "notes": "" }] }, { "id": "1738686600_1738690200", "name": "10 PM to 11 PM", "children": [{ "id": "1738686600_1738690200_01", "name": "Programming", "description": "analysis module in task management to show all task dtain in perfact by dayily basis perfirmance.", "category": 1, "status": "1", "time_spent": "60", "wasted_time": "0", "tag": "Daily reporting", "estimated_time": "60", "focus_rate": "", "satisfaction_rate": "10", "reason_for_satisfaction": "", "notes": " " }] }, { "id": "1738632600_1738690200", "name": "Notes", "children": [{ "id": "1738546200_1738603800_01", "surynamaskar": 36, "deep/light sleep": "02:57/3:40", "typing-speed": "547 cpm,740 char,8:01 ct, 6:08 act", "name": "note1", "tag": "note" }] }] }