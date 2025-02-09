import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlinePencilAlt,
    HiX,
    HiOutlineEye,
} from 'react-icons/hi'
import EllipsisButton from '@/components/shared/EllipsisButton'
import { useNavigate, useNavigation } from 'react-router-dom'
import { deleteDocument, getDocument } from '@/utils/firebase/firebaseFunction'
import { useAppDispatch } from '@/store'
import { setQuizData } from '../store'
import { getValidParsedJsonData } from '@/utils/helper'

const dropdownList = [
    { label: 'Go To Quiz', value: 'addFlag', icon: <HiOutlineEye />, path: "/start-quiz" },
    { label: 'Delete Quiz', value: 'projectSetting', icon: <HiX />, path: "delete" },
]

const ItemDropdown = ({ data }:{data:any}) => {
    const navigation = useNavigate()
      const dispatch = useAppDispatch()
    const handleAction = async (path: string) => {
        if (path == 'delete') { 
            try { 
                const response:any = await deleteDocument(parseInt(`${data.id}`)) 
                if (response.status === 200) {
                    const getData = await getDocument()
                    if (getData.status === 200) {
                        const reformatData = getData.data.filter((i: any) => i.jsonData !== null).map((data: any) => { return { ...getValidParsedJsonData(data.jsonData), id: data.id } })
                        dispatch(setQuizData(JSON.stringify(reformatData)))
                    } 
                } else {
                    alert('Error on creating quiz:' + response.data.message)
                }
            } catch (error: any) {
                alert(error?.message ? error?.message : error)
                return false
            }


        } else {
            navigation(path, {
                state: {
                    ...data
                }
            })
        }
        console.log(data)

    }


    // const getData = await deleteDocument(34);
    // console.log({getData})
    // // const getData = await getDocument()
    // // if (getData.status === 200) {
    // //     const reformatData = getData.data.filter((i: any) => i.jsonData !== null).map((data: any) => getValidParsedJsonData(data.jsonData))
    // //     dispatch(setQuizData(JSON.stringify(reformatData)))
    // // }
    // // onDialogClose()
    return (
        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            {dropdownList.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value} onClick={() => handleAction(item.path)}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-2 rtl:mr-2">{item.label}</span>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ItemDropdown
