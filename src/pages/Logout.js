import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, useUserDispatch } from '../components/UserContext';

export default function Logout () {
    const navigate = useNavigate();
    const dispatch = useUserDispatch();
    useEffect(() => {
        signOut(dispatch);
        navigate('/', { replace: true });
    }, [dispatch, navigate]);
    return null;
}
