import './App.css'
import Login from './login'
import Signup from './SignUp'
import Notes from './Notes'
import TermsAndConditions from './termsandconditions'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/SignUp' element={<Signup />} />
      <Route path='/Notes' element={<Notes />} />
      <Route path='/TermsAndCondition' element={<TermsAndConditions />} />
    </Routes>
  )
}

export default App


