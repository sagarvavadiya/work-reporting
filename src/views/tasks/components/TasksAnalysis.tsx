import { useMemo, useState,   } from 'react'
import {   HiChartBar } from 'react-icons/hi'
import { 
    useAppSelector,
} from '../store' 
import Button from '@/components/ui/Button'  
import { Dialog } from '@/components/ui'
import { DataTable } from '@/components/shared'

 

type AnalysisBoxProps = {
    onDrawerClose?: () => void
}

 

const AnalysisBox = ({ onDrawerClose }:AnalysisBoxProps)  => {
    

    const TaskListdata = useAppSelector(
        (state) => state.taskList.data.taskList
    ) || []


        const columns: ColumnDef<INode>[] = useMemo(
            () => [
                
                {
                    header: 'Name',
                    accessorKey: 'name',
                    cell: (props) => {
                        const row = props.row.original
                        return <span className="capitalize"  >{row.name}</span>
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
                        return <span className="capitalize" onClick={()=>console.log(row)}>{row.category}</span>
                    },
                },
                {
                    header: 'Time spent',
                    accessorKey: 'time_spent',
                    cell: (props) => {
                        const row = props.row.original
                        return <span className="capitalize"  >{row.time_spent?row.time_spent:row.id}</span>
                    },
                },
                
             
              
               
            ],
            []
        )
    return (
        <>
            <button onClick={() => console.log(TaskListdata)}>test</button>
            <DataTable 
              ref={(tableRef=>{})}
              columns={columns}
              data={TaskListdata}
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ className: 'rounded-md' }}
              loading={false} 
          /> 

        </>
    )
}


 

const TasksAnalysis = () => {
    
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }



    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiChartBar />}
                onClick={() => openDrawer()}
            >
                Tasks Analysis
            </Button>


            <Dialog
                height={'auto'}
                isOpen={isOpen}
                onClose={onDrawerClose}
                children={
                    <AnalysisBox onDrawerClose={onDrawerClose} />}
            />
        </>
    )
}

AnalysisBox.displayName = 'AnalysisBox'

export default TasksAnalysis
