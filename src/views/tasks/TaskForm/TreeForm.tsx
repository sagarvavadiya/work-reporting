import { useEffect, useRef, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import { ViewElement } from './AddEditTaskModalComponents'
import { getTasks, useAppDispatch, useAppSelector } from '../store'
import { apiPutTask } from '@/services/SalesService'
import { makeTreeView } from '@/utils/helper'
import { treeRawData } from '@/constants/tree.constant'


const Tree = ({ data,fetchData }: TreeProps) => {
    const isChildren = data.children && data.children.length > 0;
    const [isExpanded, setIsExpanded] = useState(data.isExpanded);
    const [showDialog, setShowDialog] = useState(false);
    const formRef = useRef(null)
    const onAction = () => {
        if (isExpanded) {
            setIsExpanded(false);
            data.isExpanded = false;
        } else {
            setIsExpanded(true);
            data.isExpanded = true;
        }
    };

    const handleClose = () => setShowDialog(false);
    const handleSubmit = (record: NodeFormSchema) => {
        const updateTask = async (data: any) => {
            const response = await apiPutTask<boolean, FormModel>(data)
            console.log(response)
            return response.data
        }
        const updateData = async () => {
            const success = await updateTask({ ...data, ...record })
            if (success) {
                console.log('update success')
                fetchData && fetchData()
                Object.keys(record).forEach((key: string) => {
                    // @ts-ignore
                    data[key] = record[key]
                })
            } else {
                console.log('not update')
            }
        }
        updateData()
        // Object.keys(record).forEach((key: string) => {
        //     // @ts-ignore
        //     data[key] = record[key]
        // })
        handleClose()
    };

    const onSubmitBtn = () => {
        // @ts-ignore 

        let formaData = JSON.parse(JSON.stringify(data))
        delete formaData.id
        delete formaData.children
        delete formaData.color
        delete formaData.isExpanded 
        // @ts-ignore
        formRef.current.handleSubmit()
    }

    return (
        <>
            <div className='nodeContainer'>
                <div className='nodeBoxVLine' />

                {
                    data.id !== "root" && <><div className='nodeBoxHLine' /> <div className='nodeBoxHLine2' /> </>
                }

                <div className='nodeBox'>
                    <div className='beforeTitle'>
                        <div className='bt-inner' onClick={() => setShowDialog(true)}>✒️</div>
                    </div>
                    <div className='nodeName'  > {data.name} </div>
                    <div className='afterTitle'>
                        {isChildren &&
                            (isExpanded ? (
                                <span onClick={onAction}>➖</span>
                            ) : (
                                <span onClick={onAction}>➕</span>
                            ))}
                    </div>
                </div>

                <div className='child-tree'>

                    {isChildren && isExpanded && data.children && (
                        <>
                            {data.children.map(i => {
                                return <Tree data={i} key={`${i.id}`} fetchData={fetchData}/>;
                            })}
                        </>
                    )}
                </div>
            </div>
            <Dialog
                height={'auto'}
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                children={<ViewElement
                    data={data}
                    formRef={formRef}
                    handleSubmit={(record: NodeFormSchema) => handleSubmit(record)}
                    handleClose={handleClose}
                    onSubmitBtn={onSubmitBtn}
                    fetchData={fetchData}
                />}
            />
        </>

    );
};

const LoadTree = ({ treeNodes,fetchData }: { treeNodes: string,fetchData:()=>void}) => {
    let data: any = [] 
        try {
            data = JSON.parse(treeNodes)
        } catch (error) {
            console.log(error)
            data = []
        }  
    return (
        <div className='relative  left-[6px]'>
            {data.map((data: INode, index: number) => <Tree data={data} key={index} fetchData={fetchData}/>)}
        </div>
    )
}
const TreeForm = () => {
    const dispatch = useAppDispatch()
    let [treeNodes, setTreeNodes] = useState<INode[]>(treeRawData)

    const TaskListdata = useAppSelector(
        (state) => state.taskList.data.taskList
    ) || []
    const fetchData = () => { 
        dispatch(getTasks({ pageIndex: 1, pageSize: 20, sort: { order: '', key: '' }, query: "", filterData: {} }))
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        const treeObject: INode[] = [
            {
                id: "00",
                name: "Task Tree",
                color: "#FF5733",
                // @ts-ignore
                children:makeTreeView(TaskListdata)
            }
        ]
        setTreeNodes(treeObject)
    }, [TaskListdata])


    const test = (action?:string) => {
        if (action == 'load') {
            fetchData()
        } 
    }
    return (
        <AdaptableCard className='mb-4'>

            <p className='mb-6' onClick={()=>test()}>Add or change tasks from the task tree</p>
          
            <FormItem>
                <LoadTree
                    treeNodes={JSON.stringify(treeNodes)}
                    fetchData={fetchData}
                />
            </FormItem>

        </AdaptableCard>
    );
};

export default TreeForm;










 

