import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//login user
// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


// Logout user
const logout = () => {
  localStorage.removeItem('user')
}
//edit user deatils
const editUserDeatils=async(token,userId,name,email)=>{
  const config={
      headers:{
          Authorization:`Bearer ${token}`
      }
  }
  const response=await axios.put(API_URL+userId,{userId,name,email},config)
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  
  return response.data
}

// Profile Uplaod
const profileUpload = async(token, url) => {
  const config = {
      headers : {
          Authorization: `Bearer ${token}`
      }
  }
  const liveUser = JSON.parse(localStorage.getItem('user'))
  const response = await axios.post(API_URL + 'profile/upload',{url, liveUser}, config)

const userString = localStorage.getItem('user');

if (userString) {
  const user = JSON.parse(userString);
  user.profileUrl = response.data.profileUrl;
  localStorage.setItem('user', JSON.stringify(user));
}

  return response.data
}



const authService = {
    register,
    logout,
    login,
    editUserDeatils,
    profileUpload
  
  }
  
  export default authService