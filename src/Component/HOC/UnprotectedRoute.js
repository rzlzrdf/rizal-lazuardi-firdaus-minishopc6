import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const UnprotectedRoute = () => {
    const user = useSelector(store => store.user.data)

    if(user === null){
        return(
            <Outlet />
        )
    } else{
       return(
           <Navigate to='/' />
       ) 
    }
}

export default UnprotectedRoute