import { PostComment, ThueCongViec } from '../Models/jobDetail/jobDetailModel';
import { http } from './config';

export const jobType = {
  getTypeById: async function (id: string | undefined) {
    try {
      const response = await http.get(
        `/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`
      );
      const result = response.data.content;
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export const jobList = {
  getListById: async (id: string | undefined) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`
      );
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  },

  jobSearch: async (param: string | undefined) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${param}`
      );
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  },
};

export const jobDetail = {
  getDetailById: async (id: string | undefined) => {
    try {
      const result = await http.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);

      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  },

  getCommentById: async (id: string | undefined | number) => {
    try {
      const result = await http.get(
        `/binh-luan/lay-binh-luan-theo-cong-viec/${id}`
      );
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  },

  postComment: async (value: PostComment) => {
    try {
      await http.post('/binh-luan', value);
      return jobDetail.getCommentById(value.maCongViec);
    } catch (error) {
      console.log(error);
    }
  },

  hireJob: async (value: ThueCongViec) => {
    try {
      await http.post('/thue-cong-viec', value);
    } catch (error) {
      console.log(error);
    }
  },
};

export const jobMenu = {
  getJobMenu: async () => {
    const result = await http.get('/cong-viec/lay-menu-loai-cong-viec');
    return result.data.content;
  },
};
