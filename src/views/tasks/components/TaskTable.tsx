import { useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getTasks,
    setTableData,
    setSelectedTask,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    TaskListState,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import TaskDeleteConfirmation from './TaskDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { INode } from '../type'
import { calculateShortFallTime, exatractNestedChild, getSum, makeTreeView, mergeTasksData } from '@/utils/helper'
import TaskRecordView from './TaskRecordView'
import { tasksDatabase } from './TaskDatabase'
import { Pagination } from '@/components/ui'


const ActionColumn = ({ row, handleView }: { row: INode, handleView: (data: any) => void }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/tasks-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedTask(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={() => handleView(row)}
            >
                <HiEye />
            </span>
            {/* <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span> */}
        </div>
    )
}

const TaskColumn = ({ row }: { row: INode }) => {
    // const avatar = row.img ? (
    //     <Avatar src={row.img} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
    // )

    return (
        <div className="flex items-center">
            {/* {avatar} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const TaskTable = ({ isMergeTasks }: { isMergeTasks: boolean }) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const [modalData, setModalData] = useState<any>({})
    const [openViewModal, setOpenViewModal] = useState<boolean>(false)
    const [day,setDay] = useState<number>(1)
    const handleView: (data?: any) => void = (data: any) => {
        if (openViewModal) {
            setOpenViewModal(false)

        } else {
            setOpenViewModal(true)
            setModalData(data)

        }
    }
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.taskList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.taskList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.taskList.data.loading
    )

    const data = useAppSelector(
        (state) => state.taskList.data.taskList
    )
    const [tableDataList, setTableDataList] = useState(data)

    const test = () => {

        // console.log(TaskListdata)
    }
    const data2 = useAppSelector(
        (state) => state
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getTasks({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<INode>[] = useMemo(
        () => [

            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <TaskColumn row={row} />
                },
            },
            {
                header: 'Id',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize"  >{row.id}</span>
                },
            },
            {
                header: 'Category',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize" onClick={() => console.log(row)}>{row.category}</span>
                },
            },
            {
                header: 'Time spent',
                accessorKey: 'time_spent',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize"  >{row.time_spent ? getSum(row.time_spent) : row.id}</span>
                },
            },
            {
                header: 'Shortfall',
                accessorKey: 'description',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize"  >{row.time_spent ? calculateShortFallTime(row.name,row.time_spent) : row.id}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} handleView={handleView} />,
            },


        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }
    useEffect(() => {
        const makeListView = exatractNestedChild([tasksDatabase[day-1]])
        console.log({makeListView})
        setTableDataList(makeListView)
    }, [day])
    useEffect(() => {
        const makeListView = exatractNestedChild([tasksDatabase[day-1]])
        if (isMergeTasks) {
            setTableDataList(mergeTasksData(makeListView))
        } else {
            setTableDataList(makeListView)
        }
    }, [isMergeTasks])
    return (
      <div onClick={() => console.log(tableDataList)}>
        <DataTable
          ref={tableRef}
          columns={columns}
          data={tableDataList}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ className: 'rounded-md' }}
          loading={loading}
          pagingData={{
            total: tableData.total as number,
            pageIndex: tableData.pageIndex as number,
            pageSize: tableData.pageSize as number,
          }}
          onPaginationChange={onPaginationChange}
          onSelectChange={onSelectChange}
          onSort={onSort}
        />
        <TaskDeleteConfirmation />
        <TaskRecordView
          modalData={modalData}
          openViewModal={openViewModal}
          handleView={handleView}
        />
        <div className='flex w-full gap-3 align-center justify-center'>
            <span className="text-center relative top-1">Days: </span>
          <Pagination
            pageSize={1}
            currentPage={day}
            total={7}
            onChange={data => setDay(data)}
          />
        </div>
      </div>
    );
}

export default TaskTable
