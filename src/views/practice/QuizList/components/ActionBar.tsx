import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tooltip from '@/components/ui/Tooltip'
import {
    HiOutlinePlusCircle,
    HiOutlineSearch,
    HiOutlineViewGrid,
    HiOutlineViewList,
    HiOutlineSortAscending,
    HiOutlineSortDescending,
} from 'react-icons/hi'
import {
    toggleView,
    toggleSort,
    setSearch, 
    useAppDispatch,
    useAppSelector,
    toggleNewQuizDialog,
} from '../store'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import {   getDocument } from '@/utils/firebase/firebaseFunction'

const ActionBar = () => {
    const dispatch = useAppDispatch() 
    const onAddNewQuiz = () => {
        dispatch(toggleNewQuizDialog(true))}
    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        dispatch(setSearch(val))
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }
const test = () => {
    console.log(`click on test`)
    // createDocument("quiz_list", { name: "John Doe", age: 25 }); 
    
}


    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">Quiz List</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                {/* <Input
                    ref={inputRef}
                    size="sm"
                    placeholder="Search"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                />
                <Tooltip title={view === 'grid' ? 'List view' : 'Grid view'}>
                    <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={
                            view === 'grid' ? (
                                <HiOutlineViewList />
                            ) : (
                                <HiOutlineViewGrid />
                            )
                        }
                        onClick={() => onViewToggle()}
                    />
                </Tooltip>
                <Tooltip title={`Sort: ${sort === 'asc' ? 'A-Z' : 'Z-A'}`}>
                    <Button
                        className="hidden md:flex"
                        variant="plain"
                        size="sm"
                        icon={
                            sort === 'asc' ? (
                                <HiOutlineSortAscending />
                            ) : (
                                <HiOutlineSortDescending />
                            )
                        }
                        onClick={onToggleSort}
                    />
                </Tooltip> */}
                
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewQuiz}
                >
                    New Quiz
                </Button>
            </div>
        </div>
    )
}

export default ActionBar
