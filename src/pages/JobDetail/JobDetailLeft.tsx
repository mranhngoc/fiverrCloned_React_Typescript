import { useEffect, useState } from 'react';
import JobDetailPayment from './JobDetailPayment/JobDetailPayment';
import JobDetailReview from './JobDetailReview/JobDetailReview';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/configStore';
import {
  Comment,
  JobDetailModel,
  PostComment,
} from '../../Models/jobDetail/jobDetailModel';
import { useNavigate, useParams } from 'react-router-dom';
import { jobDetail } from '../../util/api';
import avatarEmpty from '../../assets/img/avatar-empty.jpg';

const JobDetailLeft = () => {
  const [arrComment, setArrComment] = useState<Comment[]>([]);
  const [dataDetail, setDataDetail] = useState<JobDetailModel[]>([]);

  const { userLogin } = useSelector((state: StateType) => state.userReducer);

  const navigate = useNavigate();
  const param = useParams();

  const getDetailById = async () => {
    const value = await jobDetail.getDetailById(param.id);
    setDataDetail(value);
  };
  const getCommentById = async () => {
    const value = await jobDetail.getCommentById(param.id);
    setArrComment(value);
  };

  useEffect(() => {
    getDetailById();
    getCommentById();
  }, []);

  const postComment = async () => {
    if (userLogin) {
      const day = new Date();

      const id = 1;
      const maCongViec = Number(param.id);
      const maNguoiBinhLuan = userLogin?.id;
      const ngayBinhLuan =
        day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear();
      const noiDung = (
        document.getElementById('input-comment') as HTMLInputElement
      ).value;
      const saoBinhLuan = 5;

      const value: PostComment = {
        id,
        maCongViec,
        maNguoiBinhLuan,
        ngayBinhLuan,
        noiDung,
        saoBinhLuan,
      };

      const newDataComment = await jobDetail.postComment(value);
      setArrComment(newDataComment);

      (document.getElementById('input-comment') as HTMLInputElement).value = '';
    } else {
      navigate('/users/login');
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    postComment();
  };
  return (
    <div>
      {dataDetail.map((detail: JobDetailModel, index: number) => {
        return (
          <div  key={index}>
            <div className='jobdetai--overview'>
              <div className='nav'>
                <ul>
                  <li>
                    <a href='#'>{detail.tenLoaiCongViec}</a>
                    <svg
                      width='8'
                      height='16'
                      viewBox='0 0 8 16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z'></path>
                    </svg>
                  </li>
                  <li>
                    <a href='#'>{detail.tenNhomChiTietLoai}</a>
                    <svg
                      width='8'
                      height='16'
                      viewBox='0 0 8 16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z'></path>
                    </svg>
                  </li>
                  <li>
                    <a href='#'>{detail.tenChiTietLoai}</a>
                  </li>
                </ul>
              </div>
              <h1>{detail.congViec.tenCongViec}</h1>
              <div className='foot'>
                <div className='avatar'>
                  <img className='ziXAPIc' src={detail.avatar} />
                </div>
                <div className='description'>
                  <div className='name'>{detail.tenNguoiTao}</div>
                  <div className='level'>
                    Level {detail.congViec.saoCongViec} Seller
                  </div>
                  <div className='star'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <span> 5</span>
                    <span>({detail.congViec.danhGia})</span>
                  </div>
                  <div className='order'>2 Orders in Queue</div>
                  <div className='choice'></div>
                </div>
              </div>
            </div>
            <div className='jobdetail--gallery'>
              <Slick>
                <div className='gallery--item' >
                  <img src={detail.congViec.hinhAnh} alt='...' />
                </div>
              </Slick>
            </div>
            <div className='aboutgig'>
              <h2>About This Gig</h2>
              <b>
                <u>***ALWAYS DISCUSS FIRST BEFORE MAKING ORDER***</u>
              </b>
              <br />
              <b>
                <u>***ALWAYS DISCUSS FIRST BEFORE MAKING ORDER***</u>
              </b>
              <br />
              <b>
                <u>***ALWAYS DISCUSS FIRST BEFORE MAKING ORDER***</u>
              </b>
              <br />
              <br />
              <div className='intro'>{detail.congViec.moTa}</div>
              <br />
              <br />
              <div className='icando'>
                <b>
                  <u>I CAN DO :</u>
                </b>
                <br />
                <br />

                {detail.congViec.moTaNgan}
                <br />
              </div>
              <div className='data'>
                <ul>
                  <li className='data-item'>
                    <p>Progamming language</p>
                    <ul>
                      <li>PHP</li>
                    </ul>
                  </li>
                  <li className='data-item'>
                    <p>Expertise</p>
                    <ul>
                      <li>Performance</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className='aboutseller'>
              <h2>About The Seller</h2>
              <div className='top'>
                <div className='img'>
                  <img src={detail.avatar} />
                </div>
                <div className='info'>
                  <h6>{detail.tenNguoiTao}</h6>
                  <p>
                    I am a Software Engineer and a BEST WEB DESIGNER and
                    DEVELOPER
                  </p>
                  <div className='star'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>5
                    <span>({detail.congViec.danhGia})</span>
                  </div>
                  <button className='btn'>Contact me</button>
                </div>
              </div>
              <div className='bot'>
                <ul>
                  <li>
                    From<strong>Paskistan</strong>
                  </li>
                  <li>
                    Member since<strong>Feb 2017</strong>
                  </li>
                  <li>
                    Avg. response time<strong>1 hour</strong>
                  </li>
                  <li>
                    Last delivery<strong>about 10 hours</strong>
                  </li>
                </ul>
                <div className='article'>{detail.congViec.moTaNgan}</div>
              </div>
            </div>
          </div>
        );
      })}

      <JobDetailPayment />
      <JobDetailReview />

      <div className='jobdetail--comment'>
        <ul>
          {arrComment.map((cmt: Comment, index: number) => {
            return (
              <li key={index}>
                <div className='item'>
                  <div className='item--top'>
                    <div className='avatar'>
                      {cmt?.avatar !== '' ? (
                        <img src={cmt.avatar} alt='...' />
                      ) : (
                        <img src={avatarEmpty} alt='...' />
                      )}
                    </div>
                    <div className='info'>
                      <div className='name'>{cmt.tenNguoiBinhLuan}</div>
                      <div className='country'>
                        <div className='country--flag'>
                          <img
                            src='https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'
                            alt='...'
                          />
                        </div>
                        <div className='country--name'>Việt Nam</div>
                      </div>
                    </div>
                  </div>
                  <div className='item--bot'>
                    <div className='star--time'>
                      <div className='star'>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>5
                      </div>
                      <span></span>
                      <div className='time'>{cmt.ngayBinhLuan}</div>
                    </div>
                    <div className='comment'>{cmt.noiDung}</div>
                    <div className='helpful'>
                      Helpful?{' '}
                      <span className='yes'>
                        <i className='fa-regular fa-thumbs-up'></i> Yes
                      </span>{' '}
                      <span className='no'>
                        <i className='fa-regular fa-thumbs-up'></i> No
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className='add--comment'>
            <div className='image'>
              {userLogin?.avatar === '' ? (
                <img src={avatarEmpty} alt='...' />
              ) : (
                <img src={userLogin?.avatar} alt='...' />
              )}
            </div>
            <input
              id='input-comment'
              className='form-control'
              type='text'
              placeholder='Send comment...'
            ></input>
          </div>
          <button className='btn btn-primary'>
            {userLogin ? 'Send' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetailLeft;
