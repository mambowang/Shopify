import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './footer.css';

import facebook_white from '../../images/icon/facebook_white.png';
import twitter_white from '../../images/icon/twitter_white.png';
import linkedin_white from '../../images/icon/linkedin_white.png';
import google_plus_white from '../../images/icon/google-plus_white.png';

import gallery_01 from '../../images/gallery_01.jpg';
// import gallery_02 from '../../images/gallery_02.jpg';
// import gallery_03 from '../../images/gallery_03.jpg';
// import gallery_04 from '../../images/gallery_04.jpg';
// import gallery_05 from '../../images/gallery_05.jpg';
// import gallery_06 from '../../images/gallery_06.jpg';

import lightbox_01 from '../../images/lightbox_01.jpg';
// import lightbox_02 from '../../images/lightbox_02.jpg';
// import lightbox_03 from '../../images/lightbox_03.jpg';
// import lightbox_04 from '../../images/lightbox_04.jpg';
// import lightbox_05 from '../../images/lightbox_05.jpg';
// import lightbox_06 from '../../images/lightbox_05.jpg';

import cash_01 from '../../images/icon/cash_01.png';
import cash_02 from '../../images/icon/cash_02.png';
import cash_03 from '../../images/icon/cash_03.png';
import cash_04 from '../../images/icon/cash_04.png';
import cash_05 from '../../images/icon/cash_05.png';

export class Footer extends Component {

	constructor(props) {
        super(props);
        this.state = {
            merchant: false,
            media: false,
        };
    }

    componentDidMount() {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/marketplace/DEFAULT')
            .then(result=>result.json())
            .then(merchant=>this.setState({merchant}))
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/config')
            .then(result=>result.json())
            .then(media=>this.setState({media}))
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/content/boxes/pitch')
            .then(result=>result.json())
            .then(footer=>{
            	document.getElementById("footer_content").innerHTML = footer.boxContent;
            })
    }

    render() {
    	var media = ['facebook:null', 'pinterest:null', 'ga:null', 'instagram:null']
    	if(this.state.media) media = this.state.media
		var d = new Date();
		var year = d.getFullYear();
        return (
        	<footer>
		        <div className="footer footer-1">
		            <div className="main-footer">
		                <div className="container">
		                    <div className="main-footer-container">
		                        <div className="footer-item">
		                            <div className="footer-item-heading">
		                                <div className="logo">
		                                    <a className="a">
		                                        <img src={this.state.merchant ? this.state.merchant.store.logo.path : ''} className="logo_02" alt="Lyrae" title="Lyrae"/>
		                                    </a>
		                                </div>
		                            </div>
		                            <div id="footer_content" className="footer-item-content">
		                            </div>
		                        </div>
		                        <div className="footer-item">
		                            <div className="footer-item-heading">
		                                <h3>Address</h3>
		                            </div>
		                            <div className="footer-item-content">
		                                <div className="footer-infopage">
		                                    <p>
		                                    	<label>{this.state.merchant ? this.state.merchant.store.address.address: ''}</label>&nbsp;&nbsp;
		                                    	<label>{this.state.merchant ? this.state.merchant.store.address.city: ''}</label>&nbsp;&nbsp;
		                                    	<label>{this.state.merchant ? this.state.merchant.store.address.stateProvince: ''}</label>&nbsp;&nbsp;
		                                    	<label>{this.state.merchant ? this.state.merchant.store.address.country: ''}</label>&nbsp;&nbsp;
		                                    	<label>{this.state.merchant ? this.state.merchant.store.address.postalCode: ''}</label>
		                                    </p>
		                                    <p> Tel:&nbsp; {this.state.merchant ? this.state.merchant.store.phone : ''}</p>
		                                    <p> E-mail:&nbsp; {this.state.merchant ? this.state.merchant.store.email : ''}</p>
		                                </div>
		                                <div className="footer-social m-t-6">
		                                    <div className="social-item facebook">
		                                        <a className="a">
		                                            <img src={facebook_white} style={media.facebook ? {display:'block'} : {display:'none'}} alt="Facebook" title="Facebook"/>
		                                        </a>
		                                    </div>
		                                    <div className="social-item twitter">
		                                        <a className="a">
		                                            <img src={twitter_white} style={media.pinterest ? {display:'block'} : {display:'none'}} alt="Twitter" title="Twitter"/>
		                                        </a>
		                                    </div>
		                                    <div className="social-item linkedin">
		                                        <a className="a">
		                                            <img src={linkedin_white} style={media.ga ? {display:'block'} : {display:'none'}} alt="Linkedin" title="Linkedin"/>
		                                        </a>
		                                    </div>
		                                    <div className="social-item google-plus">
		                                        <a className="a">
		                                            <img src={google_plus_white} style={media.instagram ? {display:'block'} : {display:'none'}} alt="Google Plus" title="Google Plus"/>
		                                        </a>
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
		                        <div className="footer-item">
		                            <div className="footer-item-heading">
		                                <h3>latest post</h3>
		                                <div className="footer-border"></div>
		                            </div>
		                            <div className="footer-item-content">
		                                <ul className="footer-latest-post">
		                                    <li>
		                                        <div className="post-item">
		                                            <a className="a">Neque porro quisquam</a>
		                                            <span className="post-time">25 / June</span>
		                                        </div>
		                                    </li>
		                                    <li>
		                                        <div className="post-item">
		                                            <a className="a">Duis aute irure dolor</a>
		                                            <span className="post-time">18 / June</span>
		                                        </div>
		                                    </li>
		                                    <li>
		                                        <div className="post-item">
		                                            <a className="a">Neque porro quisquam est</a>
		                                            <span className="post-time">22 / June</span>
		                                        </div>
		                                    </li>
		                                </ul>
		                            </div>
		                        </div>
		                        <div className="footer-item">
		                            <div className="footer-item-heading">
		                                <h3>FOLLOW US</h3>
		                                <div className="footer-border"></div>
		                            </div>
		                            <div className="footer-item-content">
		                                <div className="footer-gallery m-b-36">
		                                    <div className="gallery">
		                                        <div className="gallery-item">
		                                            <Link to={"/contactus"} href={lightbox_01} data-rel="footerGallery:slideshow">
		                                                <img src={gallery_01} alt="gallery"/>
		                                            </Link>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <div className="sub-footer">
		                <div className="container">
		                    <div className="sub-footer-container">
		                        <div className="copy-right">
		                            <p>
		                            	<label>Copyright © </label>
		                            	<label>{this.state.merchant ? this.state.merchant.store.name: ''}</label>&nbsp;
		                            	<label>{this.state.merchant ? this.state.merchant.store.inBusinessSince: ''}</label>&nbsp;
		                            	<label>{year}</label>
		                            </p>
		                        </div>
		                        <div className="footer-cash">
		                            <div className="cash-item">
		                                <a className="a">
		                                    <img src={cash_01} alt="Master Card" title="Master Card"/>
		                                </a>
		                            </div>
		                            <div className="cash-item">
		                                <a className="a">
		                                    <img src={cash_02} alt="Paypal" title="Paypal"/>
		                                </a>
		                            </div>
		                            <div className="cash-item">
		                                <a className="a">
		                                    <img src={cash_03} alt="Visa" title="Visa"/>
		                                </a>
		                            </div>
		                            <div className="cash-item">
		                                <a className="a">
		                                    <img src={cash_04} alt="America" title="America"/>
		                                </a>
		                            </div>
		                            <div className="cash-item">
		                                <a className="a">
		                                    <img src={cash_05} alt="Discover" title="Discover"/>
		                                </a>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </footer>
        )
    }
}

export default Footer ;