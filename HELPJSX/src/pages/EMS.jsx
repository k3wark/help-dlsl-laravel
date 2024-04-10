import '../stylesheets/EMS.css';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../assets/images/backBtn.svg';
import { useEffect, useState } from 'react';
import axiosClient from '../contexts/axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function EMS(){
    
    const {currentUser} = useStateContext();
    const navigate = useNavigate();

    const [distress, setDistress] = useState({
        user_id: "",
        Patient_Condition: "",
        Concern: "",
        Other_Information: "",
        Building: "",
        Room: "",
        Area: "",
        Floor: ''
    });

    useEffect( () => {
        setDistress({...distress, user_id: currentUser.id});
    }, [currentUser.id]);
    
    const Submitting = (ev) => {
        ev.preventDefault();

        axiosClient.post(`/ems`, distress)
                .then( ({data}) => {
                    navigate("/SOS");
                })
                .catch( () =>{
                    
                })
    }

    return(
        <div className='emsMainDiv'>
            <Link to='/SOS'><button className='emsBackBtn'><img src={BackButton} /></button></Link>

            
                <h1 className='emsTitle'>EMS DISTRESS</h1>
                <form onSubmit={Submitting}>
                <div className='emsContent'>
                    <div className='emsLeft'>
                        <div className='emsRadio'>
                        
                            <h2>Patient Condition</h2>
                            <div className='emsRadioOptions'>
                                <label><input type='radio' name='conditionSelect' onChange={ ev => setDistress( {...distress, Patient_Condition: ev.target.value} )} value='Conscious'/><span className='conditionOption'>Conscious</span></label>
                                <label><input type='radio' name='conditionSelect' onChange={ ev => setDistress( {...distress, Patient_Condition: ev.target.value} )} value='Unconscious'/><span className='conditionOption'>Unconscious</span></label>
                            </div>
                        </div>
                        <div className='emsRadio'>
                            <h2>Concern</h2>
                            <div className='emsRadioOptions'>
                                <label><input type='radio' name='concernSelect' onChange={ ev => setDistress( {...distress, Concern: ev.target.value} )} value='Medical'/><span className='conditionOption'>Medical</span></label>
                                <label><input type='radio' name='concernSelect' onChange={ ev => setDistress( {...distress, Concern: ev.target.value} )} value='Trauma'/><span className='conditionOption'>Trauma</span></label>
                            </div>
                        </div>
                        <div className='emsOther'>
                            <h2>Specify Other Information</h2>
                            <textarea placeholder='Describe the current condition of the patient' onChange={ ev => setDistress( {...distress, Other_Information: ev.target.value} )}></textarea>
                        </div>
                    </div>
                    <div className='emsRight'>
                        <div className='emsLocation'>
                            <h2>Location</h2>
                            <input type="text" placeholder='Building' onChange={ ev => setDistress( {...distress, Building: ev.target.value} )}/>
                            <input type="text" placeholder='Room No.' onChange={ ev => setDistress( {...distress, Room: ev.target.value} )}/>
                            <input type="text" placeholder='Area' onChange={ ev => setDistress( {...distress, Area: ev.target.value} )}/>
                        </div>
                        <div className='emsFloor'>
                            <h2>Floor Number</h2>
                            <div className='emsFloorOptions'>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "1st Floor"} )} value='1'/><span className='conditionOption'>1</span></label>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "2nd Floor"} )} value='2'/><span className='conditionOption'>2</span></label>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "3rd Floor"} )} value='3'/><span className='conditionOption'>3</span></label>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "4th Floor"} )} value='4'/><span className='conditionOption'>4</span></label>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "5th Floor"} )} value='5'/><span className='conditionOption'>5</span></label>
                                <label><input type='radio' name='floorSelect' onChange={ ev => setDistress( {...distress, Floor: "6th Floor"} )} value='6'/><span className='conditionOption'>6</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sosBtnContainer'>
                    <button className='emsSOSBtn' type="submit">Send S.O.S</button>
                </div>
                        </form>

        </div>
    )
}