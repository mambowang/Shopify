import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import {Loader1} from '../../components/Loader/index.jsx';
import contactlocation from '../../images/icon/contact_location.png';
import contactphone from '../../images/icon/contact_phone.png';
import contactemail from '../../images/icon/contact_email.png';
import contactweb from '../../images/icon/contact_web.png';

const AnyReactComponent = () => <div></div>;

class ContactusPage extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33,
        },
        zoom: 11,
    };

    sendusnow() {
        if(this.refs.name.value!==''&&this.refs.email.value!==''&&this.refs.address.value!==''&&this.refs.msg.value!==''){
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/contact', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Accept':	'application/json'
            },
            body: JSON.stringify({
                name: this.refs.name.value, 
                email: this.refs.email.value, 
                subject: this.refs.address.value, 
                comment: this.refs.msg.value
            })
        })
            .then(result=>{
                if(result.status !== 200)alert("Send Failed!!!")
            })
            .catch((error) => {
                console.log(error)
              })
            }
    }

    render() {
        return (
            <div>
                <Loader1/>
                <div id="map-canvas">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCQgM4VKy8j_2-iMIQ3F1vg3ICyyxuDzUM' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                    />
                    </GoogleMapReact>
                </div>
                <section>
                    <div className="container">
                        <div className="contact-info-wrapper d-none d-lg-block">
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <img src={contactlocation} alt="Location"/>
                                    </div>
                                    <div className="contact-text">
                                        No 40 Baria Sreet 133/2,
                                        <br/> NewYork
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <img src={contactphone} alt="phone"/>
                                    </div>
                                    <div className="contact-text">
                                        (+300) 125-1365
                                        <br/>(683) 833 1660
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <img src={contactemail} alt="email"/>
                                    </div>
                                    <div className="contact-text">
                                        isa-85@example.com
                                        <br/> jean-lee@example.com
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <img src={contactweb} alt="web"/>
                                    </div>
                                    <div className="contact-text">
                                        www.Lyrae.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container py-85 py-tn-50">
                        <div className="port-title">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-8 text-center">
                                        <h2 className="title">contact us</h2>
                                        <p className="title-detail">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
                                            was born and I will give you a complete account.</p>
                                        <div className="title-border mx-auto m-b-55 m-b-tn-35"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="port-body">
                            <div className="contact-form">
                                <div className="messages" id="status"></div>
                                <form id="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group au-form">
                                                <div className="help-block with-errors"></div>
                                                <input type="text" ref="name" id="name" name="name" placeholder="Your Full Name *" required data-error="Name is required."/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group au-form">
                                                <div className="help-block with-errors"></div>
                                                <input type="email" ref="email" id="email" name="email" placeholder="Your Mail *" required data-error="Please, enter a valid email."/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group au-form">
                                                <div className="help-block with-errors"></div>
                                                <input type="text" ref="address" id="address" name="address" placeholder="Your Address" required data-error="Address is required"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group au-form">
                                                <div className="help-block with-errors"></div>
                                                <input type="text" ref="phone" id="phone" name="phone" placeholder="Your Phone *" required data-error="Phone is required"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group au-form">
                                                <div className="help-block with-errors"></div>
                                                <textarea rows="9" ref="msg" placeholder="Your Message" id="msg" name="msg" required data-error="Please, leave us a message"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group au-form">
                                            <button type="button" id="contactBtn" className="btn btn-black text-uppercase btn-small mx-auto" onClick={()=>this.sendusnow()}>Send us now</button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ContactusPage;