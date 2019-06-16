import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";

import {Loader1} from '../../components/Loader/index.jsx';
import { changeshowlist } from '../../actions/changeshowlist'
import ShopList from '../../components/ShopList';
import './listingpage.css'

import page03 from '../../images/bg-page_03.jpg';

export class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      shoplist: {products:[]},
      category: [],
      selected: null,
      priceFilter: {lower:0,upper:500}
    };
  }
 componentWillReceiveProps(nextProps) {
  if (parseInt(nextProps.id, 10) !== parseInt(this.props.id, 10)) {
    this.setState({selected  : parseInt(nextProps.match.params.id)})
    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products?lang=en&category='+nextProps.match.params.id+'&start=0&count=3')
      .then(result=>result.json())
      .then(shoplist=>this.setState({ shoplist: shoplist }))
  }
 }
  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({selected  : parseInt(id)})
    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/category?filter=FEATURED')
      .then(result=>result.json())
      .then(category=>this.setState({category}))
    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products?lang=en&category='+id+'&start=0&count=3')
      .then(result=>result.json())
      .then(shoplist=>this.setState({ shoplist: shoplist }))
    this.setState({loaded: true})
  }

  isActive (value){
    return 'a '+((value===this.state.selected) ?'active':'default');
  }

  priceFilter() {
    var lower = this.refs.price_lower.innerHTML;
    var upper = this.refs.price_upper.innerHTML;

    const newFilter = Object.assign({}, this.state.priceFilter)
    newFilter.lower = parseFloat(lower.replace("$",""));
    newFilter.upper = parseFloat(upper.replace("$",""));
    // const newFilter = this.state.category.slice(0)
    this.setState({ priceFilter: newFilter })
  }

  countCategory = (category_id) => {
    let count = 0;
    this.state.shoplist.products.forEach((product)=> {
      if(product.categories){
        product.categories.forEach((productCategory)=> {
          if(productCategory.id === category_id && product.price >= this.state.priceFilter.lower && product.price <= this.state.priceFilter.upper) count++
        })
      }
    })
    return count;
  }

  renderItem (children, ind){
    return (
      <li key={ind}>
        <a className="a">{children.description.name}</a>
        <span className="number">{this.countCategory(children.id)}</span>
      </li>
    )
  }
  loadMore(){
    fetch('http://ec2-35-183-25-66.ca-central-1.compute.amazonaws.com:8080/api/v1/products?lang=en&category='+this.props.match.params.id+'&start='+this.state.shoplist.products.length+'&count=3')
      .then(result=>result.json())
      .then(shoplist=>{
        const tracks = this.state.shoplist
        shoplist.products.map((track)=>{
          tracks.products.push(track)
        })
        this.setState({shoplist: tracks})
      })
  }

  render() {
    if(this.state.loaded){
      var categoryChildrens = []
      this.state.category.forEach((category) => {
        if(category.id === this.state.selected){
          categoryChildrens = category.children
        }
      })
      return (
        <div id="listingpage">
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
                        <Link to={"/productdetails"}>Home</Link>
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
              <div className="container p-t-100 p-b-70">
                <div className="row">
                  <div className="col-md-9">
                    <div className="shop-list">
                      <div className="shop-list-heading">
                      </div>
                      <InfiniteScroll
                        dataLength={this.state.shoplist.products.length}
                        next={()=>this.loadMore()}
                        hasMore={true}
                      >
                        <div className="shop-list-body shop-grid">
                          {
                            this.state.shoplist.products.map((list, ind) =>
                              <ShopList key={ind} list={list} priceFilter={this.state.priceFilter}/>
                            )
                          }
                        </div>
                      </InfiniteScroll>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="page-sidebar">

                      <div className="page-sidebar-item">
                        <div className="sidebar-item__heading">
                          <h3 className="title">filter by price</h3>
                          <div className="title-border m-b-30"></div>
                        </div>
                        <div className="sidebar-item__body m-b-8">
                          <div className="sidebar-filter-price">
                            <div id="filter-price"></div>
                            <div className="filter-range">
                              <div className="filter-range-value">
                                Filter:
                                <span id="filter-price-value-lower" ref="price_lower">$100</span>
                                <span> - </span>
                                <span id="filter-price-value-upper" ref="price_upper">$500</span>
                              </div>
                              <div className="filter-button">
                                <a className="a" onClick={()=>this.priceFilter()}>Filter</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="page-sidebar-item">
                        <div className="sidebar-item__heading">
                          <h3 className="title">categories</h3>
                          <div className="title-border m-b-24"></div>
                        </div>
                        <div className="sidebar-item__body">
                          <ul className="sidebar-list">
                            {
                              categoryChildrens.map((children, ind) => this.renderItem(children, ind))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="page-sidebar-item">
                        <div className="sidebar-item__heading">
                          <h3 className="title">Collection</h3>
                          <div className="title-border m-b-24"></div>
                        </div>
                        <div className="sidebar-item__body">
                          <ul className="sidebar-list">
                            <li>{(this.state.shoplist.totalCount? this.state.shoplist.products[0].manufacturer.description.name:'')}</li>
                          </ul>
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
    else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
  
  }
}
const showDispatchToProps = (dispatch) => {
  return {
    // showtype: bindActionCreators(changeshowlist, dispatch)
    showtype : (e) => dispatch(changeshowlist(e)),
    // sdf: ()=> {console.log(dispatch)}
  }
}

export default connect(mapStateToProps, showDispatchToProps) (ListingPage);