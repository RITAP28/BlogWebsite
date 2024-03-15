import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({children}) => {
    const { isAuthenticated } = useSelector(state => state.user);
    // const navigate = useNavigate();
    if(!isAuthenticated){
        return <Navigate to='/login' />
    } else {
        <Outlet />
    }
    return children;
}

export default ProtectedRoutes; 