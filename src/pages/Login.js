import '../css/custom.css'
import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Button,Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';

  function Login() {
      const navigate = useNavigate();
      const [userInfo,setUserInfo] = useState([]);
      const [ErrorMessage,setErrorMessage] = useState('');
      const [firstNameMessage,setfirstNameMessage] = useState('');
      const [lastNameMessage,setlastNameMessage] = useState('');
      const [emailMessage,setEmailMessage] = useState('');
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword:''
      });
      const [passwordShow,setPasswordShow] = useState(false);
      const [signupPasswordShow,setSignupPasswordShow] = useState(false);
      const [confirmSignupPasswordShow,setConfirmSignupPasswordShow] = useState(false);
      const [errors, setErrors] = useState({});
      const [signupErrors, setSignupErrors] = useState({});
      const [loginData, setLogin] = useState({
        email:'',
        password:''
      })
      const [formDataEdit, setFormDataEdit] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword:''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Inline validation
        const error = validateField(name, value);
        setSignupErrors({ ...signupErrors, [name]: error });
      };
      const handleChangeEdit = (e) => {
        setFormDataEdit({
          ...formDataEdit,
          [e.target.name]: e.target.value
        })
      }

      const validateField = (name, value) => {
        let error = "";
    
        switch (name) {
          case "firstName":
            if (!value.trim()) error = "First name is required.";
            break;
          case "lastName":
            if (!value.trim()) error = "Last name is required.";
            break;
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) error = "Email is required.";
            else if (!emailRegex.test(value)) error = "Invalid email address.";
            break;
          case "password":
            if (!value.trim()) error = "Password is required.";
            else if (value.length < 6) error = "Password must be at least 6 characters.";
            break;
          case "confirmPassword":
            if (value !== formData.password) error = "Passwords do not match.";
            break;
          default:
            break;
        }
        return error;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const errors = {};
        Object.keys(formData).forEach((key) => {
          const error = validateField(key, formData[key]);
          if (error) errors[key] = error;
        });
    
        if (Object.keys(errors).length === 0) {
          // No errors, submit form
          // console.log("Form submitted successfully:", formData);
          let checkData = false
          let checkfirstname = false
          let checklastName = false
          let checkEmail = false
          
          if(userInfo.length > 0){
            userInfo.forEach(x => {
              if(x.firstName === formData.firstName){
                checkfirstname = true
                checkData = true
              }
              if(x.lastName === formData.lastName){
                checklastName = true
                checkData = true
              }
              if(x.email === formData.email){
                checkEmail = true
                checkData = true
              }
            })
            if(checkfirstname){
              setfirstNameMessage('Name is already exist')
              setErrorMessage('')
            }else{
              setfirstNameMessage('')
            }
            if(checklastName){
              setlastNameMessage('Last Name is already exist')
              setErrorMessage('')
            }else{
              setlastNameMessage('')
            }
            if(checkEmail){
              setEmailMessage('Email is already exist')
              setErrorMessage('')
            }else{
              setEmailMessage('')
            }
          }
          if(!checkData){
            const newUserInfo = [...userInfo, formData];
            setUserInfo(newUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
            setFormData({firstName: '',lastName: '',email: '',});
            setErrorMessage('')
            setfirstNameMessage('')
            setlastNameMessage('')
            setEmailMessage('')
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              password:'',
              confirmPassword:''
            })
          }
        } else {
          setSignupErrors(errors);
        }
      };
      // const handleSubmit = (e) => {
      //   e.preventDefault();
      //   if(formData.firstName !== '' && formData.lastName !== '' && formData.email !== ''){
      //     if(formData.password === formData.confirmPassword){
      //     let checkData = false
      //     let checkfirstname = false
      //     let checklastName = false
      //     let checkEmail = false
          
      //     if(userInfo.length > 0){
      //       userInfo.forEach(x => {
      //         if(x.firstName === formData.firstName){
      //           checkfirstname = true
      //           checkData = true
      //         }
      //         if(x.lastName === formData.lastName){
      //           checklastName = true
      //           checkData = true
      //         }
      //         if(x.email === formData.email){
      //           checkEmail = true
      //           checkData = true
      //         }
      //       })
      //       if(checkfirstname){
      //         setfirstNameMessage('Name is already exist')
      //         setErrorMessage('')
      //       }else{
      //         setfirstNameMessage('')
      //       }
      //       if(checklastName){
      //         setlastNameMessage('Last Name is already exist')
      //         setErrorMessage('')
      //       }else{
      //         setlastNameMessage('')
      //       }
      //       if(checkEmail){
      //         setEmailMessage('Email is already exist')
      //         setErrorMessage('')
      //       }else{
      //         setEmailMessage('')
      //       }
      //     }
      //     if(!checkData){
      //       const newUserInfo = [...userInfo, formData];
      //       setUserInfo(newUserInfo);
      //       localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      //       setFormData({firstName: '',lastName: '',email: '',});
      //       setErrorMessage('')
      //       setfirstNameMessage('')
      //       setlastNameMessage('')
      //       setEmailMessage('')
      //     }
      //     }else{
      //       setErrorMessage('Please check Password and Confirm Password is not same')
      //     }
      //   }else{
      //     setErrorMessage('Please fill mandatory fields')
      //   }
      //   if(formData.firstName === ''){
      //     setfirstNameMessage('')
      //   }
      //   if(formData.lastName === ''){
      //     setlastNameMessage('')
      //   }
      //   if(formData.email === ''){
      //     setEmailMessage('')
      //   }
      // };
     
      const handelSubmitEdit = (index) => {
        console.log("formDataEdit",formDataEdit)
        console.log("userInfo",userInfo)
       

        let checkData = false
        let checkfirstname = false
        let checklastName = false
        let checkEmail = false
          
          // if(userInfo.length > 0){
            userInfo.forEach((x,index1) => {
              if(x.firstName === formDataEdit.firstName && index1 !== index){
                console.log("x.firstName",x.firstName);
                console.log("currentData[index].firstName",formDataEdit.firstName)
                checkfirstname = true
                checkData = true
              }
              if(x.lastName === formDataEdit.lastName && index1 !== index){
                checklastName = true
                checkData = true
              }
              if(x.email === formDataEdit.email && index1 !== index){
                checkEmail = true
                checkData = true
              }
            })
            if(checkfirstname){
              setfirstNameMessage('Name is already exist')
              setErrorMessage('')
            }else{
              setfirstNameMessage('')
            }
            if(checklastName){
              setlastNameMessage('Last Name is already exist')
              setErrorMessage('')
            }else{
              setlastNameMessage('')
            }
            if(checkEmail){
              setEmailMessage('Email is already exist')
              setErrorMessage('')
            }else{
              setEmailMessage('')
            }
          // }
          if(!checkData){
            let currentData = [...userInfo]
            currentData[index].firstName = formDataEdit.firstName
            currentData[index].lastName = formDataEdit.lastName
            currentData[index].email = formDataEdit.email
            localStorage.setItem('userInfo', JSON.stringify(currentData));
            handelEditClose(index)
          }
      }
      const handelDelete = (userId) => {
        const updatedUserInfo = userInfo.filter((user, index) => index !== userId);
        setUserInfo(updatedUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        
      }
      const handelEdit = (index) => {
        const newData = [...userInfo];
        newData.forEach(x => {
          x.edit = false
        })
        newData[index].edit = !newData[index].edit;
        setUserInfo(newData)
        setFormDataEdit(newData[index]);
        console.log("userInfo",userInfo)
      }
    const handelEditClose = (index) => {
        const newData = [...userInfo];
        newData[index].edit = !newData[index].edit;
        setUserInfo(newData)
        setFormDataEdit(newData[index]);
        console.log("userInfo",userInfo)
      }

      useEffect(() => {
          let savedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || []
          let allDataCheck = savedUserInfo
          if (savedUserInfo && savedUserInfo.length > 0 && savedUserInfo !== undefined && savedUserInfo !== 'undefined' && savedUserInfo !== null && allDataCheck.length > 0) {
              const updatedData = allDataCheck.map(item => ({
                ...item,
                edit: false
              }));
              setUserInfo(updatedData);
          }
      },[]);
      useEffect(() => {
        let login = JSON.parse(localStorage.getItem('login')) || false
        if(login){
          navigate('/home');
        }
      },[]);
      const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({
          ...loginData,
          [name] : value,
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
        console.log("loginData",loginData)
      }
      const validate = () => {
        const newErrors = {};
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!loginData.email.trim()) {
          newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(loginData.email)) {
          newErrors.email = 'Please enter a valid email address.';
        }
    
        // // Message validation
        if (!loginData.password.trim()) {
          newErrors.password = 'Password is required.';
        } else if (loginData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long.';
        }
        return newErrors;
      };
    
      const handleLoginSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        console.log("loginData",loginData)
        userInfo.forEach(x => {
          if(x.email === loginData.email && x.password === loginData.password){
            localStorage.setItem('login',true);
            navigate('/home');
          }
        })
      }
      
    return (
        <div className="App">
      <main className="App-header">
        <br />
        <br />
        {
        ErrorMessage !== '' ? <p className='errormessage text-center'> {ErrorMessage}</p> :''
      }
        {
        firstNameMessage !== '' ? <p className='mb-1 text-center text-danger'> {firstNameMessage}</p> :''
      }
      {
        lastNameMessage !== '' ? <p className='mb-1 text-center text-danger'> {lastNameMessage}</p> :''
      }
      {
        emailMessage !== '' ? <p className='mb-1 text-center text-danger'> {emailMessage}</p> :''
      }
     <Container>
      <Row>
        <Col lg={12}>
        <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example">
        <Tab eventKey="Login" title="Login" className='border border-top-0 p-5 rounded-3 rounded-top-0'>
          <div className='row justify-content-center'>
            <div className='col-xl-6 col-lg-8'>
            <Form onSubmit={handleLoginSubmit}>
                <div className='userFormAll bg-body-secondary border-secondary-subtle p-5 rounded-4 mx-auto text-start'>
                  <div className='userInputs'>
                    {/* <label className='d-block mb-3 text-start'> Email<span className='errorRequired'>*</span> </label> */}
                    {/* <input type="email" name="email" className='p-2 w-100 rounded-3 border mb-3' value={loginData.email} onChange={handleLoginChange} /> */}
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className='userInputs'>
                    {/* <label className='d-block mb-3 text-start'> Password<span className='errorRequired'>*</span> </label>
                    <input type="password" name="password" className='p-2 w-100 rounded-3 border mb-3' value={loginData.password} onChange={handleLoginChange} /> */}
                    <Form.Group controlId="formPassword" className={errors.password ? "mb-3 position-relative formPasswordError" : "mb-3 position-relative formPassword"}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={!passwordShow? 'password' : 'text'}
                        placeholder="Enter your password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      <span className={errors.password ?'passwordShow shift' : 'passwordShow'} onClick={()=>setPasswordShow(!passwordShow)}> 
                        {!passwordShow ?
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                          </>
                        : 
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                          </svg>
                        </>
                        
                        }
                        
                        
                      </span>
                    </Form.Group>
                  </div>
                  <div className='userFormButton text-center mt-3'>
                    <button type="submit" className='position-relative bg-white px-4 py-2 border border-secondary-subtle overflow-hidden fs-5 rounded-3'>Submit</button>
                  </div>
                </div>
            </Form>
            </div>
          </div>
        </Tab>
        <Tab eventKey="Signup" title="Signup" className='border border-top-0 p-5 rounded-3 rounded-top-0'>
        <div className='row justify-content-center'>
          <div className='col-xl-10 col-lg-10'>
            <Form onSubmit={handleSubmit}>
              <div className='userFormAll bg-body-secondary border-secondary-subtle p-5 rounded-4 mx-auto text-start'>
                <div className='row'>
                    <div className='col-lg-6'>
                      <div className='userInputs'>
                        {/* <label className='d-block mb-3 text-start'> First Name<span className='errorRequired'>*</span> </label>
                        <input type="text" name="firstName" className='p-2 w-100 rounded-3 border  mb-3' value={formData.firstName} onChange={handleChange} /> */}
                        <Form.Group controlId="formFirstName" className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your first Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            isInvalid={!!signupErrors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">{signupErrors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='userInputs'>
                        {/* <label className='d-block mb-3 text-start'> Last Name<span className='errorRequired'>*</span> </label>
                        <input type="text" name="lastName" className='p-2 w-100 rounded-3 border  mb-3' value={formData.lastName} onChange={handleChange} /> */}
                        <Form.Group controlId="formLastName" className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            isInvalid={!!signupErrors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">{signupErrors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div className='col-lg-12'>
                      <div className='userInputs'>
                        {/* <label className='d-block mb-3 text-start'> Email<span className='errorRequired'>*</span> </label>
                        <input type="email" name="email" className='p-2 w-100 rounded-3 border  mb-3' value={formData.email} onChange={handleChange} /> */}
                        <Form.Group controlId="formEmail" className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!signupErrors.email}
                          />
                          <Form.Control.Feedback type="invalid">{signupErrors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='userInputs'>
                        {/* <label className='d-block mb-3 text-start'> Password<span className='errorRequired'>*</span> </label>
                        <input type="password" name="password" className='p-2 w-100 rounded-3 border mb-3' value={formData.password} onChange={handleChange} /> */}
                        <Form.Group controlId="formPassword" className={signupErrors.password ? "mb-3 position-relative formPasswordError" : "mb-3 position-relative formPassword"}>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type={!signupPasswordShow ? "password" :"text"}
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!signupErrors.password}
                          />
                          <Form.Control.Feedback type="invalid">{signupErrors.password}</Form.Control.Feedback>
                          <span className={signupErrors.password ?'passwordShow shift' : 'passwordShow'} onClick={()=>setSignupPasswordShow(!signupPasswordShow)}> 
                            {!signupPasswordShow ?
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                </svg>
                              </>
                            : 
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                              </svg>
                            </>
                            }
                          </span>
                        </Form.Group>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      
                <div className='userInputs'>
                  {/* <label className='d-block mb-3 text-start'> Confirm Password<span className='errorRequired'>*</span> </label>
                  <input type="password" name="confirmPassword" className='p-2 w-100 rounded-3 border mb-3' value={formData.confirmPassword} onChange={handleChange} /> */}
                  <Form.Group controlId="formPassword" className={signupErrors.confirmPassword ? "mb-3 position-relative formPasswordError" : "mb-3 position-relative formPassword"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type={!confirmSignupPasswordShow ? "password" : "text"}
                      placeholder="Enter your confirm password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!signupErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{signupErrors.confirmPassword}</Form.Control.Feedback>
                    <span className={signupErrors.confirmPassword ?'passwordShow shift' : 'passwordShow'} onClick={()=>setConfirmSignupPasswordShow(!confirmSignupPasswordShow)}> 
                      {!confirmSignupPasswordShow ?
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                          </svg>
                        </>
                      : 
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                        </svg>
                      </>
                      }
                    </span>
                  </Form.Group>
                </div>
                    </div>
                </div>
                
                
                
                
                <div className='userFormButton text-center mt-3'>
                  <button type="submit" className='position-relative bg-white px-4 py-2 border border-secondary-subtle overflow-hidden fs-5 rounded-3'>Submit</button>
                </div>
              </div>
            </Form>
            </div>
          </div>
        </Tab>
        </Tabs>
        </Col>
      </Row>
    </Container>
      
     <Table striped bordered hover className='userInformationTable w-75 mx-auto mt-5'>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {userInfo.map((item, index) => (
          <tr key={index}>
            <td>{!item.edit ? item.firstName : <input type="text" name="firstName" className='p-2 w-100 rounded-3 border border-secondary-subtle mb-3' value={formDataEdit.firstName} onChange={handleChangeEdit} />}</td>
            <td>{!item.edit ? item.lastName : <input type="text" name="lastName" className='p-2 w-100 rounded-3 border border-secondary-subtle mb-3' value={formDataEdit.lastName} onChange={handleChangeEdit} />}</td>
            <td>{!item.edit ? item.email : <input type="email" name="email" className='p-2 w-100 rounded-3 border border-secondary-subtle mb-3' value={formDataEdit.email} onChange={handleChangeEdit} />}</td>
            <td>
              {
                !item.edit ? (
                  <>
                    <Button variant="danger" onClick={()=> handelDelete(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </Button>
                    <Button variant="success" className='ms-2' onClick={()=> handelEdit(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>  
                    </Button>
                    </>
                ):(
                  <>
                  <Button variant="success"  className='ms-2' onClick={()=> handelSubmitEdit(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                    <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                  </Button>
                  <Button variant="danger" className='ms-2' onClick={()=> handelEditClose(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </Button>
                </>
              )
              }
            </td>
          </tr>
        ))}
        {
          userInfo.length === 0 ? <tr><td colSpan={4} className='text-center'>No Data Available</td></tr> : ''
        }
      </tbody>
    </Table>
     </main>
    </div>
    );
  };
  
export default Login;