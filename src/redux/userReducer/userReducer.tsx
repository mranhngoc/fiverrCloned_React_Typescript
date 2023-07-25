import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../';
import { LoginModel } from '../../Models/loginModel/loginModel';
import { RegisterModel } from '../../Models/registerModel/registerModels';
import {
  EditUserModel,
  JobHired,
  ProfileModel,
  UserState,
} from '../../Models/userModel/userModel';
import {
  ACCESS_TOKEN,
  ROLE,
  USER_LOGIN,
  getStoreJson,
  http,
  modal,
  setCookie,
  setStore,
  setStoreJson,
} from '../../util/config';
import { DispatchType } from '../configStore';

const initialState: UserState = {
  userLogin: getStoreJson(USER_LOGIN),
  jobHired: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state: UserState, action: PayloadAction<ProfileModel>) => {
      state.userLogin = action.payload;
    },
    jobHiredAction: (state: UserState, action: PayloadAction<JobHired[]>) => {
      state.jobHired = action.payload;
    },
  },
});

export const { loginAction, jobHiredAction } = userReducer.actions;

export default userReducer.reducer;

// --------- action sync ---------

// --- Register

export const resgisterAPI = async (value: RegisterModel) => {
  try {
    await http.post('/auth/signup', value);
    toast.success('Register account successfully.', { autoClose: 3000 });

    setTimeout(() => {
      history.push('/users');
    }, 2500);
  } catch (error: any) {
    setTimeout(() => {
      toast.error('Email already exists.', { autoClose: 3000 });
    }, 200);
  }
};

// --- Login
export const loginAPI = (value: LoginModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await http.post('/auth/signin', value);

      const action = loginAction(result.data.content.user);
      dispatch(action);

      toast.success('Login successfully.', { autoClose: 3000 });
      setTimeout(() => {
        history.push('/');
      }, 2500);

      setStoreJson(USER_LOGIN, result.data.content.user);
      setStore(ROLE, result.data.content.user.role);
      setStore(ACCESS_TOKEN, result.data.content.token);
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setCookie(ROLE, result.data.content.user.role, 30);
    } catch (error) {
      setTimeout(() => {
        toast.error('Email or password is incorrect.', { autoClose: 3000 });
      }, 200);
    }
  };
};

// get Profile
export const profileAPI = (id: number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/users/${id}`);
    const actionUser = loginAction(result.data.content);
    dispatch(actionUser);
  };
};

// update Profile
export const updateProfileAPI = (values: EditUserModel) => {
  return async (dispatch: DispatchType) => {
    await http.put(`/users/${values.id}`, values);
    toast.success('Update profile successfully.', { autoClose: 3000 });
    modal.closeModal('.modal__edit-user');
    dispatch(profileAPI(values.id));
  };
};

// Change avatar
export const changeAvatarAPI = (file: any) => {
  return async (dispatch: DispatchType) => {
    try {
      await http.post(
        '/users/upload-avatar',
        { formFile: file },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const { id } = getStoreJson(USER_LOGIN);
      await dispatch(profileAPI(id));
      toast.success('Change avatar successfully.', { autoClose: 3000 });
    } catch (error) {
      toast.error('Image size must be less than 1Mb.', { autoClose: 3000 });
    }
  };
};

// get Job hired
export const getJobHiredAPI = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get('/thue-cong-viec/lay-danh-sach-da-thue');
    dispatch(jobHiredAction(result.data.content));
  };
};

// delete Job hired
export const deleteJobHiredAPI = (id: number) => {
  return async (dispatch: DispatchType) => {
    await http.delete(`/thue-cong-viec/${id}`);
    dispatch(getJobHiredAPI());
    toast.success(`Delete #${id} successfully.`, { autoClose: 3000 });
  };
};

// function dispatch(action: {
//   payload: ProfileModel;
//   type: 'userReducer/loginAction';
// }) {
//   throw new Error('Function not implemented.');
// }
