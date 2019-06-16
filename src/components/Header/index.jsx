import React, {Component} from 'react';
import {translate} from 'react-i18next';
import { connect } from 'react-redux';
import Autocomplete from  'react-autocomplete';
import { Link } from 'react-router-dom'
import { Route , withRouter} from 'react-router-dom';

import LanuageSelector from '../LanguageSelector'
import Cartbox from '../Cartbox/index.jsx';
import Menu from '../Menu';
import MobileMenu from '../MobileMenu';
import { search } from '../../actions/search'
import { cartTo } from '../../actions/cart_item'
import { cartkey } from '../../actions/cartkey'
import { logout } from '../../actions/auth'


import './Header.css';

import header_search from '../../images/icon/header-search.png';
import header_cart from '../../images/icon/header-cart.png';

import logo_02 from '../../images/icon/logo_02.png';
import close_gray from '../../images/icon/close_gray.png';
import resume_01 from '../../images/resume_01.jpg';
import resume_02 from '../../images/resume_02.jpg';
import resume_03 from '../../images/resume_03.jpg';

export function matchStocks(state, value) {
  return (
    state.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchresult: false,
            category: [],
            testpage: false,
            autocomplete: {values:[]},
            searchval: '',
            menuSelected: null,
            user_first_name:"",
            user_last_name:""
        };
    }


    logout() {
        this.props.logout()
    }

    setLoginState() {
        if(this.props.user_token!==""){
            fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/auth/customers/profile',{
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.props.user_token
                },
            })
            .then(result=>result.json())
            .then(result=>{
                //alert(result.billing.firstName)
                this.setState({user_first_name:result.billing.firstName})
                this.setState({user_last_name:result.billing.lastName})
            })
        }
    }

    handleKeyPress (event) {
        if(event.key === 'Enter'){
            const value = event.target.value;
            this.setState({searchval:event.target.value})
            if(value === ""){
                fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/group/FEATURED_ITEM')
                    .then(result=>result.json())
                    .then(products=>this.props.search(products))
            }
            else {
                fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/search', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        count: 100,
                        query: value,
                        start: 0
                    })
                })
                    .then(result=>result.json())
                    .then(searchresult=>this.props.search(searchresult))
            }
        }
    }

    autocomplete(event, searchval) {
        this.setState({ searchval })
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/search/autocomplete?lang=en', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: event.target.value
            })
        })
            .then(result=>result.json())
            .then(autocomplete=>this.setState({autocomplete}))
        this.setState({searchval:event.target.value})
    }

    componentDidMount() {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/marketplace/DEFAULT')
            .then(result=>result.json())
            .then(merchant=>this.setState({merchant}))
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/category?filter=FEATURED')
            .then(result=>result.json())
            .then(category=>this.setState({category}))
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/content/pages')
            .then(result=>result.json())
            .then(testpage=>this.setState({testpage}))
        if(this.props.cart_items.quantity === 0){
            this.props.addcartkey(''); this.props.cartTo(false)
        }

        // console.log(this.input.refs.input.);
        this.input.refs.input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
                const value = event.target.value;
                this.setState({searchval:event.target.value})
                if(value === ""){
                    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/group/FEATURED_ITEM')
                        .then(result=>result.json())
                        .then(products=>this.props.search(products))
                }
                else {
                    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/search', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            count: 100,
                            query: value,
                            start: 0
                        })
                    })
                        .then(result=>result.json())
                        .then(searchresult=>this.props.search(searchresult))
                }
            }
        })
    }
    removeauto() {
        this.setState({autocomplete:{values:[]}})
    }

    addActive(id) {
        this.setState({menuSelected  : id})
    }

    removeActive() {
        this.setState({menuSelected  : null})
    }

    render () {
        const carts = this.props.cart_items;
        if(this.state.user_first_name==="" && this.props.loginstate)this.setLoginState()
        return (
            <div>
                <header>
                    <div className="header-wrapper">
                        <div className="header-wrapper-desktop d-none d-lg-block">
                            <div className="header header-style-1">
                                <div className="header-main">
                                    <div className="header__logo" onClick={()=>this.removeActive()}>
                                        <Link to={"/landing"} className="a">
                                            <img src={this.state.merchant ? this.state.merchant.store.logo.path : ''} className="logo_02" alt="Lyrae"/>
                                        </Link>
                                    </div>
                                    <nav className="header__navbar">
                                        <ul className="navbar-menu">
                                            {
                                                this.state.category.map((category, ind) =>
                                                    <Menu key={ind} category={category} clickFnction={(id)=>this.addActive(category.id)} selected={this.state.menuSelected}/>
                                                )
                                            }
                                            <li>
                                                <a className="a">{this.state.testpage ? this.state.testpage[0].name : ''}</a>
                                            </li>
                                            <li>
                                                <LanuageSelector/>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div className="header__button">
                                        <ul>
                                            <li className="header-search">
                                                <div className="search-button">
                                                    <img src={header_search} alt="Search"/>
                                                </div>
                                                <div className="search-input">
                                                    <Autocomplete
                                                        value={ this.state.searchval }
                                                        ref={el => this.input = el}
                                                        inputProps={{ id: 'states-autocomplete', placeholder: 'Start typing here...' }}
                                                        wrapperStyle={{ width: '100%', display: 'inline-block' }}
                                                        items={ this.state.autocomplete.values }
                                                        getItemValue={ item => item }
                                                        shouldItemRender={ matchStocks }
                                                        onChange={(e, searchval) =>this.autocomplete(e, searchval) }
                                                        onSelect={ searchval => this.setState({ searchval }) }
                                                        renderMenu={ children => (
                                                        <div className = "menu">
                                                            <div className="autocomplete">
                                                                { children }
                                                            </div>
                                                        </div>
                                                        )}
                                                        renderItem={ (item, isHighlighted) => (
                                                            <div className="auto" key={ item } >
                                                                <div
                                                                  className={`autolist ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                  { item }
                                                                </div>
                                                            </div>
                                                        )}
                                                    />
                                                    <a className="a" onClick={()=>this.removeauto()}> </a>
                                                </div>
                                            </li>

                                            <li className="header-shop-cart">
                                                <div className="shop-cart-button">
                                                    <img src={header_cart} alt="Cart"/>
                                                    <span className="amount">{carts.products.length >0 ? carts.quantity : "0"}</span>
                                                </div>
                                                <div className="shop-cart">
                                                    <ul>
                                                        {
                                                            carts.products.map((cart, ind) =>
                                                                <Cartbox key={ind} cart={cart}/>
                                                            )
                                                        }
                                                    </ul>
                                                    <div className="checkout m-t-26">
                                                        <p>Subtotal
                                                            <span className="sub-total">{carts.products.length >0 ? carts.displaySubTotal : "US$0.00"}</span>
                                                        </p>
                                                        <p>Total
                                                            <span className="total">{carts.products.length >0 ? carts.displayTotal : "US$0.00"}</span>
                                                        </p>
                                                        <Link id="checkout" to={"/shoppingcart"} className="a">Checkout</Link>
                                                    </div>
                                                </div>
                                            </li>
                                             <li className="header-shop-cart">
                                                <div className="bar-button" data-toggle="modal">
                                                    {
                                                        this.props.loginstate? "Welcome "+this.state.user_first_name + "-"+ this.state.user_last_name: "MyAccount"
                                                    }
                                                </div>
                                                <div className="shop-cart user">
                                                    {
                                                        this.props.loginstate? 
                                                        <ul className="shop-cart__list">
                                                            <li className="item">
                                                                <Link className="login" to={"/landing"}>My Profile</Link>
                                                            </li>
                                                            <li className="item">
                                                                <span className="login" onClick={()=>this.logout()}>Logout</span>
                                                            </li>
                                                        </ul>
                                                        : 
                                                        <ul className="shop-cart__list">
                                                            <li className="item">
                                                                <Link className="login" to={"/login?#"}>Register</Link>
                                                            </li>
                                                            <li className="item">
                                                                <Link className="login" to={"/login?#"}>Signin</Link>
                                                            </li>
                                                        </ul>
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-wrapper-mobile d-block d-lg-none">
                            <div className="header-mobile__bar">
                                <div className="header-mobile__logo">
                                    <img src={this.state.merchant ? this.state.merchant.store.logo.path : ''} alt="Lyrae"/>
                                </div>
                                <div className="header-mobile__button">
                                    <span className="humburger-box">
                                        <span className="hamburger__inner"></span>
                                    </span>
                                </div>
                            </div>
                            <nav className="header-mobile__navbar">
                                <ul>
                                    {
                                        this.state.category.map((category, ind) =>
                                            <MobileMenu key={ind} category={category}/>
                                        )
                                    }
                                    {<li>
                                        <a className="a">Home</a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="index.html">Homepage_v1</a>
                                            </li>
                                        </ul>
                                    </li>}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                
                <div className="sidebar">
                    <div className="sidebar__body ">
                        <div className="sidebar__heading">
                            <div className="logo">
                                <img src={logo_02} alt="Lyrae"/>
                            </div>
                            <span className="sidebar__close">
                                <img src={close_gray} alt="Close"/>
                            </span>
                        </div>
                        <div className="sidebar__content">
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking
                                at its layout.</p>
                            
                            <div className="sidebar__image my-51">
                                <div className="slick-item">
                                    <img src={resume_01} alt="Image1"/>
                                </div>
                                <div className="slick-item">
                                    <img src={resume_02} alt="Image2"/>
                                </div>
                                <div className="slick-item">
                                    <img src={resume_03} alt="Image3"/>
                                </div>
                            </div>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority.</p>
                            <div className="title-border mx-auto m-t-27 m-b-33"></div>
                            <nav className="social-media style-2">
                                <ul>
                                    <li>
                                        <a className="a facebook"> </a>
                                    </li>
                                    <li>
                                        <a className="a twitter"> </a>
                                    </li>
                                    <li>
                                        <a className="a linkedin"> </a>
                                    </li>
                                    <li>
                                        <a className="a google-plus"> </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart_items : state.cart.cart_items,
        loginstate: state.auth.loginstate,
        user_id: state.auth.user_id,
        user_token: state.auth.user_token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        search : (e) => dispatch(search(e)),
        addcartkey : (e) => dispatch(cartkey(e)),
        cartTo : (e) => dispatch(cartTo(e)),
        logout: (e) => dispatch(logout(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (translate("translations")(Header));