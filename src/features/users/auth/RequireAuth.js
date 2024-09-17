import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const RequireAuth = ({ admin }) => {
    const location = useLocation()
    const { username } = useAuth()

    const content = (
       (username === admin ) ? <Outlet /> : <Navigate to='/' state={{ from: location}} replace />
    )
  return content
}

export default RequireAuth