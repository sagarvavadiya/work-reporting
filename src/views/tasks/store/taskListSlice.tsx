import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTasks,
    apiDeleteTasks,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Products = Product[]

type GetTasksResponse = {
    data: Products
    total: number
}

type FilterQueries = {
    name?: string
    category?: string[]
    status?: number[] 
}

export type TaskListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedTask: string
    tableData: TableQueries
    filterData: FilterQueries
    taskList: Product[]
}

type GetTasksRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'taskList'

export const getTasks = createAsyncThunk(
    SLICE_NAME + '/getTasks',
    async (data: GetTasksRequest) => {
        const response = await apiGetTasks<
            GetTasksResponse,
            GetTasksRequest
        >(data)
 
        return response.data
    }
)

export const deleteTask = async (data: { id: string | string[] }) => {
    const response = await apiDeleteTasks<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: TaskListState = {
    loading: false,
    deleteConfirmation: false,
    selectedTask: '',
    taskList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: [ ],
        status: [0, 1, 2], 
    },
}

const taskListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateTaskList: (state, action) => {
            state.taskList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => { 
                state.taskList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateTaskList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedTask,
} = taskListSlice.actions

export default taskListSlice.reducer
