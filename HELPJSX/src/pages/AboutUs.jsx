import '../stylesheets/AboutUs.css';
import AboutLine from '../assets/images/aboutLine.svg';

export default function User(){
    return(
        <div className='aboutMainDiv'>
            <div className='aboutContent'>
                <h1>ABOUT US</h1>
                <img src={AboutLine} />
                <p>We are Computer Engineering students from De La Salle Lipa with a straightforward vision that will aim to improve the campus's emergency reaction time. Keeping this in mind, we are determined to develop a program that we named "H.E.L.P." that will help the indivuals of DLSL in the case of an emergency.</p>
            </div>
        </div>
    )
}