import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-screen h-16 p-3 px-7 bg-slate-600 flex items-center justify-end gap-4 text-white ">
      <Link to={'/login'} >Login</Link>
      <Link to={'/signup'} >Sign up</Link>
    </div>
  )
}

export default Navbar
