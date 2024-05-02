import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute: any = ({ children, allowedRoles }: any) => {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole'); // You might store the role in localStorage after login

    if (allowedRoles !== userRole) {
        console.log(allowedRoles);
        console.log(userRole);
        return <Navigate to="/error" state={{ from: location }} replace/>;
    }
    return children;
}

export default ProtectedRoute;