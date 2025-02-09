import React from 'react' 
import QuizList from './QuizList/QuizList'
import reducer from '../practice/QuizList/store' 
import { injectReducer } from '@/store'

injectReducer('projectList', reducer)
const Practice = () => {
  return (
   <>
     <QuizList/>
   </>
  )
}

export default Practice