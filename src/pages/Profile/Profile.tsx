import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { DispatchType } from "../../redux/configStore";
import { getJobHiredAPI, profileAPI } from "../../redux/userReducer/userReducer";
import { USER_LOGIN, getStoreJson } from '../../util/config';
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";

type Props = {};

const Profile = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
  const navigate = useNavigate();
  
  const getProfile = () => {
    const user = getStoreJson(USER_LOGIN);
    if(user) {
      const action = profileAPI(user.id);
      dispatch(action)
    } else{
      toast.info("Login to continue.", {autoClose: 3000})
      navigate("/")
    }
  }

  const getJobHired = () => {
    dispatch(getJobHiredAPI())
  }
  useEffect(() => {
    window.scrollTo(0,0)
    getJobHired();
    getProfile();
  }
  ,[])

  return (
    <div className="profile">
      <div className="profile--content width-container">
        <ProfileLeft />
        <ProfileRight />
      </div>
    </div>
  );
};

export default Profile;
