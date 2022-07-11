import axios from "axios";
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, loginFailed, loginStart, loginSuccess, logoutFaild, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
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

export const getAllUsers = async (accessToken,dispatch,axiosJWT) => {
    dispatch(getAllUsersStart())
    try {
        const url = process.env.REACT_APP_BASE_URL + '/v1/get-all-user'
        const res = await axios.get(url,{headers:{
            token:`Bearer ${accessToken}`
        }})
        dispatch(getAllUsersSuccess(res.data))
    } catch (error) {
        dispatch(getAllUsersFailed(error.message))
    }
}

export const deleteUser = async (accessToken,dispatch,userId,axiosJWT) => {
  dispatch(deleteUserStart())
  try {
      const url = process.env.REACT_APP_BASE_URL + `/v1/delete-user/${userId}`
      console.log(process.env.REACT_APP_BASE_URL);
      const res = await axiosJWT.delete(url,{headers:{
          token:`Bearer ${accessToken}`
      }})
      dispatch(deleteUserSuccess(res.data))
  } catch (error) {
      dispatch(deleteUserFailed(error.response?.data))
  }
}

export const logout = async (dispatch,navigate,token,axiosJWT,id) => {
   dispatch(logoutStart())
   try {
     await axiosJWT.post('/v1/logout', id,{
      headers:{token:`Bearer ${token}`}
     })
     dispatch(logoutSuccess())
   } catch (error) {
    dispatch(logoutFaild())
   }
}