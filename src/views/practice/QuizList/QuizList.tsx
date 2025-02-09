import React, { useState } from 'react'
import ActionBar from './components/ActionBar'
import { Container } from '@/components/shared'
import QuizListContent from './components/QuizListContent'
import NewQuizDialog from './components/NewQuizDialog'

const QuizList = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const toggleDialog = () => {
    setOpenDialog(!openDialog)
  }
  const closeDialog = () => setOpenDialog(false)

  
  return (
    <Container className="h-full">
      <ActionBar />
      <QuizListContent />
      <NewQuizDialog/>
    </Container>
  )
}

export default QuizList