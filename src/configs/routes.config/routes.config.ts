import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'
export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'manageTasks',
        path: '/manage-tasks',
        component: lazy(() => import('@/views/tasks/TaskList')),
        authority: [],
    }, 
    {
        key: 'addEditTask',
        path: `/add-edit-task`,
        component: lazy(() => import('@/views/tasks/TaskAddEdit')),
        authority: [],
       
    },
    {
        key: 'manageTaskTree',
        path: `/manage-task-tree`,
        component: lazy(() => import('@/views/tasks/ManageTaskTree')),
        authority: [],
       
    },
    {
        key: 'practice',
        path: `/practice`,
        component: lazy(() => import('@/views/practice/Practice')),
        authority: [], 
    },
    {
        key: 'analysisTasks',
        path: `/analysis-tasks`,
        component: lazy(() => import('@/views/analysis/AnalysisTasks')),
        authority: [],

    },
    {
        key: 'startQuiz',
        path: `/start-quiz`,
        component: lazy(() => import('@/views/practice/StartQuiz/StartQuiz')),
        authority: [], 
    },

    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]