import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";

import {Loader1} from '../../components/Loader/index.jsx';
import Product from '../../components/Product';
import { cartTo } from '../../actions/cart_item'
import { cartkey } from '../../actions/cartkey'
import './productdetails.css'

import page03 from '../../images/bg-page_03.jpg';

export class ListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productdetails: false,
            related: [],
            reviews: false,
            id: false,
            optionId: 1,
            rating:0
        };
    }
    reviewSubmit (event) {
        if(this.props.loginstate && this.refs.message.value !== '' && this.refs.name.value !== '' && this.refs.email.value !='')
        {
            var date = new Date().toDateString();
            fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/auth/products/'+this.state.productdetails.id+'/reviews', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Accept':	'application/json'
                },
                body: JSON.stringify({
                    customerId: this.props.user_id, 
                    date: date,
                    description:this.refs.message.value,
                    language:"en",
                    productId: this.state.productdetails.id, 
                    rating:this.state.rating
                })
            })
            .then(result=>result.json())
            .then(result=>console.log(result))
            .catch((error) => {
                console.log(error)
              })
        }
        else alert("Please signin for writing a new review");
    }
    handleOnclick (event) {
        if(!this.props.cartkey){
            var quantity = this.refs.quantity.value;
            fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributes: [
                        {
                            id: this.state.optionId
                        }
                    ],
                    product: this.state.productdetails.id,
                    quantity: quantity
                })
            })
                .then(result=>result.json())
                .then(cart=>{ this.props.addcartkey(cart.code); this.props.cartTo(cart)})
        }
        else {
            var quantity = this.refs.quantity.value;
            // this.props.cart_items.products.forEach((product) => {
            //     if(product.id === this.state.id) quantity = product.quantity+this.refs.quantity.value
            // })
            fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey, {
                method: 'put',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attributes: [
                        {
                            id: this.state.optionId
                        }
                    ],
                    product: this.state.productdetails.id,
                    quantity: quantity
                })
            })
                .then(result=>result.json())
                .then(cart=>{var temp_products = []
                    quantity = 0
                    var price = 0
                    cart.products.forEach((product) =>{
                        var find_flag = false;
                        temp_products.forEach((temp_product) =>{
                            if(product.id === temp_product.id)find_flag = true
                        })
                        if(!find_flag && product.quantity!==0)
                        {
                            temp_products.push(product)
                            quantity += product.quantity
                            price += product.quantity * product.price
                        }
                    })
                    cart.products = temp_products
                    cart.quantity = quantity
                    cart.subtotal = cart.total = price;
                    cart.displaySubTotal = cart.displayTotal = "US$"+cart.subtotal;
                    this.props.cartTo(cart)})
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.setState({id  : parseInt(id)})
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/'+id+'?lang=en')
            .then(result=>result.json())
            .then(productdetails=>{
                this.setState({ productdetails: productdetails })
                document.getElementById("description").innerHTML = productdetails.description.description;
            })
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/'+id+'/reviews')
            .then(result=>result.json())
            .then(reviews=>{
                this.setState({ reviews: reviews })
                if(reviews.length > 0){
                    document.getElementById("review_discription").innerHTML = reviews[0].description+"<br/>"+reviews[0].date;
                    var rating_value = reviews[0].rating;
                    this.setState({rating:rating_value});
                    if(rating_value>=5)
                    {
                        document.getElementById("star-1").defaultChecked = true;
                    }
                    else if(rating_value > 0)
                    {
                        document.getElementById("star-"+parseInt(6-rating_value)).defaultChecked = true;
                    }
                }
                if(this.props.loginstate)
                {
                    for(var i=1;i<6;i++)
                    {
                        document.getElementById("star-"+i).disabled = false;
                    }
                }
            })
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/'+id+'/related')
            .then(result=>result.json())
            .then(related=>this.setState({ related: related }))
            .catch((error) => {
                console.log(error)
              })
    }
    colorSelect(id) {
        const ids = [id];
        this.setState({optionId: id});
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/'+this.state.id+'/variant', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Accept':	'application/json'
            },
            body: JSON.stringify(
                {
                    "options":[
                      {
                        "value":id
                      }
                    ]
                }
            )
        })
            .then(result=>result.json())
            .then(result=>{
                var newArray = this.state.productdetails
                var str = ""
                for (var key in result) {
                    newArray[key] = result[key]
                    str+=key+":"+newArray[key]
                }
                this.setState({productdetails: newArray})
            })
            .catch((error) => {
                console.log(error)
              })
    }

    productcolor(){
        if(this.state.productdetails.options){
            var optionValues = this.state.productdetails.options[0].optionValues
            return(
                <div>
                    {
                        optionValues.map((color, ind)=> 
                            <div className="color" key={ind}>
                                <input type={this.state.productdetails.options[0].type} name="color" onChange={(id)=>this.colorSelect(color.id)} defaultChecked={color.defaultValue}/>
                                <span>{color.name}</span>
                                <span>{color.price? color.price:''}</span>
                            </div>
                        )
                    }
                </div>
            )
        }
    }

    render() {
        console.log(this.state.related)
        var pricestate = false
        if(this.state.productdetails.originalPrice === this.state.productdetails.finalPrice) pricestate = true
        return (
            <div id="productdetails">
                <Loader1/>
                <section>
                    <div className="pageintro">
                        <div className="pageintro-bg">
                            <img src={page03} alt="About Us"/>
                        </div>
                        <div className="pageintro-body">
                            <h1 className="pageintro-title">Shop</h1>
                            <nav className="pageintro-breadcumb">
                                <ul>
                                    <li>
                                        <a className="a">Home</a>
                                    </li>
                                    <li>
                                        <a className="a">Shop</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container p-b-90 p-t-100">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product-detail">
                                    <div className="shop-product p-t-25">
                                        <div className="slide100-01" id="slide100-01">
                                            <div className="main-wrap-pic">
                                                <div className="main-frame">
                                                    <div className="wrap-main-pic">
                                                        <div className="main-pic">
                                                            <img id="productDetailsImg" src={(this.state.productdetails? this.state.productdetails.image.imageUrl:'')} alt="prodetail01"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-body">
                                            <h3 className="name">{(this.state.productdetails? this.state.productdetails.description.name:'')}</h3>
                                            <div className="price">
                                                {
                                                    (pricestate === true?<p className="price">{this.state.productdetails.originalPrice}</p>:
                                                    <div>
                                                        <p className="originalPrice">{this.state.productdetails.originalPrice}</p>
                                                    </div>)
                                                }
                                            </div>
                                            <div className="product-color">
                                                {
                                                    this.productcolor()
                                                }
                                            </div>
                                            <p id="description" className="description"></p>
                                            <div className="product-button">
                                                <div className="quantity">
                                                    <span className="sub">
                                                        <i className="fa fa-angle-down"></i>
                                                    </span>
                                                    <input type="number" ref="quantity" defaultValue="2"/>
                                                    <span className="add">
                                                        <i className="fa fa-angle-up"></i>
                                                    </span>
                                                </div>
                                                <a className="a add-to-cart" onClick={()=>this.handleOnclick()}>Add to cart</a>
                                            </div>
                                            <div className="product-available">
                                                <span>Available :</span>
                                                <a className="a">In stock</a>
                                            </div>
                                            <div className="product-sku">
                                                <span className="text-black">SKU: </span>
                                                {(this.state.productdetails? this.state.productdetails.sku:'')}
                                            </div>
                                            <div className="product-categories">
                                                <span className="text-black">Categories:</span>
                                                {
                                                    (this.state.productdetails?
                                                        this.state.productdetails.categories.map((categorie, ind) =>
                                                            <a className="a" key={ind}>{categorie.description.name}</a>
                                                        )
                                                    :'')
                                                }
                                            </div>
                                            <div className="product-share">
                                                <span className="text-black">Share: </span>
                                                <ul className="social-media style-3">
                                                    <li>
                                                        <a className="a facebook">
                                                            <i className="fa fa-facebook"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="a twiiter">
                                                            <i className="fa fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="a linkedin">
                                                            <i className="fa fa-linkedin"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="a google-plus">
                                                            <i className="fa fa-google-plus"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="product-rating" data-star={(this.state.productdetails? this.state.productdetails.rating:0)}></div>
                                        </div>
                                    </div>
                                    <div className="au-tabs">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a data-toggle="tab" href="#description-tab" className="active show">Description</a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#additional-tab">additional information </a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#review-tab">review (0)</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="description-tab" className="tab-pane active">
                                                <p id="description_new"></p>
                                            </div>
                                            <div id="additional-tab" className="tab-pane">
                                                <table className="product-additionnal">
                                                    <tbody>
                                                        <tr>
                                                            <th>Weight</th>
                                                            <td>{(this.state.productdetails? this.state.productdetails.productWeight:0)} pounds</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Dimensions</th>
                                                            <td><span>{(this.state.productdetails? this.state.productdetails.productLength:0)} inches </span> 
                                                                <span>{(this.state.productdetails? this.state.productdetails.productWidth:0)} inches </span>
                                                                <span>{(this.state.productdetails? this.state.productdetails.productHeight:0)} inches</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="review-tab" className="tab-pane">
                                                <h5 className="title">REVIEWS</h5>
                                                <p id="review_discription"></p>
                                                <p className="text-bigger">Be the first to review “Cloud Wall Clock”</p>
                                                <div className="comment-rating">
                                                    <strong>Your Rating </strong>
                                                    <div className="au-rating">
                                                        <form>
                                                            <input id="star-1" type="radio" name="star"  disabled={true} />
                                                            <label htmlFor="star-1" onClick={() => {this.setState({rating:5})}}></label>
                                                            <input id="star-2" type="radio" name="star"  disabled={true} />
                                                            <label htmlFor="star-2" onClick={() => {this.setState({rating:4})}}></label>
                                                            <input id="star-3" type="radio" name="star" disabled={true} />
                                                            <label htmlFor="star-3" onClick={() => {this.setState({rating:3})}}></label>
                                                            <input id="star-4" type="radio" name="star" disabled={true} />
                                                            <label htmlFor="star-4" onClick={() => {this.setState({rating:2})}}></label>
                                                            <input id="star-5" type="radio" name="star" disabled={true} />
                                                            <label htmlFor="star-5" onClick={() => {this.setState({rating:1})}}></label>
                                                        </form>
                                                    </div>

                                                </div>
                                                <div className="comment-place">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <textarea cols="30" rows="7" placeholder="Your Message" ref="message" required data-error="Message is required."></textarea>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <input type="text" placeholder="Your Name" ref="name" required data-error="Name is required."/>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <input type="email" placeholder="Your Email" ref="email" required data-error="Email is required."/>
                                                            </div>
                                                            <div className="col-md-12 m-t-40">
                                                                <button onClick={()=>this.reviewSubmit()} type="button" className="btn btn-black text-uppercase btn-small">Submit</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="port-title justify-content-center text-center">
                                        <h2 className="title">related products</h2>
                                        <div className="title-border mx-auto m-b-70"></div>
                                    </div>
                                    <div className="related-products">
                                        <div className="owl-carousel row" data-layout="fitRows">
                                            <div className="col-md-12">
                                                {
                                                    this.state.related.map((product) =>
                                                        <Product key={product.id} product={product}/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const keyStateToProps = (state) => {
    return {
        cartkey : state.cartkey.cartkey,
        cart_items : state.cart.cart_items,
        showtype : state.show.showtype,
        loginstate : state.auth.loginstate,
        user_id : state.auth.user_id
    }
}

const keyDispatchToProps = (dispatch) => {
    return {
        addcartkey : (e) => dispatch(cartkey(e)),
        cartTo : (e) => dispatch(cartTo(e))
    }
}

export default connect(keyStateToProps, keyDispatchToProps) (ListingPage);