import React, { Component } from 'react';
import './slider.css';

import slide_01 from '../../images/slide_01.jpg';
import slide_02 from '../../images/slide_02.jpg';
import slide_03 from '../../images/slide_03.jpg';

class SliderSection extends Component {

    componentDidMount() {
    }

    render () {
        return (
            <section id="slider-section">
		        <div className="rev_slider_wrapper fullscreen-container">
		            <div className="rev-slider fullscreenbanner" id="slide-1" data-version="5.0">
		                <ul>
		                    <li data-transition="fade">
		                        <img src={slide_01} alt="Slide 1" className="rev-slidebg"/>
		                        <div className="tp-caption slider-heading-1" data-x="left" data-y="center" data-transform_in="y:-80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="y:-80px;opacity:0;s:300;" data-voffset="[-35,-35,-75,-70]" data-fontsize="['70','60','55','42']"
		                            data-hoffset="['60','100','50','20']" data-start="900">
		                            winter scene
		                        </div>
		                        <div className="tp-caption slider-heading-2" data-x="left" data-y="center" data-transform_in="x:80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="x:80px;opacity:0;s:300;" data-whitespace="normal" data-width="['900','900','900','700','520'"
		                            data-voffset="[45,45,10,10,-15,-10]" data-fontsize="['25','25','25','21']" data-hoffset="['60','100','50','20']"
		                            data-start="1100">
		                            For only $ 40 you can own beautiful prints
		                        </div>
		                        <div className="tp-caption" data-x="left" data-y="center" data-transform_in="y:80px;opacity:0;s:800;e:easeInOutCubic;" data-transform_out="y:80px;opacity:0;s:300;"
		                            data-voffset="[160,160,105,105,65,70]" data-hoffset="['60','100','50','20']" data-start="1100">
		                            <a className="a btn btn-color text-uppercase">Shop now</a>
		                        </div>
		                    </li>
							
		                    <li data-transition="fade">
		                        <img src={slide_02} alt="Slide 2" className="rev-slidebg"/>
		                        <div className="tp-caption slider-heading-1 text-black" data-x="center" data-y="center" data-transform_in="y:-80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="y:-80px;opacity:0;s:300;" data-voffset="-120" data-fontsize="['70','60','50','36']"
		                            data-start="900">
		                            Painting living room
		                        </div>
		                        <div className="tp-caption slider-heading-2 text-black font-weight-light" data-x="center" data-y="center" data-transform_in="x:80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="x:80px;opacity:0;s:300;" data-voffset="-40" data-fontsize="['25','25','25','20']"
		                            data-start="1100">
		                            There are many variations of passages of Lorem.
		                        </div>
		                        <div className="tp-caption text-center" data-x="center" data-y="center" data-transform_in="y:80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="y:80px;opacity:0;s:300;" data-voffset="75" data-start="1100">
		                            <a className="a btn btn-color text-uppercase">Shop now</a>
		                        </div>
		                    </li>
		                    <li data-transition="fade">
		                        <img src={slide_03} alt="Slide 3" className="rev-slidebg"/>
		                        <div className="tp-caption slider-heading-1 text-black" data-x="left" data-y="center" data-transform_in="y:-80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="y:-80px;opacity:0;s:300;" data-voffset="[-35,-35,-75,-70]" data-fontsize="['70','60','55','42']"
		                            data-hoffset="['60','100','50','20']" data-start="900">
		                            Office decor
		                        </div>
		                        <div className="tp-caption slider-heading-2 text-black" data-x="left" data-y="center" data-transform_in="x:80px;opacity:0;s:800;e:easeInOutCubic;"
		                            data-transform_out="x:80px;opacity:0;s:300;" data-whitespace="normal" data-width="['900','900','900','700','520','310']"
		                            data-voffset="[45,45,10,10,-15,-10]" data-fontsize="['25','25','25','21']" data-hoffset="['60','100','50','20']"
		                            data-start="1100">
		                            Excepteur sint occaecat cupidatat
		                        </div>
		                        <div className="tp-caption" data-x="left" data-y="center" data-transform_in="y:80px;opacity:0;s:800;e:easeInOutCubic;" data-transform_out="y:80px;opacity:0;s:300;"
		                            data-hoffset="['60','100','50','20']" data-voffset="[160,160,105,105,65,70]" data-start="1100">
		                            <a className="a btn btn-color text-uppercase">Shop now</a>
		                        </div>
		                    </li>
		                </ul>
		            </div>
		        </div>
		    </section>
        );
    }
}

export default SliderSection;