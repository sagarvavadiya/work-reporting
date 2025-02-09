import Card from '@/components/ui/Card';
import ProgressionBar from './ProgressionBar';
import { HiClock } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { EllipsisButton, UsersAvatarGroup } from '@/components/shared';
import { INode } from '@/views/tasks/type';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import { calculateTimeDistribution, getNumbers, getSum, mergeTasksData } from '@/utils/helper';
import { TimeDistributionCard } from './TimeDistributionCard';
import { Notes } from './Notes';

export type ListItemData = {
  id: number;
  name: string;
  category: string;
  desc: string;
  attachmentCount: number;
  totalTask: number;
  completedTask: number;
  progression: number;
  dayleft: number;
  status: string;
  member: {
    name: string;
    img: string;
  }[];
};


const ListItem = ({ allTaskData }: { allTaskData: INode[] }) => {
  const [performanceTask, setPerformanceTask] = useState<INode>({});
  const [timeSpentByCat, setTimeSpentByCat] = useState({});
  const data = {
    id: 27,
    name: 'EVO SaaS',
    category: 'Web Application',
    desc: 'Most of you are familiar with the virtues of a programmer',
    attachmentCount: 12,
    totalTask: 32,
    completedTask: 27,
    progression: 80,
    dayleft: 21,
    status: 'none',
    member: [
      {
        name: 'Frederick Adams',
        img: '/img/avatars/thumb-8.jpg',
      },
      {
        name: 'Joyce Freeman',
        img: '/img/avatars/thumb-5.jpg',
      },
      {
        name: 'Clayton Bates',
        img: '',
      },
      {
        name: 'Clayton Bates',
        img: '',
      },
    ],
  };
  const { name, totalTask, completedTask, progression, member, category } =
    data;

  const {
    time_spent = 0,
    wasted_time = 0,
    estimated_time = 0,
    extra_time_taken_to_finish_task = 0,
  } = performanceTask || {};
  useEffect(() => {
    if (isArray(allTaskData)) { 
      const filterData: any= 
        allTaskData
          .filter(item => ['Programming'].includes(`${item.name}`))
          .map(i => {
            return { ...i, name: 'focusedOn', id: 'abcd' };
          })
      if (isArray(filterData)) {
        setPerformanceTask(mergeTasksData(filterData)[0]);
      }
    }
    const timeDistrivutionData = calculateTimeDistribution(allTaskData)
    setTimeSpentByCat(timeDistrivutionData)
  }, [allTaskData]);

  return (
    <div className='mb-4'>
      <Card bordered={true}>
        <div className='grid gap-x-4 grid-cols-12'>
          <div className='my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center'>
            <div className='flex flex-col'>
              <h6 className='font-bold'>
                <Link to='/app/project/scrum-board'>{name}</Link>
              </h6>
              <span>{category}</span>
            </div>
          </div>
          <div className='my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end'>
            <div className='inline-flex items-center px-2 py-1 border border-gray-300 rounded-full'>
              <HiClock className='text-base' />
              <span className='ml-1 rtl:mr-1 whitespace-nowrap'>
                {getSum(
                  `${time_spent}|---|${wasted_time}|---|${extra_time_taken_to_finish_task}`,
                )}{' '}
                / {getSum(`${estimated_time}`)}
              </span>
            </div>
          </div>
          <div className='my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center'>
            <ProgressionBar
              progression={getNumbers(performanceTask, 'total_performance', 'Programming')}
            />
          </div>
          <div className='my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center'>
            <UsersAvatarGroup users={member} />
          </div>
          <div className='my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end'>
            <EllipsisButton />
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-10'>
          {
            isArray(timeSpentByCat) && timeSpentByCat.map((item: any, index: number) => {
              return (
                <TimeDistributionCard
                  key={index}
                  record={item}
                />
              )
            })

          }

                <TimeDistributionCard 
                  record={{
                    "category": 'Wasted Time',
                    "timeSpent":840 - (isArray(timeSpentByCat) ? timeSpentByCat.reduce((previous, current) => {
                      return previous  + current.timeSpent
                    }, 0):0),
                    "task":  []
                }}
                />
                <Notes 
                allTaskData={allTaskData}
                  record={{
                    "category": 'Wasted Time',
                    "timeSpent":840 - (isArray(timeSpentByCat) ? timeSpentByCat.reduce((previous, current) => {
                      return previous  + current.timeSpent
                    }, 0):0),
                    "task":  []
                }}
                />
        </div>
      </Card>
    </div>
  );
};

export default ListItem;
