import '../stylesheets/Home.css';
import { Link } from 'react-router-dom';
import FB from '../assets/images/socialFB.svg';
import Insta from '../assets/images/socialIG.svg';
import TwitX from '../assets/images/socialX.svg';
import CardAvatar from '../assets/images/historyCardAvatar.svg';
import CardTime from '../assets/images/historyCardClock.svg';
import CardReport from '../assets/images/historyCardReport.svg';
import TypeEMS from '../assets/images/cardEms.svg';
import TypeSecurity from '../assets/images/cardSec.svg';
import TypeFire from '../assets/images/cardFire.svg';
import NextBtn from '../assets/images/nextBtn.svg';
import ProfAvatar from '../assets/images/userAvatarBlack.svg';
import Phone from '../assets/images/phoneIcon.svg';
import ID from '../assets/images/idIcon.svg';
import HomeIcon from '../assets/images/homeIcon.svg';
import Contact from '../assets/images/contactIcon.svg';
import Pin from '../assets/images/helpLogoPinIcon.svg';
import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../contexts/axios';

export default function Home(){

    const {currentUser, loading, setLoading} = useStateContext();
    const [reports, setReports]= useState([{}]);
    const [openedReport, setOpenedReport] = useState([{}]);
    const [currentReportNum, setCurrentReportNum] = useState(0);
    
    useEffect( () => {
        setLoading(true);
        axiosClient.get('/user_reports')
            .then( ({data}) => {
                setReports(data.data);
                setLoading(false);
            })
            .catch( () =>{
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        setOpenedReport(reports[currentReportNum]);
    }, [currentReportNum, reports]);

    const handleReportNext = () => {
        if(currentReportNum + 1 < reports.length){
            setCurrentReportNum(currentReportNum + 1);
        }
    }

    const handleReportPrev = () => {
        if(currentReportNum > 0){
            setCurrentReportNum(currentReportNum - 1);
        }
    }

    return(
        
        <div className='homeMainDiv'>
            
            <div className='socialsDiv'>
                <Link><img src={FB}/></Link>
                <Link><img src={Insta}/></Link>
                <Link><img src={TwitX}/></Link>
            </div>

            {loading &&
            <div className='historyDiv'>
                <h1 className='homeHistoryTitle'>History</h1>
                <div className='historyCard'></div>
                <div className='historyBtns'>
                    <div className='historyNavBtns'>
                        <img className='historyPrev' src={NextBtn} onClick={handleReportPrev} />
                        <p>{currentReportNum + 1}</p>
                        <img className='historyNext' src={NextBtn} onClick={handleReportNext} />
                    </div>
                    <Link to='/SOS'><button className='sosBtn'>Call S.O.S</button></Link>
                </div>
            </div>
            }

            {(!loading && !openedReport) &&
            <div className='historyDiv'>
                <h1 className='homeHistoryTitle'>History</h1>
                <div className='historyCard noHistoryCard'>
                    <h1 className='cardType'>You have not yet made any reports. Stay Safe!</h1>
                </div>
                <div className='historyBtns'>
                    <div className='historyNavBtns'>
                        <img className='historyPrev' src={NextBtn} onClick={handleReportPrev} />
                        <p>{currentReportNum + 1}</p>
                        <img className='historyNext' src={NextBtn} onClick={handleReportNext} />
                    </div>
                    <Link to='/SOS'><button className='sosBtn'>Call S.O.S</button></Link>
                </div>
            </div>
            }
            
            { (!loading && openedReport) &&
            <div className='historyDiv'>
                <h1 className='homeHistoryTitle'>History</h1>
                    <div className='historyCard' key={openedReport.id}>
                        {
                        openedReport.Type == 'EMS' && 
                            <img className='cardBg' src={TypeEMS} />
                            ||
                        openedReport.Type == 'Security' &&
                            <img className='cardBg' src={TypeSecurity} />
                            ||
                        openedReport.Type == 'Fire' &&
                            <img className='cardBg' src={TypeFire} />
                        }
                        <h1 className='cardType'>{openedReport.Type}</h1>
                        <div className='cardContent'>
                            <div className='cardDetails'>
                                <div className='historyDetails'>
                                    <img src={CardAvatar}/>
                                    <div className='historyDetailsRight'>
                                        <h1>{currentUser.First_Name} {currentUser.Last_Name}</h1>
                                        <h2>Request #{openedReport.id}</h2>
                                    </div>
                                </div>
                                <div className='historyDetails'>
                                    <img src={CardTime}/>
                                    <div className='historyDetailsRight'>
                                        <h1>{openedReport.Time}</h1>
                                        <h2>{openedReport.Date}</h2>
                                    </div>
                                </div>
                                <div className='historyDetails'>
                                    <img id='reportImg' src={CardReport}/>
                                    <div className='historyDetailsRight'>
                                        <h1>
                                        {
                                            openedReport.Type == 'EMS' && openedReport.e_m_s.Concern
                                            || 
                                            openedReport.Type == 'Security' && openedReport.security.Concern
                                            ||
                                            openedReport.Type == 'Fire' && openedReport.Type
                                        }
                                        </h1>
                                        <h2>Report</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='cardReport'>
                                <h1>Incident Report</h1>
                                <p>
                                    {
                                        openedReport.Type == 'EMS' && openedReport.e_m_s.Other_Information
                                        || 
                                        openedReport.Type == 'Security' && openedReport.security.Other_Information
                                        ||
                                        openedReport.Type == 'Fire' && openedReport.fire.Other_Information
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                <div className='historyBtns'>
                    <div className='historyNavBtns'>
                        <img className='historyPrev' src={NextBtn} onClick={handleReportPrev} />
                        <p>{currentReportNum + 1}</p>
                        <img className='historyNext' src={NextBtn} onClick={handleReportNext} />
                    </div>
                    <Link to='/SOS'><button className='sosBtn'>Call S.O.S</button></Link>
                </div>
            </div>
            }

            {loading &&
            <div className='userCard'>
                <div className='userLevel'><p>{currentUser.Level}</p></div>
                <div className='pin'><img src={Pin}></img></div>
            </div>
            }
            
            {!loading &&
            <div className='userCard'>
                <div className='userCardTop'>
                    <div className='avatar'><img src={ProfAvatar}/></div>
                    <div className='userGrade'>{currentUser.Grade}</div>
                </div>
                <div className='userLevel'><p>{currentUser.Level}</p></div>
                <div className='userFirst'>{currentUser.First_Name}</div>
                <div className='userLast'>{currentUser.Last_Name}</div>
                <div className='userDetails'><img src={Phone}/>{currentUser.Phone_Number}</div>
                <div className='userDetails'><img src={ID}/>{currentUser.id}</div>
                <div className='userDetails'><img src={HomeIcon}/>{currentUser.House_Number} | {currentUser.Barangay} | {currentUser.City} | {currentUser.Province}</div>
                <div className='userDetails'><img src={Contact}/>{currentUser.Emergency_Name} | {currentUser.Emergency_Number}</div>
                <div className='pin'><img src={Pin}></img></div>
            </div>
            }
        </div>
    )
}