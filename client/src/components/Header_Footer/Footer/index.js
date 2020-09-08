import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompasee from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            this.props.data.siteData ?
                <footer className = 'bck_b_dark'>
                    <div className = 'container'>
                        <div className = 'logo'>Waves</div>
                        <div className = 'wrapper'>
                            <div className = 'left'>
                                <h2>Contact information</h2>
                                <div className = 'business_nfo'>
                                    <div className = 'tag'>
                                        <FontAwesomeIcon icon = {faCompasee} className = 'icon'/>
                                        <div className = 'nfo'>
                                            <div>Address</div>
                                            <div>{this.props.data.siteData[0].address}</div>
                                        </div>
                                    </div>
                                    <div className = 'tag'>
                                        <FontAwesomeIcon icon = {faPhone} className = 'icon'/>
                                        <div className = 'nfo'>
                                            <div>Phone</div>
                                            <div>{this.props.data.siteData[0].phone}</div>
                                        </div>
                                    </div>
                                    <div className = 'tag'>
                                        <FontAwesomeIcon icon = {faClock} className = 'icon'/>
                                        <div className = 'nfo'>
                                            <div>Working Hours</div>
                                            <div>{this.props.data.siteData[0].hours}</div>
                                        </div>
                                    </div>
                                    <div className = 'tag'>
                                        <FontAwesomeIcon icon = {faEnvelope} className = 'icon'/>
                                        <div className = 'nfo'>
                                            <div>Email</div>
                                            <div>{this.props.data.siteData[0].email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = 'left'>
                                <h2>Be the first to know</h2>
                                <div>
                                    Get all the latest information on events, sales and offers.You can miss out
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                : null
        );
    }
}
 
export default Footer;


// const Footer = () => {
//     return ( 
//         <footer className = 'back_b_dark'>
//             <div className = 'container'>
//                 <div className = 'logo'>Waves</div>
//                 <div className = 'wrapper'>
//                     <div className = 'left'>
//                         <h2>Contact information</h2>
//                         <div className = 'business_nfo'>
//                             <div className = 'tag'>
//                                 <FontAwesomeIcon icon = {faCompasee} className = 'icon'/>
//                                 <div className = 'nfo'>
//                                     <div>Address</div>
//                                     <div>Kramer 2345</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }
 
// export default Footer;