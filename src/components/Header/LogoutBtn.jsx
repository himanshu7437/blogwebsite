import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn({className}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
            navigate('/login')
        })
    }


  return (
    <button className={`${className}`}
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
