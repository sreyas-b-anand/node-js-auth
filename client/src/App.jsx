import {BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/signup'} element={<Signup/>}/>
      <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
      <Route path={'/reset-password/:token'} element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
