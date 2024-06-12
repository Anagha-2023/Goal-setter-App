import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminAuthService from './adminService';

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUserAdded: false,
  message: '',
};

//admin login

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (admin, thunkAPI) => {
    try {
      return await adminAuthService.adminLogin(admin);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//admin logout

export const adminLogout = createAsyncThunk('auth/logout', async () => {
  await adminAuthService.adminLogout()
})

//get users

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      const response = await adminAuthService.getAllUsers(token);
      return response.users;
    } catch (error) {
      const message =
        (error.response &&
         error.response.data &&
         error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

//user block

export const UserBlock = createAsyncThunk(
  "admin/userBlock",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminAuthService.userBlock(token, userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//search user

export const searchUser = createAsyncThunk(
  "admin/searchUser",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      
      return await adminAuthService.searchUser(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Edit User

export const editUser = createAsyncThunk('admin/editUser', async ({userId, name, email}, thunkAPI) => {
  try {
      const token = thunkAPI.getState().adminAuth.admin.token
      return await adminAuthService.editUserDetails(token, userId, name, email)
  } catch (error) {
      alert(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

//adduser

export const addUser = createAsyncThunk(
  'admin/register',
  async (user, thunkAPI) => {
   
    try {
      const token = thunkAPI.getState().adminAuth.admin.token
      return await adminAuthService.addUser(user,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isUserAdded=false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
          state.admin = null
        })
        .addCase(getAllUsers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.users = action.payload;
        })
      
        .addCase(UserBlock.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(UserBlock.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.users = action.payload.users;
        })
        .addCase(UserBlock.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(editUser.pending, (state) => {
          state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.users = action.payload.users
      })
      .addCase(editUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isUserAdded=true
        state.users = action.payload.users
    })
    .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
     
  },
});

export const {reset} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;