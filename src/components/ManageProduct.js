import React from 'react';
import axios from 'axios';

class ManageProduct extends React.Component {

    state = {
        products: [],   // [ { id, name, price, desc, item, src } ]
    }

    componentDidMount() {
        // Akses database

        axios.get('http://localhost:2019/products')
        .then( res => {
            console.log(res);
            this.setState( {products: res.data} )
        })
    }

    renderList = ( ) => {
        const hasil = this.state.products.map( el => {
            return (
                <tr key={el.id}>
                    <td> {el.id} </td>
                    <td> {el.nama} </td>
                    <td> {el.desc} </td>
                    <td> {el.price} </td>
                    <td> 
                        <img src={el.src} className="list" /> 
                    </td>
                    <td> 
                        <button className="btn btn-primary m-3"> Edit </button> 
                        <button className="btn btn-warning"> Delete </button> 
                    </td>
                </tr>
            )
        })

        return hasil;
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderList()}

                    </tbody>

                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageProduct;