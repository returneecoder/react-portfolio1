import './profile.scss'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Profile() {
  const {currentUser} = useAuthValue()

  return (
      <div className='center'>
        <div className='profile'>
          <h1>Profile</h1>
          <p><strong>Email: </strong>{currentUser?.email}</p>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          <Link to ='/dashboard' >
          
          <p> go to dashboard   <FontAwesomeIcon icon={faCircleChevronUp} color="#ffd700" /> </p>
            
          </Link>
          <span onClick={() => signOut(auth)}>Sign Out</span>
        </div>
      </div>
  )
}

export default Profile
