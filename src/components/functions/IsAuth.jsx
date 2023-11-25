


import axios from "axios";

export default async function  isAuth(){
    axios.defaults.withCredentials = true;

  const res = await axios.get(`${import.meta.env.VITE_API}/user/authorize`)
  return res
}