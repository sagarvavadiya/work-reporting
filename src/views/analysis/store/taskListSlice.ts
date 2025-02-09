import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { createDocument, getDocument } from '@/utils/firebase/firebaseFunction'

 
 
export type TaskListState = {
    loading: boolean  
    addTaskLoading: boolean  
    taskList:any[]
    newTaskDialog: boolean
   
}

export const SLICE_NAME = 'taskList'

export const getList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async () => {
        const response = await getDocument('reporting')

        // console.log(`getList`,response)
        return response.data
    }
)
export const addRecord = createAsyncThunk(
    SLICE_NAME + '/addRecord',
    async (data:any) => {
        const response = await createDocument({table:"reporting",jsonData:data})

        console.log(`addRecord`,response)
        return response.data
    }
) 

const initialState: TaskListState = {
    loading: false, 
    addTaskLoading: false, 
    newTaskDialog:false,
    taskList:[], 
}

const projectListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        
        setTaskData: (state, action) => {
            console.log({setTaskData:action})
            state.taskList = action.payload
        },
        toggleNewTaskDialog: (state, action) => {
            state.newTaskDialog = action.payload
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                console.log('action.payload',action.payload)
                state.taskList = action.payload
                state.loading = false
            })
            .addCase(getList.pending, (state) => {
                state.loading = true
            })
            .addCase(addRecord.fulfilled, (state, action) => { 
                state.addTaskLoading = false
            })
            .addCase(addRecord.pending, (state) => {
                state.addTaskLoading = true
            })
            
    },
})

export const {  setTaskData,   toggleNewTaskDialog } =
    projectListSlice.actions

export default projectListSlice.reducer
