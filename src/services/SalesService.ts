import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

export async function apiGetTasks<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/tasks',
        method: 'post',
        data,
    })
}

export async function apiDeleteTasks<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/tasks/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetTask<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/tasks',
        method: 'get',
        params,
    })
}

export async function apiPutTask<T, U extends Record<string, unknown>>(
    data: U
) { 
    return ApiService.fetchData<T>({
        url: '/tasks/update',
        method: 'put',
        data,
    })
}

export async function apiCreateTask<
    T,
    U extends Record<string, unknown>
>(data: U) {
     
    return ApiService.fetchData<T>({
        url: '/tasks/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
