import { useState,useEffect } from "react";

function useCustomHook2(url){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        setLoading(true);
        fetch(url).then((response)=>{
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data)=>{
            setData(data);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        });
    },[url]);
    return {data,loading,error};
}
export default useCustomHook2;