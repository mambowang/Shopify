import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cartTo } from '../../actions/cart_item'
import { cartkey } from '../../actions/cartkey'
import './product.css';

export class Product extends Component {

	handleOnclick (event) {
        if(!this.props.cartkey){
	        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart', {
			    method: 'post',
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json',
			    },
			    body: JSON.stringify({
			        product: this.props.product.id,
			        quantity: 1
			    })
			})
				.then(result=>result.json())
	            .then(cart=>{ this.props.addcartkey(cart.code); this.props.cartTo(cart)})
	    }
	    else {
	    	var quantity = 1;
	    	this.props.cart_items.products.forEach((product) => {
	    		if(product.id === this.props.product.id) quantity = product.quantity+1
	    	})
	    	fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey, {
			    method: 'put',
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json',
			    },
			    body: JSON.stringify({
			        product: this.props.product.id,
			        quantity: quantity
			    })
			})
				.then(result=>result.json())
	            .then(cart=>{
					var temp_products = []
					quantity = 0
					cart.products.forEach((product) =>{
						var find_flag = false;
						temp_products.forEach((temp_product) =>{
							if(product.id === temp_product.id)find_flag = true
						})
						if(!find_flag)
						{
							temp_products.push(product)
							quantity += product.quantity
						}
					})
					cart.products = temp_products
					cart.quantity = quantity
					this.props.cartTo(cart)})
	    }
    }

    // componentDidMount() {
    //     if(this.props.product.canBePurchased && this.props.cartkey){
		  //   if(this.props.cartid !== this.props.product.id){
		  //   	console.log("123");
		  //   	var quantity = 1;
		  //   	this.props.cart_items.products.forEach((product) => {
		  //   		if(product.id === this.props.product.id) quantity = product.quantity+1
		  //   	})
		  //   	fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey, {
				//     method: 'post',
				//     headers: {
				//         'Accept': 'application/json',
				//         'Content-Type': 'application/json',
				//     },
				//     body: JSON.stringify({
				//         product: this.props.product.id,
				//         quantity: quantity
				//     })
				// })
				// 	.then(result=>result.json())
		  //           .then(cart=>this.props.cartTo(cart))
		  //   }
    //     }
    // }

    render() {
    	var cartegory = "";
    	var pricestate = false
    	if(this.props.product.categories) cartegory = this.props.product.categories[0].code
    	if(this.props.product.originalPrice === this.props.product.finalPrice) pricestate = true
        return (
        	<div className={"col-lg-3 col-md-4 col-sm-6 grid-item "+cartegory}>
	            <div className="grid-product">
	                <div className="image bg-lightblue">
	                    <a className="a">
	                        <img className="productimg" src={this.props.product.image.imageUrl} alt="Chair"/>
	                    </a>
	                </div>
	                <a className="a name">{this.props.product.description.name}</a>
	                <div className="price">
	                	{
	                		(pricestate === true?<p className="price">{this.props.product.originalPrice}</p>:
		                	<div>
		                		<p className="originalPrice">{this.props.product.originalPrice}</p>
		                		<p className="finalPrice">{this.props.product.finalPrice}</p>
		                	</div>)
		                }
	                </div>
	                <div className="addcart">
	                	<div onClick={()=>this.handleOnclick()}>
				            <p>Add to cart</p>
				        </div>
	                </div>
	            </div>
	        </div>
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
    }
}

export default connect(keyStateToProps, keyDispatchToProps) (Product);