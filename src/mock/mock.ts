import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi, salesFakeApi } from './fakeApi'
import { tasksData, salesDashboardData, tasksTreeData } from './data/salesData'

const { apiPrefix } = appConfig
const exatractNestedChild = () => {
    let data: INode[] = tasksTreeData
    let level = [24]
    let listing: INode[] = []
    const listLastNestedItems = (data: INode[], parentId = 0) => {
        data.forEach((record: any) => {
            if (level.includes(`${record.id}`.length)) {
                // console.log(first)
            listing.push({ ...record, parent_id: parentId })
            }

            if (record.children && record.children.length > 0) {
                listLastNestedItems(record.children, record.id)
            }
        })
    }
    listLastNestedItems(data)


    return listing
}
export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                salesDashboardData,
                tasksData,
                tasksTreeData: exatractNestedChild()
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                const isResource = request.url.startsWith('data:text')
                return isExternal || isResource
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
        },
    })
}
