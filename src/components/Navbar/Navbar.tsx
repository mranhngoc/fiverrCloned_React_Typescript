import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DsChiTietLoai, DsNhomChiTietLoai, JobMenuModel } from "../../Models/jobMenu/jobMenuModel";
import { jobMenu } from "../../util/api";

type Props = {};

const Navbar = (props: Props) => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const [data, setData] = useState<JobMenuModel[]>([])
  const showNavbar = () => {
    window.scrollY >= 150 ? setNavbar(true) : setNavbar(false);
  };

  window.addEventListener("scroll", showNavbar);

  const getJobMenu = async () => {
    const result = await jobMenu.getJobMenu();
    setData(result)
  }


  useEffect(() => {
    getJobMenu();
  }, [])
  return (
    <nav className={navbar ? "nav__wrapper navbar-active" : "nav__wrapper"}>
      <div className="navbar__container width-container">
        <ul className="navbar-list">
          {data.map((job:JobMenuModel, t:number) => {
            return <li key={t}>
            <NavLink to={`/type/${job.id}`} onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}>{job.tenLoaiCongViec}</NavLink>
            <div className="navbar-menu">
              <div className="navbar__wrap">
                
                {job.dsNhomChiTietLoai.map((jb: DsNhomChiTietLoai, i: number) => {
                  return <div className="navbar__content" key={i}>
                    <h6>{jb.tenNhom}</h6>
                    <ul>
                      {jb.dsChiTietLoai.map((j:DsChiTietLoai, l:number) => {
                        return <li key={l}>
                          <NavLink to={`/category/${j.id}`} onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}>
                            {j.tenChiTiet}
                          </NavLink>
                        </li>
                      })}
                    </ul>
                  </div>
                  })}
                </div> 
            </div>
          </li>
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
