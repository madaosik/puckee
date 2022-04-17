import React from "react"
import { Outlet } from "react-router-dom"
import AuthHeader from "../components/Auth/AuthHeader"
import { Header } from "../components/Header"


export const StdLayout = () => {
    return  (
        <>
            <div className="topBar std"></div>
            <div className="container-xxl fixed">
                <div className="main-app std">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export const SearchLayout = () => {
    return  (
        <>
            <div className="topBar search"></div>
            <div className="container-xxl fixed">
                <div className="main-app search">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export const DashboardLayout = () => {
    return  (
        <>
            <div className="topBar dashboard"></div>
            <div className="container-xxl fixed">
                <div className="main-app dashboard">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export const AuthLayout = () => {
    return (
        <>
            <AuthHeader/>
            <div className="container min-vh-100">
                <div className="centeringFlex">
                    <div className="authFlex">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}