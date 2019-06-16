import React, { Component } from 'react';
import { connect } from 'react-redux';

import './login.css'
import { Link } from 'react-router-dom'
import bgpage01 from '../../images/bg-page_01.jpg';
import { Loader1 } from '../../components/Loader/index.jsx';
import { login } from '../../actions/auth'
import { token } from '../../actions/auth'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_error:false,
            register_error:false,
            countrys:[]
        };
    }
    componentDidMount() {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/country?lang=en',{
            method: 'get',
            headers: {
                'Accept':	'application/json'
            },
        })
            .then(result=>result.json())
            .then(result=>{
                var option_str = ""
                result.map((country)=>{
                    option_str += "<option value="+country.code+">"+country.name+"</option>";
                })
                document.getElementById("r_country_name").innerHTML = option_str;
            })
            .catch((error) => {
                console.log(error)
        })
         
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }
    login() {
        var flag = false;
        this.setState({login_error:false})
        if(this.refs.username.value !== ''  && this.refs.password.value !== ''){
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/customer/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Accept':	'application/json'
            },
            body: JSON.stringify({
                password: this.refs.password.value,
                username: this.refs.username.value
            })
        })
            .then(result => {
                if(result.status === 200){
                    flag = true;
                    return result.json()
                }})
            .then(result => {
                if(flag){
                this.setState({login_error:false})
                this.props.login(result.id);
                this.props.token(result.token);
                this.props.history.push('/')
                }
                else this.setState({login_error:true})
        })
            .catch((error) => {
                console.log(error)
            })
        }
        else this.setState({login_error:true})
    }

    register() {
        var flag = false;
        this.setState({register_error:false})
        var country_name = document.getElementById("r_country_name").value;
        if(this.refs.r_email.value !== ''  && this.refs.r_password.value !== '' && this.refs.r_first_name.value !== '' && this.refs.r_last_name.value !== ''){
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/customer/register', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Accept':	'application/json'
            },
            body: JSON.stringify({
                billing:{
                    country: country_name,
                    firstName: this.refs.r_first_name.value,
                    lastName: this.refs.r_last_name.value
                },
                clearPassword: this.refs.r_password.value,
                emailAddress: this.refs.r_email.value,
                userName: this.refs.r_email.value
            })
        })
            .then(result => {
                if(result.status === 200){
                    flag = true;
                    return result.json()
                }})
            .then(result => {
                if(flag){
                this.setState({register_error:false})
                this.props.login(result.id);
                this.props.history.push('/')
                }
                else this.setState({register_error:true})
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else this.setState({register_error:true})
    }

    render() {
        return (
            <div>
                <Loader1 />

                <section>
                    <div className="pageintro">
                        <div className="pageintro-bg">
                            <img src={bgpage01} alt="About Us" />
                        </div>
                        <div className="pageintro-body">
                            <h1 className="pageintro-title">My account</h1>
                            <nav className="pageintro-breadcumb">
                                <ul>
                                    <li>
                                        <a className="a">Home</a>
                                    </li>
                                    <li>
                                        <a className="a">My Account</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container py-70 py-tn-40">
                        <div className="row">
                            <div className="col-lg-6 ">
                                <div className="au-form-body p-r-lg-15 p-r-xl-15">
                                    <h2 className="au-form-title form-title-border">Login</h2>
                                    <fieldset className="m-t-40">
                                        <form action = "#">
                                            {
                                            this.state.login_error?
                                            <div className="alert alert-danger">
                                                Login Failed. Username or Password is incorrect.
                                            </div>:null
                                            }
                                            <div className="form-group au-form require">
                                                <label>Username or email address</label>
                                                <input ref="username" type="text" id="username" required data-error="Name is required."/>
                                            </div>
                                            <div className="form-group au-form require">
                                                <label>Password</label>
                                                <input ref="password" type="password" id="password" required data-error="Password is required."/>
                                            </div>
                                            <div className="form-group au-form">
                                                <button type="button" className="btn btn-black text-uppercase btn-small" onClick={() => this.login()}>Login</button>
                                                <div className="form-checkbox m-l-18 m-t-tn-10 m-l-tn-0">
                                                    <input type="checkbox" />
                                                    <label>Remember me</label>
                                                </div>
                                                <div className="form-forgot w-100 m-t-10">
                                                    <Link to={"/forgotpass"} className="a">Lost your password?</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="au-form-body p-r-lg-15 p-r-xl-15">
                                    <h2 className="au-form-title  form-title-border">REGISTER</h2>
                                    <fieldset className="m-t-40">
                                        <form action="#">
                                            {
                                                this.state.register_error?
                                                <div className="alert alert-danger" id="register_alert">
                                                    Register Failed. Enter the correct values ​​below.
                                                </div>:null
                                            }
                                            <div className="form-group au-form require">
                                                <label>First name</label>
                                                <input ref="r_first_name" type="text" id="r_first_name" required data-error="First name is required."/>
                                            </div>
                                            <div className="form-group au-form require">
                                                <label>Last name</label>
                                                <input ref="r_last_name" type="text" id="r_last_name" required data-error="Last name is required."/>
                                            </div>
                                            <div className="form-group au-form require">
                                                <label>Country</label>
                                                <select name="country" id="r_country_name"></select>
                                            </div>
                                            <div className="form-group au-form require">
                                                <label>Email address</label>
                                                <input ref="r_email" type="email" id="r_email" required data-error="Please, enter a valid email."/>
                                            </div>
                                            <div className="form-group au-form require">
                                                <label>Password</label>
                                                <input ref="r_password" type="password" id="r_password" required data-error="Password is required."/>
                                            </div>
                                            <div className="form-group au-form">
                                                 {/* IST<a id="registerBtn" className="submitBtn" onClick={() => this.register()}>REGER</a>  */}
                                                <button type="button" className="btn btn-black text-uppercase btn-small" onClick={()=>this.register()}>REGISTER</button>
                                            </div>
                                        </form>
                                    </fieldset>
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
        loginstate : state.auth.loginstate,
        user_id : state.auth.user_id,
        user_token : state.auth.user_token
    }
}

const keyDispatchToProps = (dispatch) => {
    return {
        login : (e) => dispatch(login(e)),
        token : (e) => dispatch(token(e))
    }
}
export default connect(keyStateToProps, keyDispatchToProps) (LoginPage);