import React, { Component } from 'react';
import {connect} from "react-redux";
import {translate} from 'react-i18next';
import { Link } from 'react-router-dom'

import './menu.css';

export class Menu extends Component {

    render() {
        const { t } = this.props;
        return (
        	<li className="menu" onClick={this.props.clickFnction}>
                <Link to={"/listing/"+this.props.category.id} className={`a ${this.props.selected === this.props.category.id? 'active':''}`}>{t(this.props.category.code)}</Link>
                {
                    (this.props.category.children.length > 0 ?
                        <ul className="sub-menu">
                            {
                                this.props.category.children.map((children, ind) =>
                                    <li key={ind} style={{overflow:"hidden"}}>
                                        <Link to={"/listing/"+children.id} className={`a ${this.props.selected === children.id? 'active':''}`}>{t(children.code : '')}</Link>
                                    </li>
                                )
                            }
                        </ul>
                        : ''
                    )
                }
            </li>
        )
    }
}

export default connect()(translate("translations")(Menu));