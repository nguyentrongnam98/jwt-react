import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getAllUsersFailed, getAllUsersStart, getAllUsersSuccess } from "./userSlice";

export const login = async (user,dispatch,navigate) => {
  dispatch(loginStart())
  try {
    const url = process.env.REACT_APP_BASE_URL + '/v1/login'
    const res = await axios.post(url,user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (error) {
    dispatch(loginFailed(error.message))
  }
}

export const register = async (newUser,dispatch,navigate) => {
    dispatch(registerStart())
    try {
      const url = process.env.REACT_APP_BASE_URL + '/v1/register'
      await axios.post(url,newUser)
      dispatch(registerSuccess('Register success'))
      navigate('/login')
    } catch (error) {
      dispatch(registerFailed(error.message))
    }
}

export const getAllUsers = async (accessToken,dispatch) => {
    dispatch(getAllUsersStart())
    try {
        const url = process.env.REACT_APP_BASE_URL + '/v1/get-all-user'
        const res = await axios.get(url,{headers:{
            token:`Bearer ${accessToken}`
        }})
        console.log(res.data);
        dispatch(getAllUsersSuccess(res.data))
    } catch (error) {
        dispatch(getAllUsersFailed(error.message))
    }
}