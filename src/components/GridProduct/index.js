import React, { Component } from 'react';
import { connect } from 'react-redux';
import './grid.css';

import Product from '../Product';
import { search } from '../../actions/search'
import { cartTo } from '../../actions/cart_item'
import { cartkey } from '../../actions/cartkey'
import { api } from '../../actions/api'

export class GridProduct extends Component {

	constructor(props) {
        super(props);
        this.state = {
            category: [],
            cartid: false
        };
    }

	componentDidMount() {
		if(!this.props.cartkey){
	        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products/group/FEATURED_ITEM')
	            .then(result=>result.json())
	        	.then(products=>{
	        		this.props.search(products)
	        		products.products.forEach((product) => {
	        			if(product.canBePurchased){
	        				this.setState({cartid: product.id})
	        			}
	        		})
	        		if(this.state.cartid){
	        			fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart', {
							    method: 'post',
							    headers: {
							        'Accept': 'application/json',
							        'Content-Type': 'application/json',
							    },
							    body: JSON.stringify({
							        product: this.state.cartid,
							        quantity: 1
							    })
							})
								.then(result=>result.json())
					            .then(cart=>{ this.props.addcartkey(cart.code); this.props.cartToitem(cart)})
	        		}
	        	})
		}
        fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/category?filter=FEATURED')
            .then(result=>result.json())
            .then(category=>this.setState({category}))
    }

    render() {
  //   	if(this.props.products && this.props.cartkey && !this.props.apiroad){
	 //    	this.props.products.products.forEach((product) => {
		// 		if(product.canBePurchased && product.id !== this.state.cartid){
		// 			console.log(product)
		// 			this.props.api();
		// 			fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/cart/'+this.props.cartkey, {
		// 			    method: 'put',
		// 			    headers: {
		// 			        'content-Type': 'application/json',
		// 			    },
		// 			    body: JSON.stringify({
		// 			        product: product.id,
		// 			        quantity: 1
		// 			    })
		// 			})
		// 				.then(result=>result.json())
		// 	            .then(cart=>this.props.cartToitem(cart))
		// 		}
		// 	})
		// }
    	var products = []
    	if(this.props.products){
    		products = this.props.products.products;
    	}
        return (
        	<section className="py-50">
		        <div className="port-title">
		            <div className="container">
		                <div className="row justify-content-center">
		                    <div className="col-md-8 text-center">
		                        <h2 className="title">our products</h2>
		                        <p className="title-detail">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
		                            born and I will give you a complete account.</p>
		                        <div className="title-border mx-auto m-b-35"></div>
		                    </div>
		                </div>
		            </div>
		        </div>
		        <div className="port-body">
		            <div className="container">
		                <div className="grid">
		                    <div className="grid-filter">
		                        <ul className="text-center">
		                            <li className="active category">
		                                <span data-filter="*">All</span>
		                            </li>
		                            {
		                            	this.state.category.map((category, ind) =>
                                            <li key={ind} className="category">
				                                <span data-filter={"."+category.code}>{category.description.name}</span>
				                                {
				                                	(category.children.length > 0 ?
								                        <ul className="category-list">
								                            {
								                                category.children.map((children, ind) =>
								                                    <li key={ind}>
								                                    	<span data-filter={"."+children.code}>{children.description.name}</span>
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
		                        </ul>
		                    </div>
		                    <div className="grid-body row" data-layout="fitRows">
	                        	{
	                        		products.map((product) =>
	                        			<Product key={product.id} product={product} cartid={this.state.cartid}/>
	                        		)
	                        	}
		                    </div>
		                </div>
		            </div>
		        </div>
		    </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.search.searchresult,
        cartkey : state.cartkey.cartkey,
        apiroad : state.api.apiroad,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search : (e) => dispatch(search(e)),
        addcartkey : (e) => dispatch(cartkey(e)),
        cartToitem : (e) => dispatch(cartTo(e)),
        api : () => dispatch(api)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridProduct);