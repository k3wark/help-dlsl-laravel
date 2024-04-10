import '../stylesheets/FAQ.css'
import HelpLogoPin from '../assets/images/helpLogoWPin.svg';

export default function FAQ(){
    return(
        <div className='faqMainDiv'>
            <div className='faqLeft'>
                <h1>Got Questions?</h1>
                <h2>Send us a message</h2>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email Address' />
                <input type="text" placeholder='Subject' />
                <h2>Tell us more about your concern</h2>
                <textarea></textarea>
                <div className='faqSendBtn'>
                    <button>Send Message</button>
                </div>
            </div>
            <div className='faqRight'>
                <span>Here are some of </span>
                <img src={HelpLogoPin} />
                <span>'s most frequently asked questions</span>
                <table className='faqTable'>
                    <tbody>
                        <tr><td>What is the HELP application?</td></tr>
                        <tr><td>How does the SOS button work?</td></tr>
                        <tr><td>What information is needed in emergency details?</td></tr>
                        <tr><td>Who can I communicate with about the application if I require non-technical information?</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}