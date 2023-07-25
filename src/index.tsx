import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/Home/Home';
import JobDetail from './pages/JobDetail/JobDetail';
import JobList from './pages/JobList/JobList';
import JobType from './pages/JobType/JobType';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { store } from './redux/configStore';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import LoginTemplate from './templates/LoginTemplate/LoginTemplate';


export const history: any = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='detail'>
            <Route path=':id' element={<JobDetail />} />
          </Route>
          <Route path='category'>
            <Route path=':id' element={<JobList />} />
          </Route>
          <Route path='result'>
            <Route path=':keyword' element={<JobList />}></Route>
          </Route>
          <Route path='profile' element={<Profile />} />
          <Route path='type'>
            <Route path=':id' element={<JobType />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
        <Route path='users' element={<LoginTemplate />}>
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
     
      </Routes>
    </HistoryRouter>
  </Provider>
);
