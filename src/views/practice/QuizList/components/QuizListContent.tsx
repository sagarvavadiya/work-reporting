import { useEffect, useState } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem, { ListItemData } from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { getList, setQuizData, useAppDispatch, useAppSelector } from '../store'
import { values } from 'lodash'
import { getValidParsedJsonData } from '@/utils/helper'
import { getDocument } from '@/utils/firebase/firebaseFunction'

const QuizListContent = () => {

    const [allQuiz, setAllQuiz] = useState([])
    const dispatch = useAppDispatch()
    const loading = false 
    const quizListState = useAppSelector(
        (state) => state.projectList.data.quizList
    )


    useEffect(() => {
        const data = getValidParsedJsonData(`${quizListState}`)
        setAllQuiz(data ?? [])
    }, [quizListState])

    const getData = async () => {
        const res = await getDocument('quiz'); 
        if (res.status === 200) {
            
            const reformatData = res.data.filter((i:any) => i.jsonData !== null).map((data:any)=>{ return {...getValidParsedJsonData(data.jsonData),id:data.id}})  
            console.log(res)
            dispatch(setQuizData(JSON.stringify(reformatData)))
        }
        return res
        }
    useEffect(() => {
      getData() 
    }, [])
    return (
        <div
            
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}

            {
                allQuiz.length > 0 &&
                !loading &&
                allQuiz.map((quiz, index) => (
                    <ListItem key={index} data={quiz} />
                ))}
        </div>
    )
}

export default QuizListContent
