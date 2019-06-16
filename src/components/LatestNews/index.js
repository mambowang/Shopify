import React, { Component } from 'react';
import './latest_new.css';

export class LatestNews extends Component {

	constructor(props) {
        super(props);
        this.state = {
            contents: false
        }
    }

    componentDidMount() {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/content/summary')
            .then(result=>result.json())
            .then(contents=>{
            	this.setState({contents});
            	document.getElementById("contentbox0").innerHTML = contents[0].boxContent;
        		document.getElementById("contentbox1").innerHTML = contents[1].boxContent;
            })
    }
	handleClick()
	{
		if(this.refs.email.value !== ''){
			fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/newsletter', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
					'Accept':	'application/json'
				},
				body: JSON.stringify({
					email:this.refs.email.value,
					firstName:this.refs.email.value
				})
			})
				.then(result => {
					if(result.status === 200){
						return result.json()
					}})
				.catch((error) => {
					console.log(error)
				})
			}
	}
    render() {
    	return (
	        <div>
	        	<section className="p-t-100 p-b-80">
			        <div className="container">
			            <div className="row justify-content-center">
			                <div className="col-md-8">
			                    <div className="port-title text-center py-10">
			                        <h2 className="title">Latest News</h2>
			                        <p className="title-detail">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
			                            born and I will give you a complete account.</p>
			                        <div className="title-border mx-auto"></div>
			                    </div>
			                </div>
			            </div>
			            <div className="row m-t-40 py-20">
			                <div className="owl-carousel" data-loop="true" data-responsive='{"0":{"items":"1"},"768":{"items":"1"}, "992":{"items":"2"} }'>
			                    <div className="project">
					                <div className="project-image">
					                    <a className="a">
					                        <img src={this.state.contents? this.state.contents[0].image:''} alt="Project 1"/>
					                    </a>
					                </div>
					                <div className="project-body">
					                    {/*<p className="date">
					                        <span className="day">12</span>
					                        <span className="month">June</span>
					                    </p>*/}
					                    <a className="a name">{this.state.contents? this.state.contents[0].name:''}</a>
					                    <div id="contentbox0"></div>
					                </div>
					            </div>
					            <div className="project">
					                <div className="project-image">
					                    <a className="a">
					                        <img src={this.state.contents? this.state.contents[1].image:''} alt="Project 1"/>
					                    </a>
					                </div>
					                <div className="project-body">
					                    {/*<p className="date">
					                        <span className="day">12</span>
					                        <span className="month">June</span>
					                    </p>*/}
					                    <a className="a name">{this.state.contents? this.state.contents[1].name:''}</a>
					                    <div id="contentbox1"></div>
					                </div>
					            </div>
			                </div>
			            </div>
			        </div>
			    </section>

			    <section className="py-70 bg-signup">
			        <div className="container">
			            <div className="row justify-content-end">
			                <div className="col-lg-6 col-md-8 col-sm-12">
			                    <div className="port-title m-t-41">
			                        <h2 className="title wow slideInRight" data-wow-duration="1s">SIGN UP FOR NEWSLETTER</h2>
			                        <p className="description wow slideInUp" data-wow-duration="1s">But I must expl’ain to you how all this mistaken idea of denouncing pleasure and praising pain was
			                            born and I will give.</p>
			                        <div className="title-border"></div>
			                    </div>
			                    <div className="signup-form">
			                        <form>
			                            <input type="text" placeholder="Your email address" ref="email" id="email"/>
			                            <button type="button" onClick={()=>this.handleClick()}>Submit</button>
			                        </form>
			                    </div>

			                </div>
			            </div>
			        </div>
			    </section>
			</div>
        )
    }
}

export default LatestNews ;