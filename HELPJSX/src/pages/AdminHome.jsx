import React, { useEffect, useState } from 'react'
import '../stylesheets/Component.css';
import { Link } from "react-router-dom";
import EMS from '../assets/images/cardEms.svg';
import Security from '../assets/images/cardSec.svg';
import Fire from '../assets/images/cardFire.svg';
import HistoryRed from '../assets/images/historyRed.svg';
import HistoryWhite from '../assets/images/historyWhite.svg';
import axiosClient from '../contexts/axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function AdminHome() {

  const [reportCount, setReportCount] = useState({});
  const {loading, setLoading} = useStateContext();

  useEffect( () =>{
    getReports();
    const interval = setInterval(() => {
      axiosClient.get('/admin_home')
      .then( ({data}) => {
        setReportCount(data);
      })
      .catch( () =>{
      })
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  const getReports = () => {
    setLoading(true);
      axiosClient.get('/admin_home')
          .then( ({data}) => {
            setReportCount(data);
            setLoading(false);
          })
          .catch( () =>{
            setLoading(false);
          })
  }

  return (
    <div className='homeFrame'>
      {loading &&
        <div>
          <section className="dataText">
            <p className="titleText">00</p>
            <p className="detailsText">Lasallians are in need of HELP!</p>
          </section>
    
          <section className="counterIncidents">
            <div>
              <img className="incidentsLogo" src={EMS} alt="ems" />
              <p className= "text">00</p>
            </div>
            <div>
              <img className="incidentsLogo" src={Security} alt="security" />
              <p className= "text">00</p>
            </div>
            <div>
              <img className="incidentsLogo" src={Fire} alt="fire" />
              <p className= "text">00</p>
            </div>
          </section>
        </div>
      }
      {!loading &&
        <div>
          <section className="dataText">
            <p className="titleText">{reportCount.count}</p>
            <p className="detailsText">Lasallians are in need of HELP!</p>
          </section>
    
          <section className="counterIncidents">
            <div>
              <img className="incidentsLogo" src={EMS} alt="ems" />
              <p className= "text">{reportCount.ems_count}</p>
            </div>
            <div>
              <img className="incidentsLogo" src={Security} alt="security" />
              <p className= "text">{reportCount.security_count}</p>
            </div>
            <div>
              <img className="incidentsLogo" src={Fire} alt="fire" />
              <p className= "text">{reportCount.fire_count}</p>
            </div>
          </section>
        </div>
      }
        <Link className= "homeBtns"  to="/Admin/ViewHistory">
          <button className="btn">
          {/* <img className="img1" src="imgs/documents.svg" alt="img" /> */}
          
            <section className="imgSctn">
            <img className="img1" src={HistoryRed} alt="img" />
              <img className="img2" src={HistoryWhite} alt="" />
            </section>
            
            View History
          </button>
        </Link>

        {/* <div className="sample">
        <img className="img" src="imgs/documentRed.png" alt="" id="#imgs1"/>
          <img className="img2" src="imgs/emsHstry.png" alt="" id="#imgs2"/> 
        </div> */}

    </div>
  )
}
