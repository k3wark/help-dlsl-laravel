import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import BackBtn from '../assets/images/backBtn.svg';
import BackBtnWhite from '../assets/images/backBtnWhite.svg';
import FilterAsc from '../assets/images/filterAsc.svg';
import FilterDesc from '../assets/images/filterDesc.svg';
import TypeEMS from '../assets/images/cardEms.svg';
import TypeSecurity from '../assets/images/cardSec.svg';
import TypeFire from '../assets/images/cardFire.svg';
import axiosClient from '../contexts/axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function History() {
  const [historyData, setHistoryData]=useState([]);

  const {loading, setLoading} = useStateContext();

  useEffect( () =>{
    getReports();
    const interval = setInterval(() => {
      axiosClient.get('/admin_history')
      .then( ({data}) => {
        setHistoryData(data.data);
        setLoading(false);
      })
      .catch( () =>{
        setLoading(false);
      })
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  // make a new function
  const getReports = () => {
    setLoading(true)
    axiosClient.get('/admin_history')
      .then( ({data}) => {
        setHistoryData(data.data);
        setLoading(false);
      })
      .catch( () =>{
        setLoading(false);
      })
  }

  const [sortClick, setSortClick]=useState("");
  const [ascDesc, setAscDesc]=useState(false);

  const ongoingReports= historyData.filter((data) => data.Status == 'Ongoing');
  const completedReports = historyData.filter((data) => data.Status == 'Completed');
    
    // value.filter((order) => order.pickedup === false && order.payStatus !== 'Cancelled'));
  
  // Sorting Method based on name, indicent type, date, location. Sorted via ascending or descending
      if(sortClick==="name" && ascDesc==false){
        ongoingReports.sort((a,b) => a.user.First_Name.toLowerCase() > b.user.First_Name.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => a.user.First_Name.toLowerCase() > b.user.First_Name.toLowerCase() ? 1: -1);
      }
      else if(sortClick==="name" && ascDesc==true){
        ongoingReports.sort((a,b) => b.user.First_Name.toLowerCase() > a.user.First_Name.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => b.user.First_Name.toLowerCase() > a.user.First_Name.toLowerCase() ? 1: -1);
      }
      else if(sortClick==="incidentType" && ascDesc==false){
        ongoingReports.sort((a,b) => a.Type.toLowerCase() > b.Type.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => a.Type.toLowerCase() > b.Type.toLowerCase() ? 1: -1);
      }
      else if(sortClick==="incidentType" && ascDesc==true){
        ongoingReports.sort((a,b) => b.Type.toLowerCase() > a.Type.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => b.Type.toLowerCase() > a.Type.toLowerCase() ? 1: -1);
      }
      else if (sortClick==="location" && ascDesc==false){
        ongoingReports.sort((a,b) => a.location.Building.toLowerCase() > b.location.Building.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => a.location.Building.toLowerCase() > b.location.Building.toLowerCase() ? 1: -1);
      }
      else if (sortClick==="location" && ascDesc==true){
        ongoingReports.sort((a,b) => b.location.Building.toLowerCase() > a.location.Building.toLowerCase() ? 1: -1);
        completedReports.sort((a,b) => b.location.Building.toLowerCase() > a.location.Building.toLowerCase() ? 1: -1);
      }
      else if(sortClick==="date" && ascDesc==false){
        ongoingReports.sort ((a,b )=>Number(a.Date.replaceAll("-", "")) > Number(b.Date.replaceAll("-", "")) ? 1: -1);
        completedReports.sort ((a,b )=>Number(a.Date.replaceAll("-", "")) > Number(b.Date.replaceAll("-", "")) ? 1: -1);
      }
      else if(sortClick==="date" && ascDesc==true){
        ongoingReports.sort ((a,b )=>Number(b.Date.replaceAll("-", "")) > Number(a.Date.replaceAll("-", "")) ? 1: -1);
        completedReports.sort ((a,b )=>Number(b.Date.replaceAll("-", "")) > Number(a.Date.replaceAll("-", "")) ? 1: -1);
      }
 
// buttom change
  return (
    
    <div className="historyFrame">
      <div className="headerGroup">
        <section className="textSctn">

          {/* A div is necessary to ensure that the link is onlly applicable for the button and not its background*/}
          <div>
            <Link to={"/Admin/Home"}>
              <button className="btn">
                <section className="backButtonSctn">
                  <img className= "img1" src={BackBtn} alt="backArr" />
                  <img className="img2" src={BackBtnWhite} alt="backArr" />
                </section>
              </button>
            </Link>
          </div>
        
          
          <p className="textHeader">View History</p>
        </section>
        
        {/* FILTER AT THE TOP */}
        <section className="btnSctn">
          <section className="radioButtonSctn">
              <input className="radio" type="radio" name="sort" id="nameBtn" value="Name" onClick={()=>{setSortClick("name")}} />
              <label className="label nameBtn" htmlFor="nameBtn"><span className="name">Name</span></label>

              <input className="radio" type="radio" name="sort" id="typeBtn" value="Incident Type" onClick={()=>{setSortClick("incidentType")}} />
              <label className="label typeBtn" htmlFor="typeBtn"><span className="name">Incident Type</span></label>

              <input className="radio" type="radio" name="sort" id="dateBtn" value="Date" onClick={()=>{setSortClick("date")}} />
              <label className="label dateBtn" htmlFor="dateBtn"><span className="name">Date</span></label>

              <input className="radio" type="radio" name="sort" id="locBtn" value="Location" onClick={()=>{setSortClick("location")}} />
              <label className="label locBtn" htmlFor="locBtn"><span className="name">Location</span></label>
           </section>

          <label htmlFor="check" className="filterItem">
            <input type="checkbox"  className="checkInput" onClick={()=>{setAscDesc(!ascDesc)}}/>
            <section className="filterImage">
                <img className="img1" src={FilterAsc} alt="filter"  />
                <img className="img2" src={FilterDesc} alt="filterAsc"/>
              </section>
          </label>
        </section>
      </div>
      {loading &&
        <div className="listGroup">
          <hr className="line1"/>
          <div className="contentSctn">
            <p className='loadingText'>Loading...</p>
          </div>
        </div>
      }
      {!loading && 
      <div className="listGroup">
       <hr className="line1"/>

        {ongoingReports.map ( data => (
          <div key={data.id} className="contentSctn" id={data.Status == 'Completed' ? 'historyCompleted' : ''}>
            <section className="allDataText">  
              {
                data.Type == 'EMS' && 
                    <img className='img' src={TypeEMS} />
                    ||
                data.Type == 'Security' &&
                    <img className='img' src={TypeSecurity} />
                    ||
                data.Type == 'Fire' &&
                    <img className='img' src={TypeFire} />
              }

              <p className="nameText">{data.user.First_Name} {data.user.Last_Name}</p>
              
              <section className="midText">
                {/* <h4 className="titleText">Id <br/>
                <p className="inputText">{data.id}</p>
                </h4> */}

                <h4 className="titleText">Date <br/>
                <p className="inputText">{data.Date}</p>
                </h4>
                <h4 className="titleText">Location <br/>
                <p className="inputText">{data.location.Building}</p>
                </h4>

              </section>

              {/* <section className="lowerText">
                

                <h4 className="titleText">Floor  <br/> 
                <p className="inputText"> {data.location.Floor}</p>
                </h4>
              </section> */}

            </section>

              <div className="btnSctn">
                <NavLink to={"/Admin/ViewHistory/" + data.id}>
                  <button className="btn">More Details</button>
                </NavLink >
              </div>
              
                <hr className="line" />  
          </div>
        ))}
        {completedReports.map ( data => (
          <div key={data.id} className="contentSctn" id={data.Status == 'Completed' ? 'historyCompleted' : ''}>
            <section className="allDataText">  
              {
                data.Type == 'EMS' && 
                    <img className='img' src={TypeEMS} />
                    ||
                data.Type == 'Security' &&
                    <img className='img' src={TypeSecurity} />
                    ||
                data.Type == 'Fire' &&
                    <img className='img' src={TypeFire} />
              }

              <p className="nameText">{data.user.First_Name} {data.user.Last_Name}</p>
              
              <section className="midText">
                {/* <h4 className="titleText">Id <br/>
                <p className="inputText">{data.id}</p>
                </h4> */}

                <h4 className="titleText">Date <br/>
                <p className="inputText">{data.Date}</p>
                </h4>
                <h4 className="titleText">Location <br/>
                <p className="inputText">{data.location.Building}</p>
                </h4>

              </section>

              {/* <section className="lowerText">
                

                <h4 className="titleText">Floor  <br/> 
                <p className="inputText"> {data.location.Floor}</p>
                </h4>
              </section> */}

            </section>

              <div className="btnSctn">
                <NavLink to={"/Admin/ViewHistory/" + data.id}>
                  <button className="btn">More Details</button>
                </NavLink >
              </div>
              
                <hr className="line" />  
          </div>
        ))}
       

      </div> 
       }
    </div>
    
  )
}
