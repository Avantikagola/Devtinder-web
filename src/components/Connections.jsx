import React from 'react'
import axios from 'axios';
import { BASE_URL } from  "../utils/constant";
import {useEffect} from "react";
import {connect,useDispatch,useSelector} from "react-redux";
import {addConnections} from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store)=>store.connetions);
const dispatch= useDispatch();
    const fetchConnections = async()=>{
        try{
           const res = await axios.get(BASE_URL +"/user/connections",{
            withCredentials:true,
           });
           
           dispatch(addConnections(res.data.data));
        }
        catch(err){
           // Handle Error Case
        }
    };

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length ===0) return <h1> No Connections Found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-3xl'> Connections</h1>
    {connections.map((connections)=>{

        const {firstName, lastName, photUrl, age,gender,about}=connection;
       return (
       <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2'>
            <div >
             <img alt='photo' className='w-20 h-20' src={photUrl}/>
            </div>
           <div className='text-left mx-4'> 
             <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
             <p>{about}</p>
            </div>  
        </div>
    );
    })};
    </div>
  );
};

export default Connections;