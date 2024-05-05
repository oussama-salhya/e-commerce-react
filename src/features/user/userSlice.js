import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  themes,
  getThemeFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
  logoutUserThunk,
  showMeUserThunk,
} from "./userThunk";
import { errorMsg, successMsg } from "../../utils/msgService";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);
export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (user, thunkAPI) => {
    return clearStoreThunk(thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (user, thunkAPI) => {
    return logoutUserThunk("/auth/logout", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);
// // todo make the thunk
// export const logoutUser = createAsyncThunk(
//   "user/logout",
//   async (user, thunkAPI) => {
//     return logoutUserThunk("/auth/logout", user, thunkAPI);
//   }
// );
export const showMe = createAsyncThunk(
  "user/showMe",
  async (user, thunkAPI) => {
    return showMeUserThunk("/users/showMe", user, thunkAPI);
  }
);

// export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

// export const verifyEmail = createAsyncThunk(
//   "user/verifyEmail",
//   async (user, thunkAPI) => {
//     return updateUserThunk("/auth/verifyEmail", user, thunkAPI);
//   }
// );
// export const loginWithGoogle = createAsyncThunk(
//   "user/loginWithGoogle",
//   async (user, thunkAPI) => {
//     return updateUserThunk("/auth/loginWithGoogle", user, thunkAPI);
//   }
// );

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserValues: (state) => {
      console.log("l");
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      toast.success("Logged Out!");
    },
    toggleTheme: (state) => {
      const { dark, light } = themes;
      state.theme = state.theme === dark ? light : dark;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        successMsg(payload);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        errorMsg(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        successMsg(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        errorMsg(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        successMsg(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      })
      // [verifyEmail.pending]: (state) => {
      //       state.isLoading = true;
      //   },
      //   [verifyEmail.fulfilled]: (state, { payload: { user } }) => {
      //       addUserToLocalStorage(user)
      //       state.isLoading = false;
      //       state.user = user;
      //       state.isLoggedIn = true
      //   },
      //   [verifyEmail.rejected]: (state, { payload }) => {
      //       state.isLoading = false;
      //       state.showError = true;
      //       state.msg = payload
      //   },
      //   [loginWithGoogle.pending]: (state) => {
      //       state.isLoading = true;
      //   },
      //   [loginWithGoogle.fulfilled]: (state, { payload: { user } }) => {
      //       addUserToLocalStorage(user)
      //       state.user = user
      //       state.isLoggedIn = true
      //       state.isLoginPageOpened = false
      //       state.showAccountMenu = true
      //   },
      //   [loginWithGoogle.rejected]: (state, { payload }) => {
      //       state.isLoading = false;
      //       state.showError = true;
      //       state.msg = payload
      //   },
      .addCase(showMe.fulfilled, (state, { payload: user }) => {
        addUserToLocalStorage(user);
        state.user = user;
        state.isLoggedIn = true;
        state.isLoginPageOpened = false;
      });
  },
});
export const { toggleSidebar, toggleTheme, clearUserValues } =
  userSlice.actions;
export default userSlice.reducer;
