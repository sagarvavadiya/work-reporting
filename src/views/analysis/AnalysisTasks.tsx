import React from 'react'
import AnalysisDashboard from './AnalysisDashboard/AnalysisDashboard'
import { injectReducer } from '@/store'
import reducer from './store/index'

injectReducer('taskList', reducer)
const AnalysisTasks = () => {
  return (
     <AnalysisDashboard/>
  )
}

export default AnalysisTasks
