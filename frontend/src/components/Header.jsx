import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const profile=(e)=>{
    e.preventDefault()
    navigate('/profile')
    }
    const dashboard=(e)=>{
      e.preventDefault()
      navigate('/')
      }
    
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter App</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <div className='header-buttons'>
            {currentPath === '/' && (
        <button className="btn-1" onClick={profile}>Profile</button>
      )}
      {currentPath === '/profile' && (
        <button className="btn-1" onClick={dashboard}>Dashboard</button>
      )}
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
              
            </div>
          
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header