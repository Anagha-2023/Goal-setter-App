import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  // Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
      try {
        return await authService.register(user)
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


// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Edit User 
export const editUser = createAsyncThunk('auth/editUser', async ({userId, name, email}, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token

      return await authService.editUserDeatils(token, userId, name, email)
  } catch (error) {
      alert(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// User Profile Update
export const profileUpdate = createAsyncThunk('auth/profile', async(profileUrl,thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.profileUpload(token, profileUrl)
  } catch (error) {
      const message  = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

//logout
  export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
  })

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })

          .addCase(login.pending, (state) => {
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = null
          })
          .addCase(editUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(editUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(profileUpdate.pending, (state) => {
          state.isLoading = true
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;                
          state.user = {
              ...state.user,
              profileUrl: action.payload.profileUrl
          };
         
      })
      
      .addCase(profileUpdate.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
},
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer