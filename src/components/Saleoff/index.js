import React, { Component } from 'react';

export class Saleoff extends Component {

	constructor() {
        super();
        this.state = {
            banner:false,
        };
    }

	componentDidMount() {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/content/pages')
            .then(result=>result.json())
            .then(banner=>this.setState({banner}))
    }

    render() {
    	if(this.state.banner){
    		document.getElementById("banner").innerHTML = this.state.banner[0].pageContent;
    	}
        return (
            <section className="p-t-100 p-b-62 ">
		        <div className="container">
		            <div className="row au-row">
		                {/*<div className="col-md-6">
		                    <div className="au-banner style-9 js-au-banner" data-height="533" data-image={image_10}>
		                        <a href="#" className="banner-image"></a>
		                        <div className="banner-content">
		                            <h3 className="title">
		                                today only <span>20</span>
		                            </h3>
		                        </div>
		                    </div>
		                </div>
		                <div className="col-md-6">
		                    <div className="au-banner style-7 banner-medium js-au-banner" data-height="245" data-image={image_08}>
		                        <a href="#"></a>
		                        <div className="banner-content text-right">
		                            <h3 className="title">Gold Leaf</h3>
		                            <h4 className="sub-title">Colourful is the new black</h4>
		                            <a href="#" className="banner-btn">shop now</a>
		                        </div>
		                    </div>
		                    <div className="au-banner style-8 banner-medium js-au-banner " data-height="245" data-image={image_09}>
		                        <a href="#"></a>
		                        <div className="banner-content">
		                            <h3 className="title">Wall Clock</h3>
		                            <h4 className="sub-title">Light Shades Inspired by Origami</h4>
		                            <a href="#" className="banner-btn">shop now</a>
		                        </div>
		                    </div>
		                </div>*/}
		                <div id="banner">
		                </div>
		            </div>
		        </div>
		    </section>
        )
    }
}

export default Saleoff;