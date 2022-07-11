import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createIntance";
const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.auth.login.currentUser?.access_token
  );
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser
  );
  let axiosJWT = createAxios(currentUser,dispatch,token,loginSuccess)
  const user = useSelector((state) => state.auth.login.currentUser?.user);
  const users = useSelector((state) => state.user.users?.allUsers);
  const msg = useSelector((state) => state.auth?.deleteUser?.msg);
  const navigate = useNavigate();

  const handleDeleteUser = (userId) => {
    deleteUser(token,dispatch,userId,axiosJWT)
  }
  useEffect(() => {
    if (!token) navigate("/login");
    getAllUsers(token, dispatch,axiosJWT);
  }, []);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">Your role {user?.admin ? "Admin" : "User"}</div>
      <div className="home-userlist">
        {users?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="home-role">
                Your role {user.admin ? "Admin" : "User"}
              </div>
              <div className="delete-user" onClick={() => handleDeleteUser(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
  );
};

export default HomePage;
