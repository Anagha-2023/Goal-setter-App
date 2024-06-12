import axios from 'axios';

const API_URL = '/api/admin/';

// Login Admin
const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL + 'login', adminData);

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }

  return response.data;
};


//Logout Admin
const adminLogout = () => {
  localStorage.removeItem('admin')
}

//get All users
const  getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization : `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL,config)
  return response.data
}

//Block User

const userBlock = async (token, userId) => {
  const config = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL + 'block', {
    userId},config)
    return response.data
}

//Edit User Details

const editUserDetails = async (token,userId, name, email,phone) => {
  const config = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }
  const response=await axios.put(API_URL+userId,{userId,name,email,phone},config)
  return response.data
}

//add User
const addUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post('/api/admin/adduser', userData, config);

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }

  return response.data;
};

//user search
const searchUser=async(query,token)=>{
   
  const config={
      
      headers:{
          Authorization:`Bearer ${token}`
      }
  }

  const response=await axios.post('/api/admin/search',{query},config)
  
  return response.data
}


const adminAuthService={
  adminLogin,
  adminLogout,
  getAllUsers,
  userBlock,
  editUserDetails,
  searchUser,
  addUser


}

export default adminAuthService;