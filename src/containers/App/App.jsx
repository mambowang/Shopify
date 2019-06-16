import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '../../components/Loader/index.jsx';
import Header from '../../components/Header/index.jsx';
import Footer from '../../components/Footer';
import LandingPage from '../LandingPage/Loadable';
import ListingPage from '../ListingPage/Loadable';
import ProductdetailsPage from '../ProductdetailsPage/Loadable';
import ContactusPage from '../ContactusPage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import Forgotpass from '../Forgotpass/Loadable';
import Checkout from '../CheckoutPage/Loadable';
import Shoppingcart from '../ShoppingcartPage/Loadable';

import totop from '../../images/icon/to_top.png';

class App extends Component {

    render() {
        return (
            <div>
                <Loader/>
                <Header/>
                <Switch>
                    <Route path="/landing" component={LandingPage} />
                    <Route path="/listing/:id" component={ListingPage} />
                    <Route path="/productdetails/:id" component={ProductdetailsPage} />
                    <Route path="/contactus" component={ContactusPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/forgotpass" component={Forgotpass} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/shoppingcart" component={Shoppingcart} />
                </Switch>
                <Footer/>
                <div className="to-top">
                    <span className="bounce">
                        <img src={totop} alt="To top"/>
                    </span>
                </div>
            </div>
        );
    }
}

export default App;