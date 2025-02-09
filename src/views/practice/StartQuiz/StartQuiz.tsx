import { Button, Card, Input, Progress } from '@/components/ui'
import React, { useEffect, useRef, useState } from 'react'
import QuizResult from './QuizResult'
import AnswerForm, { IQuizQue } from '../QuizList/components/AnswerForm'
import { useLocation } from 'react-router-dom'
import { getValidParsedJsonData } from '@/utils/helper'
import { alerts } from 'firebase-functions/v2'
const StartQuiz = () => {
  const { state } = useLocation();
  const formRef = useRef()
  const [quizData, setQuizData] = useState<IQuizQue[]>([])
  const [quizName, setQuizName] = useState<string>('')
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [initialTime, setInitialTime] = useState<number>(50)
  const [score, setScore] = useState({})
  const [seconds, setSeconds] = useState(initialTime)
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false)
  const [quizStarted, setQuizStarted] = useState<boolean>(false)

  // @ts-ignore 
  const { values, setValues, setFieldValue, setTouched, setErrors } = formRef?.current ?? {}
  const handleNext = (answer:number) => { 

    if (currentQuestion < quizData.length - 1) {

      // setCurrentQuestion(currentQuestion + 1)
      if (`${answer}` != "") {

        setScore({ ...score, [currentQuestion]: answer })
        setFieldValue('isSubmited', true)
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1)
          setValues({ answer: "", isSubmited: false })
          setTouched({})
          setErrors({})
          setSeconds(initialTime)
        }, 2000);
      } else {
       

        alert("blank answer" + answer)
      }

    } else {
      if (`${answer}` != "") { 
        setScore({ ...score, [currentQuestion]: answer })
        setFieldValue('isSubmited', true)
        setTimeout(() => {
          setTestSubmitted(true)
        }, 2000);
      } else {
        alert("blank answer" + answer)
      }


    }
  }
  const handlePrev = () => {
    if (currentQuestion > 0) {
      // @ts-ignore
      setCurrentQuestion(currentQuestion - 1)
      console.log('next')
    } else {
      alert("At 0 index")
    }

  }
  const handleSubmit = () => {
    // @ts-ignore
    formRef && formRef.current && formRef.current.handleSubmit()
  }


  const test = () => {
    console.log(quizData)
    // console.log(formRef.current.values)
  }


  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(intervalId);

  }, [seconds]);
  useEffect(() => {
    if (seconds == 0 && !testSubmitted && quizStarted) {
      if (currentQuestion < quizData.length - 1) {
        setScore({ ...score, [currentQuestion]: values['answer'] })
        setCurrentQuestion(currentQuestion + 1)
        setSeconds(initialTime)
      } else {
        setScore({ ...score, [currentQuestion]: values['answer'] })
        setTestSubmitted(true)
      }
    }
  }, [seconds]);

  useEffect(() => {
    if (state && state.questions && state.name) {
      setQuizData(state.questions)
      setQuizName(state.name)
    } else {
      // const validData = (state && state.questions) ? state.questions : getValidParsedJsonData(`${localStorage.getItem('curentQuiz')}`)['questions'] ?? []
      const validData = getValidParsedJsonData(`${localStorage.getItem('curentQuiz')}`)
      if (validData) {
        setQuizData(validData.questions)
        setQuizName(validData.name)
      }
    }

  }, [])
  return (
    <div>
      <Card>
        <div className='flex justify-between items-center mb-5'>
          <h5 onClick={test}>{quizName} Quiz </h5>
          {
            !quizStarted
            &&
            <div className='flex justify-between items-center gap-3'>
              <h6  >  Question display time(in seconds): </h6>
              <Input
                type="number"
                className='w-fit'
                placeholder="Enter time"
                value={initialTime}
                onChange={(e) => setInitialTime(parseInt(e.target.value))}
              />
            </div>
          }

          <div>
            {(currentQuestion <= quizData.length) && !testSubmitted && seconds > 0 && quizStarted &&
              <Progress variant="circle" percent={(seconds * 100) / initialTime} width={80} customInfo={seconds} />}

          </div>
        </div>

        {/* <p>
          Some quick example text to build on the card title and make
          up the bulk of the card&apos;s content.
        </p> */}
        {
          quizStarted ?
            ((currentQuestion <= quizData.length) && !testSubmitted && seconds > 0) ? (
              <>
                <AnswerForm
                  ref={formRef}
                  handleNext={handleNext}
                  quizData={quizData[currentQuestion]}
                />
                <div className='flex justify-between'>
                  <Button block variant="solid" disabled={values?.isSubmited} onClick={handleSubmit} style={{ width: "fit-content" }}>
                    {currentQuestion >= quizData.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </>
            ) : (
              <QuizResult
                quizData={quizData}
                score={score}
              />
            ) : (
              <Button block variant="solid" onClick={() => { setQuizStarted(true); setSeconds(initialTime) }}>
                Start Quiz
              </Button>
            )
        }

      </Card>
    </div>
  )
}

export default StartQuiz