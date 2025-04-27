import React from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {
  return (
    <div>
      <nav>
        <p className="logins">
           <Link to='/login' className="login">
             Login Here!
           </Link>
         </p> 
         <p className="signup">
           <Link to='/signup' className="signup">
             Signup Here!
           </Link>
         </p> 
      </nav>
    </div>
  )  
}

export default LoginHeader
