import { useEffect } from "react";
import { getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.login.currentUser?.access_token)
  const users = useSelector((state) => state.user.users.allUsers)
  const navigate = useNavigate()
  useEffect(() => {
    if (!users) navigate('/login')
    if (users) {
     getAllUsers(token,dispatch)
    }
  },[])
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {users?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
