import '../stylesheets/SOS.css';
import EMS from '../assets/images/cardEms.svg';
import Security from '../assets/images/cardSec.svg';
import Fire from '../assets/images/cardFire.svg';
import { Link } from 'react-router-dom';

export default function SOS(){
    return(
        <div className='sosMainDiv'>
            <h1>CALL FOR S.O.S</h1>

            <div className='sosTypeSelection'>
                <Link to='/SOS/EMS'>
                    <div className='typeCard'>
                        <img src={EMS}/>
                        <h1>EMS</h1>
                        <h2>DISTRESS</h2>
                    </div>
                </Link>
                <Link to='/SOS/Security'>
                    <div className='typeCard'>
                        <img src={Security}/>
                        <h1>SECURITY</h1>
                        <h2>DISTRESS</h2>
                    </div>
                </Link>
                <Link to='/SOS/Fire'>
                    <div className='typeCard'>
                        <img src={Fire}/>
                        <h1>FIRE</h1>
                        <h2>DISTRESS</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}