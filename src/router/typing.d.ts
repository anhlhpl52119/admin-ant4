import type { ERole } from "@/enums/common.enum"
import type { ERouteName } from "@/enums/router.enum"
import type { RouteComponent, RouteRecordRaw } from "vue-router"

export type RouteMeta = {
    icon?: string,
    title: string,
    hiddenInMenu: boolean,
    permit?: ERole[]
} 

export type CustomRoute = RouteRecordRaw & {
    path: string
    name: ERouteName
    component: RouteComponent
    redirect?: string
    meta: RouteMeta
    children?: CustomRoute[]
}