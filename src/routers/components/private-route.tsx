import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelectors } from '~modules/user';

function PrivateRoute() {
    const currentUser = useSelector(userSelectors.data);
    return <>{currentUser ? <Outlet /> : <Navigate to='/sign-in' />}</>;
}

export default PrivateRoute;
