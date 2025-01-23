import './App.css';
import React,{useState,useEffect} from 'react';
function App() {
  const [testData,setTestData] = useState(false);
  const [userInfo,setUserInfo] = useState([]);
  const [ErrorMessage,setErrorMessage] = useState('');
  
  const handleClick = () => {
    // setData(!testData)
    // if(testData){
    //   console.log('Button',testData);
    //   setData(false)
    // }else{
    //   console.log('clicked!',testData);
    //   setData(true)
    // }
    setTestData(testData => !testData)
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const handleChange = (e) => {
    // Update the form data state when input values change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('Form submitted:', formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data, e.g., send it to the server

    // setUserInfo(prevUserInfo => [...prevUserInfo, formData]);
    if(formData.firstName !== '' && formData.lastName !== '' && formData.email !== ''){
      const newUserInfo = [...userInfo, formData];
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      setFormData({firstName: '',lastName: '',email: '',});
      setErrorMessage('')
    }else{
      setErrorMessage('Please fill mandatory fields')
    }
  };
  const handelDelete = (userId) => {
    const updatedUserInfo = userInfo.filter((user, index) => index !== userId);
    setUserInfo(updatedUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    
  }
  // const [data, setData1] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    // fetch('http://localhost:8000/posts')
    //   .then((response) => response.json())
    //   .then((data) => setData1(data))
    //   .catch((error) => console.error('Error fetching data:', error));

      let savedUserInfo = localStorage.getItem('userInfo')
      if (savedUserInfo !== undefined && savedUserInfo !== 'undefined') {
        setUserInfo(JSON.parse(savedUserInfo));
      }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click</button>
        {testData && <p>The button was clicked!</p>}
      <br />
      <br />
      {
      ErrorMessage !== '' ? <p className='errormessage'> {ErrorMessage}</p> :''
     }
      <form onSubmit={handleSubmit} className=''>
        <div className='userFormAll'>
          <div className='userInputs'>
            <label> First Name<span className='errorRequired'>*</span> </label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className='userInputs'>
            <label> Last Name<span className='errorRequired'>*</span> </label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className='userInputs'>
            <label> Email<span className='errorRequired'>*</span> </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className='userFormButton'>
            <button type="submit">Submit</button>
          </div>
        </div>
     </form>
     
     <ul className='Api_List'>
        {userInfo.map((item,index) => (
          // <li key={item.id}>
          //   <span> Enable Debug :- {item.enableDebug} </span><br />
          //   <span> DK Number :- {item.dkNumber} </span><br />
          //   <span> Api Key :- {item.apiKey} </span><br />
          //   <span> ID :- {item.id} </span><br /><br /><br />
          // </li>
          <li key={item.id} className='userHolder'>
            <span> Enable Debug :- {item.firstName} </span>
            <span> DK Number :- {item.lastName} </span>
            <span> Api Key :- {item.email} </span>
            <span className='removeUser' onClick={()=> handelDelete(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </span>
          </li>
          
        ))}
      </ul>
     </header>
    </div>
  );
}

export default App;
