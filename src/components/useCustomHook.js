import react,{ useState,useEffect } from "react";
const useCustomHook = (key,initialValue) => {
    const [name,setvalue] = useState(()=>{
        try{
            const storedValue = localStorage.getItem(key);
            return JSON.parse(storedValue) || '';
        }catch(error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });
    useEffect(()=>{
        try {
            localStorage.setItem(key, JSON.stringify(name));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [key, name])
    return [name,setvalue]
} 

export default useCustomHook