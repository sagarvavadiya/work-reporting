import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs' 

export default function salesFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/sales/dashboard`, (schema) => {
        return schema.db.salesDashboardData[0]
    })

    server.post(`${apiPrefix}/tasks`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody) 
        const { pageIndex, pageSize, sort, query } = body
        const { order, key } = sort
        // const tasks = schema.db.tasksData 

      
        const tasks = schema.db.tasksTreeData

        const sanitizeTasks = tasks.filter(
            (elm) => typeof elm !== 'function'
        )
      
        let data = sanitizeTasks
        let total = tasks.length

        if ((key === 'category' || key === 'name') && order) {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase()
                )
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }
        data = paginate(data, pageSize, pageIndex) 
        const responseData = {
            data: data,
            total: total,
        } 
        return responseData
    })

    server.del(
        `${apiPrefix}/tasks/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            // schema.db.tasksData.remove({ id })
            // const tasks = exatractNestedChild(schema.db.tasksTreeData,[3] )
            schema.db.tasksTreeData.remove({ id })
            return true
        }
    )

    server.get(`${apiPrefix}/tasks`, (schema, { queryParams }) => {
        const id = queryParams.id
        const task = schema.db.tasksTreeData.find(id)
        return task
    })

    server.put(
        `${apiPrefix}/tasks/update`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            const { id } = data
            schema.db.tasksTreeData.update({ id }, data)
            return true
        }
    )

    server.post(
        `${apiPrefix}/tasks/create`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.tasksTreeData.insert(data)
            return true
        }
    )

    server.get(`${apiPrefix}/sales/orders`, (schema, { queryParams }) => { 
        const { pageIndex, pageSize, query } = queryParams
        const order = queryParams['sort[order]']
        const key = queryParams['sort[key]']
        const orders = schema.db.ordersData
        const sanitizeTasks = orders.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeTasks
        let total = orders.length

        if (key) {
            if (
                (key === 'date' ||
                    key === 'status' ||
                    key === 'paymentMehod') &&
                order
            ) {
                data.sort(sortBy(key, order === 'desc', parseInt as Primer))
            } else {
                data.sort(
                    sortBy(key, order === 'desc', (a) =>
                        (a as string).toUpperCase()
                    )
                )
            }
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/sales/orders/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            id.forEach((elm: string) => {
                schema.db.ordersData.remove({ id: elm })
            })
            return true
        }
    )

    server.get(
        `${apiPrefix}/sales/orders-details`,
        (schema, { queryParams }) => {
            const { id } = queryParams
            const orderDetail = schema.db.orderDetailsData
            orderDetail[0].id = id
            return orderDetail[0]
        }
    )
}
