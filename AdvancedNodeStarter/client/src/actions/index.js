import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, file, history) => async dispatch => {
  let imageUrl = null;
  if(file){
    const uploadConfig = await axios.get('/api/upload');
    // var options = {
    //   method: 'POST',
    //   url: uploadConfig.data.url,
    //   formData: {
    //     ...uploadConfig.data.fields,
    //     file
    //   }
    // }
    fetch(uploadConfig.data.url, {
      method: 'POST',
      // credentials: 'same-origin',
      withCredentials :true,
      // headers: {
      //   'Access-Control-Allow-Origin': "*"
      // },
      formData: {
        ...uploadConfig.data.fields,
        file
      }
      // credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(_data)
    })
    .then(res => res.json())
    .catch(function(error){
      console.log('FAILURE!!', error);
    });
    // let formData = new FormData();
    // formData.append('file', file);
    // for(let key of Object.keys(uploadConfig.data.fields)){
    //   formData.append(key, uploadConfig.data.fields[key]);
    // }
    // axios.post(uploadConfig.data.url, formData,
    //   {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // ).then(function(){
    //   console.log('SUCCESS!!');
    // })
    // .catch(function(error){
    //   console.log('FAILURE!!', error);
    // });
    // const upload = await axios.post(uploadConfig.data.url, file, {
    //   headers: {
    //     'Content-Type': file.type
    //   }
    // });
    imageUrl = uploadConfig.data.key;
  }

  const res = await axios.post('/api/blogs', {
    ...values,
    imageUrl
  });

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
