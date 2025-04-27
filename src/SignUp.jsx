import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom'
import LoginHeader from './LoginHeader';
import './signup.css'
import { BASE_URL } from '../lib/api';  // Adjust the path as needed
function SigningUp() {
    const [first_name, setFirst_Name] = useState("")
    const [surname, setSurname] = useState("")
    const [ email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [account_type, setAccount_Type] = useState("")
    const [username, setUserName] = useState("")
    const [message, setMessage] = useState("")
  const navigate = useNavigate();

   function handleSigningUp (e){
    e.preventDefault()
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return}
     axios.post(`${BASE_URL}/api/collections/users/records`, {
  first_name,
  surname,
  email,
  password,
  account_type,
  passwordConfirm,
  username
     
}).then(()=>{
 setMessage("Signup successful!");
//  alert("Signup successful!");
 navigate('/Notes');
}).catch(() =>{
  setMessage('error signing up!');
  setTimeout(() => {
    setMessage('')
   }, 2000);
})

   }
  return (
    <div className="overlay">
  <div className='signup-container'>
        <div className="inner-con">

         <div>
        {message}
        </div> 


        <div>
            <h1>Signup Page!</h1>
        </div>

        
        <div >
            <div className="first-con">
            <input
        className="input"  
       type="text"
       placeholder='Firstname?'
       value={first_name}
       onChange={(e)=> setFirst_Name(e.target.value)}
       />


         <input
         className="input"  
       type="text"
       placeholder='Surname?'
       value={surname}
       onChange={(e)=> setSurname(e.target.value)}
       />
            </div>
        
<div className="first-con">
<input
         className="input"  
       type="email"
       placeholder='Email?'
       value={email}
       onChange={(e)=> setEmail(e.target.value)}
       />

       
<input
         className="input"  
       type="password"
       placeholder='Password?'
       value={password}
       onChange={(e)=> setPassword(e.target.value)}
       />
</div>

<div className="first-con">
    

<input
         className="input"  
       type="text"
       placeholder='Confirm Password'
       value={passwordConfirm}
       onChange={(e)=> setPasswordConfirm(e.target.value)}
       /> 

      <select 
         className="input"  

        name="account_type" 
        id="account_type"
        onChange={(e) =>setAccount_Type(e.target.value)} 
      >
        <option value="">Select an Option</option>
        <option value="Teacher">Teacher</option>
        <option value="Student">Student</option>
        <option value="Guardian">Guardian</option>
        <option value="Alumni">Alumni</option>
      </select>

</div>
<div className='username'>
<input
         className="inputs" 
         placeholder='Enter Username' 
value={username}
onChange={(e)=>setUserName(e.target.value)}
 type="text"
 />
</div>

        </div>


<div>
  <button type='submit'className="btn-72" onClick={handleSigningUp}>Signup</button>

</div>
<div>
    
<p className="signup-prompt">
    Have an account?{" "}
    <Link to="/Login" className="signup-link">
      Login
    </Link>
  </p>
</div>
        </div>
      
    </div>
    </div>
  
      
  )
}

export default SigningUp

{/* <div className='signup-container'> */}




//         <div className="inner-container">

//         <form  className='signup-form' >
//           


       


       




//         </form>
//         </div>

      
//     </div>