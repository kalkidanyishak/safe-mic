import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchDjango = (endpoint, method, body) => {
  let access=localStorage.getItem('access')
  console.log(access)
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${access}`,
      Accept: "application/json",
    },
  };
  if (method == 'GET') {
    return axios.get(`http://localhost:8000/${endpoint}`, body);
  }
  if (method == 'POST') {
    return axios.post(`http://localhost:8000/${endpoint}`, body);
  }
};


const useFetch = (endpoint, fetchOnLoad = false, method = 'GET', body = {}) => {

  const [endPoint, setEndPoint] = useState(endpoint)
  const [fetch, setFetch] = useState(fetchOnLoad);

  const queryInfo = useQuery(endPoint, () => fetchDjango(endPoint, method, body), {
    enabled: fetch,
  });

  const changeEndPoint = (end) => {
    setEndPoint(end)
  }

  const fetchNow = () => {
    setFetch(true);
  };

  const resetFetch = () => {
    setFetch(false)
  }

  return { ...queryInfo, fetchNow, fetch, resetFetch, changeEndPoint };
};

export default useFetch;
