import React, { Component } from 'react';

export class Content extends Component {

	constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div className="project">
                <div className="project-image">
                    <a href="#">
                        <img src='' alt="Project 1"/>
                    </a>
                </div>
                <div className="project-body">
                    <p className="date">
                        <span className="day">12</span>
                        <span className="month">June</span>
                    </p>
                    <a href="#" className="name">Classically Stylish</a>
                    <p className="resume">At vero eos et accusamus et iusto odio dignissimos ducimusn.</p>
                    <a href="#">Read more</a>
                </div>
            </div>
        )
    }
}
export default Content