import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Tag from '@/components/ui/Tag';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import ListItem from './ListItem';
import { INode } from '@/views/tasks/type';
import { HiClock, HiEye, HiOutlineClipboardCheck } from 'react-icons/hi';
import {
  calculateShortFallTime,
  formatDateFromTimestamp,
  getNumbers,
  getSum,
} from '@/utils/helper';
// import TaskRecordView from '@/views/tasks/components/TaskRecordView';
import TaskDeleteConfirmation from '@/views/tasks/components/TaskDeleteConfirmation';
import TaskRecordView from '@/views/tasks/components/TaskRecordView';
import {
  setTaskData,
  toggleEditWorkData,
  toggleEditWorkDialog,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { deleteDocument, getDocument } from '@/utils/firebase/firebaseFunction';
import ReportingDeleteConfirmation from './ReportingDeleteConfirmation';

type Task = {
  taskId: string;
  taskSubject: string;
  priority: number;
  assignees: {
    id: string;
    name: string;
    email: string;
    img: string;
  }[];
};

type MyTasksProps = {
  data?: Task[];
};

const { Tr, Th, Td, THead, TBody } = Table;

const CategoryTag = ({ category }: { category: number }) => {
  switch (category) {
    case 0:
      return (
        <Tag className='text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0'>
          Nothing
        </Tag>
      );
    case 1:
      return (
        <Tag className='text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20 rounded border-0'>
          High
        </Tag>
      );
    case 2:
      return (
        <Tag className='bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 rounded border-0'>
          Mangement
        </Tag>
      );
    case 3:
      return (
        <Tag className='text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0'>
          Creative
        </Tag>
      );
    default:
      return null;
  }
};

const TimeManagementBox = ({ row }: { row: any }) => {
  const {
    time_spent,
    wasted_time,
    estimated_time,
    extra_time_taken_to_finish_task = 0,
  } = row;

  return (
    <>
      <div className='inline-flex items-center px-2 py-1 border border-gray-300 rounded-full'>
        <HiClock className='text-base' />
        <span className='ml-1 rtl:mr-1 whitespace-nowrap'>
          {getSum(
            `${time_spent}|---|${wasted_time}|---|${extra_time_taken_to_finish_task}`,
          )}{' '}
          / {getSum(`${estimated_time}`)}
        </span>
      </div>
    </>
  );
};

const ActionColumn = ({
  data,
  handleView,
}: {
  data: INode;
  handleView: (data: any) => void;
}) => {
  return (
    <div className='flex justify-start text-lg'>
      <span className={`cursor-pointer p-2 `} onClick={() => handleView(data)}>
        <HiEye />
      </span>
      {/* <span
              className="cursor-pointer p-2 hover:text-red-500"
              onClick={onDelete}
          >
              <HiOutlineTrash />
          </span> */}
    </div>
  );
};

const MyTasks = ({
  allTaskData,
  currentDay,
}: {
  allTaskData: INode[];
  currentDay: number;
}) => {
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [today, setToday] = useState<string>('');
  const dispatch = useAppDispatch();
  const taskListState = useAppSelector(state => state.taskList.data.taskList);

  const handleEditWork = () => {
    dispatch(toggleEditWorkDialog(true));
    dispatch(toggleEditWorkData(taskListState[currentDay - 1]));
  };
  const handleDelete = async () => {
    console.log(taskListState[currentDay - 1]);
    try {
      const response = await deleteDocument(
        parseInt(`${taskListState[currentDay - 1]['id']}`),
        'reporting',
      );
      console.log({ response });
      if (response.status === 200) {
        const getData = await getDocument('reporting');
        if (getData.status === 200) {
          dispatch(setTaskData(getData.data));
        }
      } else {
        alert('Error on creating task reporting:' + response.data.message);
      }
    } catch (error: any) {
      alert(error?.message ? error?.message : error);
      return false;
    }

    setIsDelete(false)
  };
  const handleView: (data?: any) => void = (data: any) => {
    if (openViewModal) {
      setOpenViewModal(false);
    } else {
      setOpenViewModal(true);
      setModalData(data);
    }
  };

  const data = allTaskData; //.filter((i)=>i.tag !== 'note')
  const navigate = useNavigate();

  // @ts-ignore
  const columns: ColumnDef<INode>[] = useMemo(
    () => [
      // {
      //     header: 'Task ID',
      //     accessorKey: 'taskId',
      //     cell: (props) => {
      //         const { taskId } = props.row.original
      //         return (
      //             <ActionLink
      //                 themeColor={false}
      //                 className="font-semibold"
      //                 to="/app/project/scrum-board"
      //             >

      //                 <span  > {taskId}</span>
      //             </ActionLink>
      //         )
      //     },
      // },

      {
        header: 'Name',
        cell: props => {
          const { name } = props.row.original;
          return <span className='capitalize'>{name}</span>;
        },
      },
      // {
      //   header: 'Tag',
      //   accessorKey: 'tag',
      // },
      {
        header: (
          <div>
            {' '}
            <div className='w-fit flex flex-col justify-center items-center'>
              <span>Time management</span>
              <span className='text-[9px] normal-case'>
                Spent/Estimated Time
              </span>
            </div>
          </div>
        ),
        accessorKey: 'time_spent',
        cell: props => {
          return <TimeManagementBox row={props.row.original} />;
        },
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: props => {
          const { category = '0' } = props.row.original;
          return <CategoryTag category={parseInt(`${category}`)} />;
        },
      },
      {
        header: 'Performance',
        accessorKey: 'satisfaction_rate',
        cell: props => {
          const { satisfaction_rate = '0', name } = props.row.original;
          return `${getNumbers(
            props.row.original,
            'total_performance',
            name,
          )}%`;
        },
      },
      {
        header: 'Time Shortfall(m) ',
        accessorKey: 'description',
        cell: props => {
          const { name, time_spent } = props.row.original;
          return `${calculateShortFallTime(`${name}`, `${time_spent}`)}`;
        },
      },
      {
        header: 'Action',
        accessorKey: 'focus_rate',
        cell: props => {
          return (
            <ActionColumn data={props.row.original} handleView={handleView} />
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onViewAllTask = () => {
    navigate('/app/project/issue');
  };

  useEffect(() => {
    try {
      const work_date = formatDateFromTimestamp(
        `${allTaskData[0]['id']?.split('_')[0]}`,
      );
      setToday(work_date);
    } catch (error) {
      console.log(error);
    }
  }, [allTaskData]);
  return (
    <Card>
      <div className='flex items-center justify-between mb-6'>
        <h4
          onClick={() =>
            console.log(
              allTaskData[0]['id']?.split('_')[1],
              formatDateFromTimestamp(`${allTaskData[0]['id']?.split('_')[1]}`),
            )
          }
        >
          My Tasks - {today}
        </h4>
        <div className='flex gap-4'>
          <Button size='sm' onClick={()=>setIsDelete(true)}>
            Delete Data
          </Button>
          <Button size='sm' onClick={handleEditWork}>
            Edit Data
          </Button>
        </div>
      </div>
      <Table>
        <THead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map(row => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
      <ListItem allTaskData={allTaskData} />
      <TaskRecordView
        modalData={modalData}
        openViewModal={openViewModal}
        handleView={handleView}
      />
      <ReportingDeleteConfirmation
        onDialogClose={() => setIsDelete(false)}
        onSubmit={handleDelete}
        dialogOpen={isDelete}
      />
    </Card>
  );
};

export default MyTasks;
