import React, { Component } from 'react';
import './checkout.css'
import { connect } from 'react-redux';
import {Loader1} from '../../components/Loader/index.jsx';
import bgpage01 from '../../images/bg-page_01.jpg';
import paypal from '../../images/icon/paypal.png';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          subTotal:0
        };
    }
    getShipping(){
        if(this.refs.postalCode.value!==''){
            fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/auth/cart/'+this.props.cartkey+'/shipping?postalCode='+this.refs.postalCode.value,{
                method: 'get',
                headers: {
                    'Accept':	'*/*'
                },
            })
                .then(result=>result.json())
                .then(result=>{
                   
                })
                .catch((error) => {
                    console.log(error)
            })
        }
    }
    componentDidMount() {
        var subTotal=0;
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey+'/payment',{
            method: 'get',
            headers: {
                'Accept':	'application/json'
            },
        })
            .then(result=>result.json())
            .then(result=>{
                this.setState({subTotal:result.totals[0].value})
                subTotal = result.totals[0].value;
                var table_str = "<tbody><tr><th>ITEM</th><th>total</th></tr>";
                this.props.cart_items.products.forEach((product) =>{
                    table_str+="<tr><td>"+product.description.name+" * "+product.quantity+"</td><td>$"+product.subTotal+"</td></tr>"
                })
                table_str+="<tr className='sub-total'><td>Subtotal</td><td>$"+subTotal+"</td></tr><tr><td>SHPPING</td><td>$0.00</td></tr><tr className='total'><td>Total</td><td>$"+subTotal+"</td></tr></tbody>"
                document.getElementById("cart_table").innerHTML = table_str;
            })
            .catch((error) => {
                console.log(error)
        })
    }
    render() {
        return (
            <div>
                <Loader1/>
                <section>
                    <div className="pageintro">
                        <div className="pageintro-bg">
                            <img src={bgpage01} alt="About Us"/>
                        </div>
                        <div className="pageintro-body">
                            <h1 className="pageintro-title">CheckOut</h1>
                            <nav className="pageintro-breadcumb">
                                <ul>
                                    <li>
                                        <a className="a">Home</a>
                                    </li>
                                    <li>
                                        <a className="a">CheckOut</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container p-t-100 p-b-45">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="checkout-heading">
                                    <a className="a">Returning customer? Click here to login</a>
                                </div>
                                <div className="checkout-heading">
                                    <a className="a">Have a coupon? Click here to enter your code</a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="au-form-body p-b-0">
                                    <h2 className="au-form-title form-title-border m-b-37">BILLING DETAILS</h2>
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group au-form require">
                                                    <label>First Name</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group au-form require">
                                                    <label>Last Name</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form">
                                                    <label>Company Name</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form require">
                                                    <label>Address</label>
                                                    <input type="text" placeholder="Street address"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form">
                                                    <input type="text" placeholder="Apartment, suite, unit etc. (optional)"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form require">
                                                    <label>Town/City</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form require">
                                                    <label>Country</label>
                                                    <select name="country" id="r_country_name">
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AX">Åland Islands</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia, Plurinational State of</option>
                                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                        <option value="BA">Bosnia and Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BV">Bouvet Island</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos (Keeling) Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CG">Congo</option>
                                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="CI">Côte d'Ivoire</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CW">Curaçao</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="TF">French Southern Territories</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-Bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">Heard Island and McDonald Islands</option>
                                                        <option value="VA">Holy See (Vatican City State)</option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran, Islamic Republic of</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                                        <option value="KR">Korea, Republic of</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">Lao People's Democratic Republic</option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macao</option>
                                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia, Federated States of</option>
                                                        <option value="MD">Moldova, Republic of</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">Palestinian Territory, Occupied</option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="RE">Réunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russian Federation</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="BL">Saint Barthélemy</option>
                                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                        <option value="KN">Saint Kitts and Nevis</option>
                                                        <option value="LC">Saint Lucia</option>
                                                        <option value="MF">Saint Martin (French part)</option>
                                                        <option value="PM">Saint Pierre and Miquelon</option>
                                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                        <option value="SS">South Sudan</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SZ">Swaziland</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan, Province of China</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania, United Republic of</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TL">Timor-Leste</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">United States Minor Outlying Islands</option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                        <option defaultValue="VN">VietNam</option>
                                                        <option value="VG">Virgin Islands, British</option>
                                                        <option value="VI">Virgin Islands, U.S.</option>
                                                        <option value="WF">Wallis and Futuna</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form require">
                                                    <label>Postcode / Zip</label>
                                                    <input type="text" id="postal_code" onBlur={() => this.getShipping()} ref="postalCode"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group au-form require">
                                                    <label>Phone</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group au-form require">
                                                    <label>Email Address</label>
                                                    <input type="text"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group au-form">
                                                    <div className="form-checkbox">
                                                        <input type="checkbox"/>
                                                        <label>Create an account?</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="au-form-body">
                                    <h2 className="au-form-title form-title-border m-b-37">ADDITIONAL INFORMATION</h2>
                                    <form>
                                        <div className="form-group au-form">
                                            <label>Order notes</label>
                                            <textarea cols="30" rows="9" defaultValue="Note about your order, eg. special notes fordelivery."/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="au-form-body">
                                    <h2 className="au-form-title form-title-border m-b-37">YOUR ORDER</h2>
                                    <table className='checkout-bill' id="cart_table"/>
                                    <form>
                                        <div className="checkout-payment m-b-16">
                                            <label>Check payment</label>
                                            <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store
                                                Postcode.
                                            </p>
                                        </div>
                                        <div className="checkout-paypal m-t-43">
                                            <label>Paypal</label>
                                            <img src={paypal} alt="paypal"/>
                                            <a className="a">What is paypal?</a>
                                        </div>
                                        <button className="process-button m-t-50 float-right">poceed to paypal</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
const keyStateToProps = (state) => {
    return {
        cartkey : state.cartkey.cartkey,
        cart_items : state.cart.cart_items,
    }
}

const keyDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(keyStateToProps, keyDispatchToProps) (Checkout);