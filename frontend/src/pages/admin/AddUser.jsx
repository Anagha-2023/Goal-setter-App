
import {useState,useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addUser, reset } from '../../features/adminAuth/adminAuthSlice'
import Spinner from '../../components/spinner'


function AddUser() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  })

  const { name, email, phone, password, password2 } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin, isLoading, isError, isSuccess, message ,isUserAdded} = useSelector(
    (state) => state.adminAuth
  )
  useEffect(() => {
 
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isUserAdded ||!admin) {
      navigate('/admin/login')
    }

    dispatch(reset())
  }, [admin, isError,isUserAdded, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()
   

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(addUser(userData))

    }
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
     <div className='adduser-card'>
      <section className='heading'>
        <h1>
          <FaUser /> Add New User
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='tel'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Enter your phone number'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    

      </div>
    </>
  )
}

export default AddUser
