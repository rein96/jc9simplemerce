import React from 'react';
import axios from 'axios';
import ProductItem from './ProductItem'


class Home extends React.Component {

    state = {
        products: [],       // yang di filter
        searchProducts: []  // product lengkap
    }

    componentDidMount() {
        this.getProduct()
    }

    // Filter Products
    onBtnSearch = () => {

        const inputName = this.name.value;
        const inputMin = parseInt(this.min.value);
        const inputMax = parseInt(this.max.value);
        // inputMin = parseInt('') -> NaN

        var arrSearch = this.state.searchProducts.filter(el => {
            // Filter NAME only ->  inputMin = NaN  inputMax = NaN
            if( isNaN(inputMin) && isNaN(inputMax) ) {
                return(
                    el.nama.toLowerCase().includes(inputName.toLowerCase())
                    
                )
            // Filter NAME + MAX ->
            } else if ( isNaN(inputMin) ) {
                return(
                    el.nama.toLowerCase().includes(inputName.toLowerCase()) && inputMax >= el.price
                )
            // Filter NAME + MIN 
            } else if( isNaN(inputMax) ) {
                return(
                    el.nama.toLowerCase().includes(inputName.toLowerCase()) && el.price >= inputMin
                )
            // Filter NAME + MIN + MAX
            // Filter MIN + MAX -> // Semua string includes ('') (String kosong) --> true
            } else {
                return(
                    el.nama.toLowerCase().includes(inputName.toLowerCase()) && inputMax >= el.price && el.price >= inputMin
                    
                    
                )
            }
        })

        this.setState({products: arrSearch})
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
        .then( res => {
            console.log(res);
            this.setState( {
                products: res.data,
                searchProducts: res.data
            })
        })
    }

    renderList = () => {
        return this.state.products.map( el => {
            return (
                <ProductItem product={el} key={el.id} />
            )
        } )
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="mt-5">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home;