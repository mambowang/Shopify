import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import {Loader1} from '../../components/Loader/index.jsx';
import { cartTo, removeInCart } from '../../actions/cart_item'
import { cartkey, removeCartkey } from '../../actions/cartkey'

import './shoppingcart.css'
import bgpage01 from '../../images/bg-page_01.jpg';
import close from '../../images/icon/close.png';

class Cartbox extends Component {

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

    render(){
        return (
            <tr>
                <td>
                    <div className="table-shop-product">
                        <div className="image">
                            <img className="item-image" src={this.props.cart.image.imageUrl} alt="Product 1"/>
                        </div>
                        <div className="name">{this.props.cart.description.name}</div>
                    </div>
                </td>
                <td>
                    ${this.props.cart.price}
                </td>
                <td>
                    <div className="quantity">
                        <span className="sub">
                            <i className="fa fa-angle-down"></i>
                        </span>
                        <input type="number" defaultValue={this.props.cart.quantity}/>
                        <span className="add">
                            <i className="fa fa-angle-up"></i>
                        </span>
                    </div>
                </td>
                <td>
                    {this.props.cart.displaySubTotal}
                </td>
                <td>
                    <a className="a">
                        <img className="close" src={close} alt="Close" onClick={()=>this.handleOnclick()}/>
                    </a>
                </td>
            </tr>
        )
    }
}

class Shoppingcart extends Component {

    render() {
        const carts = this.props.cart_items;
        return (
            <div id="shoppingcart">
                <Loader1/>
                <section>
                    <div className="pageintro">
                        <div className="pageintro-bg">
                            <img src={bgpage01} alt="About Us"/>
                        </div>
                        <div className="pageintro-body">
                            <h1 className="pageintro-title">SHOP CART</h1>
                            <nav className="pageintro-breadcumb">
                                <ul>
                                    <li>
                                        <a className="a">Home</a>
                                    </li>
                                    <li>
                                        <a className="a">SHOP CART</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container p-t-100 p-b-30 py-tn-30">
                        <div className="row m-t-20">
                            <div className="col-md-12">
                                <table className="table-shop">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="asdf">
                                        {
                                            carts.products.map((cart, ind) =>
                                                <Cartbox key={ind} cart={cart}/>
                                            )
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="5">
                                                <div className="table-button">
                                                    <a className="a">clear Shopping Cart</a>
                                                    <a className="a">update shopping cart </a>
                                                    <Link to={"/checkout"} className="a">continue shopping</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container p-b-100">
                        <div className="row">
                            <div className="col-md-6 p-r-lg--30 p-r-xl-30 m-t-30">
                                <div className="shop-total">
                                    <div className="shop-total-heading">
                                        <h3 className="title">Cupond Code</h3>
                                        <div className="title-border-3 m-b-30"></div>
                                    </div>
                                    <div className="shop-total-body">
                                        <p>Enter your coupon code if you have one.</p>
                                        <form>
                                            <div className="form-group au-form m-b-40">
                                                <input type="text" placeholder="Coupon code"/>
                                            </div>
                                            <div className="form-group au-form m-b-0">
                                                <button type="submit">Apply coupon</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-l-lg-30 p-l-xl-30 m-t-30">
                                <div className="shop-total">
                                    <div className="shop-total-heading">
                                        <h3 className="title">cart total</h3>
                                        <div className="title-border-3 m-b-30"></div>
                                    </div>
                                    <div className="shop-total-body">
                                        <p className="sub-total">Subtotal
                                            <span>$515.00</span>
                                        </p>
                                        <p className="total">Grandtotal
                                            <span>$515.00</span>
                                        </p>
                                        <form>
                                            <div className="form-group au-form m-b-0">
                                                <button type="submit">Apply coupon</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart_items : state.cart.cart_items,
        cartkey : state.cartkey.cartkey
    };
}

const keyDispatchToProps = (dispatch) => {
    return {
        addcartkey : (e) => dispatch(cartkey(e)),
        cartTo : (e) => dispatch(cartTo(e)),
        remove: (e) => dispatch(removeInCart(e)),
        removeKey: () => dispatch(removeCartkey())
    }
}

export default connect(mapStateToProps,keyDispatchToProps) (Shoppingcart);