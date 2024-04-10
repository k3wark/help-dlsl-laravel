import React, { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from "react-router-dom";
import BackBtn from '../assets/images/backBtn.svg';
import BackBtnWhite from '../assets/images/backBtnWhite.svg';
import TypeEMS from '../assets/images/cardEms.svg';
import TypeSecurity from '../assets/images/cardSec.svg';
import TypeFire from '../assets/images/cardFire.svg';
import ProfAvatar from '../assets/images/userAvatarBlack.svg';
import Phone from '../assets/images/phoneIcon.svg';
import ID from '../assets/images/idIcon.svg';
import HomeIcon from '../assets/images/homeIcon.svg';
import Contact from '../assets/images/contactIcon.svg';
import Pin from '../assets/images/helpLogoPinIcon.svg';
import '../stylesheets/Component.css'
import axiosClient from '../contexts/axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function MoreDetails(){

  const { id } = useParams();
  const {loading, setLoading} = useStateContext();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({});
  const [report_type, setReport_Type] = useState("");
  const [report_status, setReport_Status] = useState("");
  const [information, setInformation] = useState({});

  useEffect( () => {
    getDetails();
  }, [])

  const getDetails = () => {
    setLoading(true);
    axiosClient.get(`admin_history/${id}`)
    .then( ({data}) => {
      setUser(data.User);
      setReport_Type(data.Type);
      setReport_Status(data.Status);
      setLocation(data.Location);
      setInformation(data.Information);
      setLoading(false);
    })
    .catch( (error) => {
      setError(error);
      setLoading(false);
    })
  }

  if (error){
    return <Navigate to="Not_Found" />
  }

  const Update = (ev) => {
    ev.preventDefault();
    axiosClient.put(`admin_history/${id}`, {id: id, Status: report_status})
      .then( ({data}) => {
        setReport_Status(data.Status)
      })
      .catch( () => {

      })
  }

  return (
    <div className="moreDetailsFrame">
       <Link to="/Admin/ViewHistory">
          <button className="btn">
            <section className="backButtonSctn">
                <img className= "img1" src={BackBtn} alt="backArr" />
                <img className="img2" src={BackBtnWhite} alt="backArr" />
              </section>
          </button>
        </Link>
        
        {loading &&
        <div className='loadingInformationSctn'>Loading...</div>

        }

        {!loading && 
        <div className='detailsContainer'>

        {
          report_type == 'EMS' && 
            <img className='emerType' src={TypeEMS} />
          ||
          report_type == 'Security' &&
            <img className='emerType' src={TypeSecurity} />
          ||
          report_type == 'Fire' &&
            <img className='emerType' src={TypeFire} />
        }

      <section className="informationSctn">
        { 
          report_type == 'EMS' && 
          <div className='informationTop'>
              <div>
                <p className="titleText" >Patient Condition</p>
                <button className="btnLarge"> <p className="btnTxt">{information.Patient_Condition}</p></button>
              </div>
              <div>
                <p className="titleText" >Concern</p>
                <button className="btnLarge"><p className="btnTxt">{information.Concern}</p></button>
              </div>
          </div>
          ||
          report_type == 'Security' &&
          <div className='informationTop'>
              <div>
                <p className="titleText" >Concern</p>
                <button className="btnLarge"><p className="btnTxt">{information.Concern}</p></button>
              </div>
          </div>
        }
          
          <section className="mainTextSctn">
            <p className="titleText">Specify other information</p>
            <p className="bodyText">{information.Other_Information}</p>

          </section>

          <div className='informationBot'>
            <div className='infoLocation'>
              <p className="titleText">Location</p>
              <section className="locBtn">
                <button className="btnSmall"> <p className="btnTxt">{location.Building}</p></button>
                <button className="btnSmall"><p className="btnTxt">{location.Room}</p></button>
              </section>
            </div>
            <div>
              <p className="titleText">Floor Number</p>
              <button className="btnSmall"><p className="btnTxt">{location.Floor}</p></button>
            </div>
          </div>
          <div className='areaDiv'>
            <p className="titleText">Area</p>
            <button className="btnSmall"><p className="btnTxt">{location.Area}</p></button>
          </div>
      </section>
      </div>
    }

    {loading &&
      <section className="idSosCol">
        <div className='detailsUserCard'>
            <div className='detailsUserLevel'></div>
            <div className='detailsPin'><img src={Pin}></img></div>
        </div>
      </section>
    }
    {!loading &&
      <section className="idSosCol">
        <div className='detailsUserCard'>
            <div className='detailsUserCardTop'>
                <div className='detailsAvatar'><img src={ProfAvatar}/></div>
                <div className='detailsUserGrade'>{user.Grade}</div>
            </div>
            <div className='detailsUserLevel'><p>{user.Level}</p></div>
            <div className='detailsUserFirst'>{user.First_Name}</div>
            <div className='detailsUserLast'>{user.Last_Name}</div>
            <div className='detailsUserDetails'><img src={Phone}/>{user.Phone_Number}</div>
            <div className='detailsUserDetails'><img src={ID}/>{user.id}</div>
            <div className='detailsUserDetails'><img src={HomeIcon}/>{user.House_Number} | {user.Barangay} | {user.City} | {user.Province}</div>
            <div className='detailsUserDetails'><img src={Contact}/>{user.Emergency_Name} | {user.Emergency_Number}</div>
            <div className='detailsPin'><img src={Pin}></img></div>
        </div>
        <div className='statusBtns'>

          <p className="statusText"> S.0.S Status</p>
          <label onClick={Update}><input type='checkbox'/><span className={report_status == 'Ongoing' ? 'statusOption' : 'statusOptionClicked'}>{report_status}</span></label>
        </div>
      </section>
    }
  </div>
   
  )
}