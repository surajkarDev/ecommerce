import React,{ useEffect, useState,useCallback,useMemo,memo,createContext,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Blog from '../components/Blog'
import axios from "axios";
// import { counterContext } from "../context/context";
import Blogie from "../components/Blogie";
import PageHeader from "../components/pageHeader";
import useCustomHook from "../components/useCustomHook";
export const counterContext = createContext(0);
const Blogs = () => {
  const navigate = useNavigate();
  const [count,setCount] = useState(0)
  const [countContent,setCountContent] = useState('Initial Data')
  const ref = useRef();
  const [name ,setValue] = useCustomHook("username","")
  const [password ,setPassword] = useCustomHook("password","")
  // const newArray = new Array(30000000).fill(0).map((_,i) => {
  //   return {
  //     index:i,
  //     isMagical:i===29000000,
  //   }
  // })

  // const [numbers,setNumber] = useState(newArray);
  // const magical = useMemo(()=> numbers.find(item => item.isMagical),[])
   
  const blogUseCallback = useCallback(() => {
    setCountContent('Use Call Back Returned'+count)
  },[count])
  
  //call api using fetch start
  const fetchData = async () => {
    try{
      let response = await fetch("http://localhost:3000/users")
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json();
      console.log("API Response fetch API", data);
    }catch(error){
      console.error("Error: Something Went Wrong fetch API", error);
    }
  }
  //call api using fetch end

  //call api using axios start
  const blogApi = async () => {
    try{
      const response = await axios.get("http://localhost:3000/restaurant");
      console.log("API Response",response)
    }catch {
      console.log("Error: Something Went Wrong");
    }
  }
  //call api using axios end

  // call api with token and request start
  
  // const blogApi = async () => {
  //   try {
  //     // Define the token and request payload
  //     const token = "your-token-here"; // Replace with your actual token
  //     const requestData = {
  //       key1: "value1",
  //       key2: "value2",
  //     };
  
  //     // Send the request
  //     const response = await fetch("http://localhost:3000/restaurant", {
  //       method: "POST", // Use "GET" for a GET request or "POST" for sending data
  //       headers: {
  //         "Content-Type": "application/json", // Specifies the format of the request body
  //         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //       },
  //       body: JSON.stringify(requestData), // Convert the request data to JSON (omit for GET requests)
  //     });
  
  //     // Check if the response status is OK
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     // Parse the response data as JSON
  //     const data = await response.json();
  //     console.log("API Response", data);
  //   } catch (error) {
  //     console.error("Error: Something Went Wrong", error);
  //   }
  // };
  
  // call api with token and request end


  // delete data from database start

//   const deleteData = async () => {
//     try {
//         const response = await fetch("http://localhost:3000/users/1", {
//             method: "DELETE", // Use the DELETE method
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         console.log("Resource deleted successfully");
//     } catch (error) {
//         console.error("Error: Unable to delete the resource", error);
//     }
// };

  // delete data from database end

  // update whole resourse using PUT start

//   const updateUser = async () => {
//     await fetch("http://localhost:3000/users/1", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             name: "John Doe",
//             email: "johndoe@example.com",
//             age: 30,
//         }),
//     });
// };


  // update whole resourse using PUT end

  // update a specific value in database using PATCH start

//   const updateEmail = async () => {
//     await fetch("http://localhost:3000/users/1", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: "newemail@example.com" }),
//     });
// };


  // update a specific value in database using PATCH end
  const handelChange = (e) => {
    let value = e.target.value
    if(e.target.name === 'name'){
      setValue(value)
    }
    if(e.target.name === 'password'){
      setPassword(value)
    }
  }
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login')) || false
    if(!login){
      navigate('/');
    }
    blogApi();
    fetchData();
  },[]);
    return <>
    {/* Magical number is {magical?.index} */}
    <section className="shoopingCartSectionHeader">
        <PageHeader heading="Blogs" linkName="Blogs" link="/blogs" />
    </section>
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <counterContext.Provider value={count}>
              <h1>Blog Articles</h1>
              <Blog></Blog>
              <Blogie countContent={countContent} blogUseCallback={blogUseCallback} ref={ref}></Blogie>
              {count}
              <button onClick={()=>setCount(count+1)}>Counter ++</button>
              <button onClick={()=>blogUseCallback()}>Click Me</button>

              <button onClick={()=>ref.current.sayHi()}>parent to child</button>
              </counterContext.Provider>
              <br/> <br/>
              <label>Custom Hook</label><br/>
              <input type="text" name="name" value={name} onChange={handelChange}/>
              <input type="password" name="password" value={password} onChange={handelChange}/>
            </div>
          </div>
        </div>
    </section>
    </>;
  };
  
  export default memo(Blogs);

  