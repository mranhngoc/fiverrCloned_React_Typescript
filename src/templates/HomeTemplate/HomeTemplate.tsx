import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

type Props = {}

const HomeTemplate = (props: Props) => {
  return (
    <div>
        <ToastContainer />
        <Header />
        <Navbar />
        <Sidebar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default HomeTemplate