import '../stylesheets/User.css';
import { Link } from 'react-router-dom';
import BackButton from '../assets/images/backBtn.svg';
import ProfileIcon from '../assets/images/userAvatar.svg'
import { useStateContext } from '../contexts/ContextProvider';

export default function Profile(){

    const { currentUser, loading } = useStateContext();
    
    return(
        <div className='userMainDiv'>
            <Link to='/Home'><button className='userBackBtn'><img src={BackButton} /></button></Link>
            {!loading && 
            <div className='userContent'>
                <div className='profileTop'>
                    <h1>My Profile</h1>
                    <img src={ProfileIcon} />
                </div>
                <h2>First Name</h2>
                <input type="text" defaultValue={currentUser.First_Name} readOnly/>
                <h2>Last Name</h2>
                <input type="text" defaultValue={currentUser.Last_Name} readOnly/>
                <h2>Contact Number</h2>
                <input type="text" defaultValue={currentUser.Phone_Number} readOnly/>
                <h2>Email Address</h2>
                <input type="text" defaultValue={currentUser.email} readOnly/>
                <div className='userPasswordBtn'>
                    <button>Change Password</button>
                </div>
            </div>
            }
        </div>
    )
}