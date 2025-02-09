/** Example purpose only */
import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import TaskTable from './components/TaskTable'
import TaskTableTools from './components/TaskTableTools'
import { useState } from 'react'

injectReducer('taskList', reducer)
const TaskList = () => {
    const [isMergeTasks, setIsMergeTask] = useState<boolean>(true)
    const mergeTasks = ( ) => {
        if (isMergeTasks) {
            setIsMergeTask(false)
        } else {
            setIsMergeTask(true)
        }
    }
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Tasks  </h3>
                <TaskTableTools
                    mergeTasks={mergeTasks}
                    isMergeTasks={isMergeTasks}
                />
            </div>
            <TaskTable
                isMergeTasks={isMergeTasks}
            />
        </AdaptableCard>
    )
}
export default TaskList
