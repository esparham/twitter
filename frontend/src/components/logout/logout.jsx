import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.setUserLogout());
    localStorage.clear();
    navigate('/login');
  }, [dispatch, navigate]);
};

export default Logout;
