/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios"

const url_base = `http://127.0.0.1:8000/api`

export interface PropsAlbum{
  id: number;
  title:string;
  year:number;
  cover_url:string;
}
export interface PropsTrack{
  id: number;
  album_id:number;
  title:string;
}

export const getData = (name:"/albums"|"/tracks"|`/findPerName/${string}`) => axios.get(url_base+name)
.then(res => res.data)
.catch(err => console.log(err))

export const postData = (
  name:"/albums"|"/tracks", 
  data:PropsAlbum|PropsTrack
  ) => axios.post(url_base+name, data)
.then(res=>res.status)
.catch(err=>console.log(err))

export const deleteData = (name:"/albums"|"/tracks",id:number) => axios.delete(url_base+name+"/"+id)
.then(res => res.data)
.catch(err => console.log(err))