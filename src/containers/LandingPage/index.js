import React, { Component } from 'react';

import {Loader1} from '../../components/Loader/index.jsx';
import SliderSection from '../../components/Slider/index.jsx';
import Saleoff from '../../components/Saleoff';
import GridProduct from '../../components/GridProduct';
import LatestNews from '../../components/LatestNews';

export class LandingPage extends Component {

    render() {
        return (
            <div id="landing">
                <Loader1/>
                <SliderSection/>
                <Saleoff/>
                <GridProduct/>
                <LatestNews/>
            </div>
        )
    }
}

export default LandingPage;