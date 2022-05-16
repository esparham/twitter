import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(userActions.setUserLogout());

  localStorage.removeItem('token');
};

export default Logout;
