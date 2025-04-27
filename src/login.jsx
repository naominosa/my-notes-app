import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GeneralInput from './generalinput';
import './login.css';
import LoginHeader from './LoginHeader';
import EyeOpen from './assets/output-onlinegiftools.gif';
import EyeClosed from './assets/eyebrow.png';
import Log from './assets/mountain.jpg';
import { BASE_URL } from '../lib/api';  // Adjust the path as needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [terms , setTerms] = useState('')
  const navigate = useNavigate();


  
  function handleLogin(event) {
   
    event.preventDefault();
    if(!terms.trim()){
      return  alert('Agree to terms and conditions')
     }
     axios.post(`${BASE_URL}/api/collections/users/auth-with-password`, {
      identity: email,
      password: password
    })
    .then((response) => {
      setMessage('LOgin Sucess!');
      console.log(message);
      navigate('/Notes');
      console.log('Full login response:', response.data);
      console.log(response.data)
      
    })
    
      .catch((err) => {
        setMessage('Please sign up')

        setTimeout(() => {
         setMessage('')
        }, 2000);
        console.log('Error Message', err.response.data.message);
        
      });
  }

  function togglePasswordVisibility() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else {
      setIsPasswordVisible(true);
    }
  }
  

  return (
    <div className="overlay">
 <div className='container' >
      <div className="container-two">
        <div className='form'>
        {message && (
            <div
              style={{
                backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
                color: message.includes("success") ? "#155724" : "#721c24",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                border: "1px solid",
                width: "20em",
                borderColor: message.includes("success") ? "#c3e6cb" : "#f5c6cb",
              }}
            >
              {message}
            </div>
          )}
          <div>
            <LoginHeader />
          </div>

          <div>
            <h1>Login Page!</h1>
            <p>Welcome To Naomi's Note App🤗</p>
          </div>
  


          <form className='inner-form' onSubmit={handleLogin}>
            <GeneralInput
              placeholder='Email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <div className="input-container">
              <GeneralInput
                placeholder='Password '
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility}>
                <img
                  src={isPasswordVisible ? EyeOpen : EyeClosed}
                  alt="Toggle Password Visibility"
                  style={{ width: "25px", height: "20px" }}
                />
              </span>
            </div>

            <div className="forms-checkbox">
              <input 
                onChange={(e) => setTerms(e.target.value)}
               type="checkbox"
                id="terms" />
              <label htmlFor="terms">
                I agree to the <Link className='termsAndCondition' to="/TermsAndCondition">Terms & Conditions</Link>
              </label>
            </div>

            <button onClick={handleLogin} className="btn-72">Login</button>
          </form>

          <div>
            <p className="signup-prompt">
              Don’t have an account?{" "}
              <Link to="/signup" className="signup-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 
                  16 .513 16 1.146v13.708c0 .633-.526 
                  1.146-1.175 1.146H1.175C.526 16 0 
                  15.487 0 14.854zm4.943 
                  12.248V6.169H2.542v7.225zm-1.2-8.212c.837 
                  0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 
                  3.226 2.4 3.934c0 .694.521 1.248 
                  1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 
                  1.232-.878.869 0 1.216.662 1.216 
                  1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 
                  0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 
                  0 7.225 0 7.225z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 
                  .139 1.626c0 2.434-.87 4.492-2.384 
                  5.885h.002C11.978 15.292 10.158 16 
                  8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 
                  5.352 2.082l-2.284 2.284A4.35 4.35 
                  0 0 0 8 3.166c-2.087 0-3.86 
                  1.408-4.492 3.304a4.8 4.8 0 0 0 0 
                  3.063h.003c.635 1.893 2.405 3.301 
                  4.492 3.301 1.078 0 2.004-.276 
                  2.722-.764h-.003a3.7 3.7 0 0 0 
                  1.599-2.431H8v-3.08z" />
                </svg>
              </Link>
            </p>
          </div>
        </div>

        <div className='login-picture'>
          <img className='Log' src={Log} alt="" />
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default Login;