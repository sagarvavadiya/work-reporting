import React, { useEffect, useState } from 'react' 
import { optIndex } from '@/utils/helper' 
import { Tooltip } from '@/components/ui'
import { IQuizQue } from '../QuizList/components/AnswerForm'

const QuizResult = ({ quizData,
    score }: { quizData: IQuizQue[], score: { [key: string]: string } }) => {
        const [result,setResult] = useState<any> ([])

        useEffect(()=>{
            const tempResult = quizData.map((i)=>{return [i,i.answer==score[`${parseInt(i.id)-1}`],score[`${parseInt(i.id)-1}`] ]})
            setResult(tempResult)
        },[score])


        let tempData = [
            [
                {
                    "id": "1",
                    "question": "What will be the output of the following code?\n\nlet arr = [1, 2, 3, 4, 5];\nlet removed = arr.splice(1, 2, 10, 20);\nconsole.log(arr);",
                    "options": [
                        "[1, 10, 20, 4, 5]",
                        "[1, 2, 3, 4, 5]",
                        "[1, 10, 20, 3, 4, 5]",
                        "[10, 20, 4, 5]"
                    ],
                    "answer": "1"
                },
                false
            ],
            [
                {
                    "id": "2",
                    "question": "What does the splice method return in the following case?\n\nlet arr = [10, 20, 30, 40, 50];\nlet removed = arr.splice(2, 2);\nconsole.log(removed);",
                    "options": [
                        "[10, 20]",
                        "[30, 40]",
                        "[40, 50]",
                        "[20, 30]"
                    ],
                    "answer": "1"
                },
                false
            ],
            [
                {
                    "id": "3",
                    "question": "What happens when you use a negative start index in splice?\n\nlet arr = [5, 10, 15, 20];\narr.splice(-2, 1, 99);\nconsole.log(arr);",
                    "options": [
                        "[5, 10, 99, 20]",
                        "[5, 10, 99, 15, 20]",
                        "[5, 10, 15, 99, 20]",
                        "[5, 99, 15, 20]"
                    ],
                    "answer": "2"
                },
                false
            ],
            [
                {
                    "id": "4",
                    "question": "What is the result of calling splice with a start index greater than the array length?\n\nlet arr = [1, 2, 3];\narr.splice(5, 1, 9);\nconsole.log(arr);",
                    "options": [
                        "[1, 2, 3]",
                        "[1, 2, 3, 9]",
                        "[1, 2, 3, undefined, 9]",
                        "[1, 2, 9, 3]"
                    ],
                    "answer": "3"
                },
                false
            ],
            [
                {
                    "id": "5",
                    "question": "How does splice behave when delete count is 0?\n\nlet arr = ['a', 'b', 'c'];\narr.splice(1, 0, 'x', 'y');\nconsole.log(arr);",
                    "options": [
                        "['a', 'x', 'y', 'b', 'c']",
                        "['a', 'b', 'c']",
                        "['a', 'b', 'x', 'y', 'c']",
                        "['x', 'y', 'a', 'b', 'c']"
                    ],
                    "answer": "1"
                },
                false
            ],
            [
                {
                    "id": "6",
                    "question": "What will be the result if you provide only one argument to splice?\n\nlet arr = [1, 2, 3, 4, 5];\narr.splice(2);\nconsole.log(arr);",
                    "options": [
                        "[1, 2]",
                        "[1, 2, 3, 4, 5]",
                        "[3, 4, 5]",
                        "[1, 2, 3]"
                    ],
                    "answer": "4"
                },
                false
            ],
            [
                {
                    "id": "7",
                    "question": "Which of the following statements about splice is false?",
                    "options": [
                        "splice modifies the original array",
                        "splice can remove elements without adding any new elements",
                        "splice always returns an array of the removed elements",
                        "splice cannot be used to add new elements"
                    ],
                    "answer": "3"
                },
                false
            ]
        ] 
    return (
        <div>
            
            <table>
                <thead>
                    <tr>
                        <th><div className='mx-5'>Sr no.</div></th>
                        <th><div className='mx-5'>Question</div></th>
                        <th><div className='mx-5'>Correct Answer</div></th>
                        <th><div className='mx-5'>Your Answer</div></th>
                        <th><div className='mx-5'>Result</div></th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item:any, index:number) => (
                        <tr key={index}>
                            <td className='text-center'>{index+1}</td>
                            <td>  <Tooltip title={`${item[0].question}`}><p className='w-[250px] whitespace-nowrap overflow-hidden text-ellipsis'>{item[0].question}</p></Tooltip></td>
                            <td className='text-center'>{optIndex(item[0].answer)}</td>
                            <td className='text-center'>{!['null','undefined'].includes(`${item[2]}`)? optIndex(`${item[2]}`) : 'Not attempted'}</td>
                            <td className='text-center'>{!['null','undefined'].includes(`${item[1]}`)? `${item[1]}` : 'Not attempted'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuizResult