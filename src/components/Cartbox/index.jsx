import React, { Component } from 'react';
import {connect} from "react-redux";

import { cartTo, removeInCart } from '../../actions/cart_item'
import { cartkey, removeCartkey } from '../../actions/cartkey'

import './cartbox.css'

export class Cartbox extends Component {

    handleOnclick () {
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: this.props.cart.id,
                quantity: 0
            })
        })
            .then(result=>{
                const status = result.status
                if(status === 201){
                    if(this.props.cart_items.products.length <= 1){
                        this.props.removeKey()
                    }
                    this.props.remove(this.props.cart.id)
                }
            })
            // .then(cart=>this.props.cartTo(cart))
    }

    render() {
        return (
        	<li className="item">
                <div className="item-image">
                    <img src={this.props.cart.image.imageUrl} alt="Item1"/>
                </div>
                <div className="item-detail">
                    <p className="name">{this.props.cart.description.name}</p>
                    <p className="price">$ {this.props.cart.price}</p>
                    <p className="amount">x{this.props.cart.quantity}</p>
                </div>
                <span className="remove" onClick={()=>this.handleOnclick()}></span>
            </li>
        )
    }
}

const keyStateToProps = (state) => {
    return {
        cartkey : state.cartkey.cartkey,
        cart_items : state.cart.cart_items
    }
}

const keyDispatchToProps = (dispatch) => {
    return {
        addcartkey : (e) => dispatch(cartkey(e)),
        cartTo : (e) => dispatch(cartTo(e)),
        remove: (e) => dispatch(removeInCart(e)),
        removeKey: () => dispatch(removeCartkey())
    }
}

export default connect(keyStateToProps, keyDispatchToProps)(Cartbox);