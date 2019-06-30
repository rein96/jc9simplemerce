import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EditProductModal from './EditProductModal'

class ManageProduct extends React.Component {

    state = {
        products: []   // [ { id, name, price, desc, item, src } ]

    }

    componentDidMount() {
        // Akses database
        this.getProduct();
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
                        <img src={el.src} className="list" alt="Gambar" /> 
                    </td>
                    <td> 
                        <button className="btn btn-primary m-3" onClick={ () => {this.editProduct(el)} }> Edit </button>

                        {/* <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#edit-product-modal">Open Modal</button> */}
{/* 
                        <a href='#edit-product-modal'>
                            ASDASDSA
                        </a> */}
                         
                        <button className="btn btn-warning" onClick={ () => {this.deleteProduct(el)} } > Delete </button>
                         
                    </td>
                </tr>
            )
        })

        return hasil;
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
        .then( res => {
            console.log(res);
            this.setState( { products: res.data} )
        })
    }

    addProduct = () => {
        const inputName = this.name.value;
        const inputDesc = this.desc.value;
        const inputPrice = parseInt(this.price.value);
        const inputPict = this.pict.value;

        axios.post('http://localhost:2019/products', {
            nama:inputName,     //perlu diganti nama -> name
            desc:inputDesc,
            price:inputPrice,
            src:inputPict
        })
        .then( res => {
            console.log(res);

            this.getProduct();  // axios.get

            alert('Product has been added !');
        })
        .catch( err => console.log(err) );
    }

    deleteProduct = (el) => {
        axios.delete(`http://localhost:2019/products/${el.id}`)
        .then( res => {

            this.getProduct();

            alert('Item has been deleted');
        }).catch( err => console.log(err));
    }

    editProduct = (el) => {
        return (    
            <div id='edit-product-modal' className='modal fade'>
                
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
        
        // const inputName = this.name.value;
        // const inputDesc = this.desc.value;
        // const inputPrice = parseInt(this.price.value);
        // const inputPict = this.pict.value;

        // axios.put(`http://localhost:2019/products/${el.id}`, {
        //     nama: inputName,
        //     desc:inputDesc,
        //     price:inputPrice,
        //     src:inputPict
        // }).then(res => {
        //     console.log(res)
        //     alert('Edit success!')
        // })
    }

    render() {

        // kalo belom login = STATEUSER.username nya kosong
        if (this.props.STATEUSER.username === '') {
            return <center><h2> You have to login first, <Link to='/login'> Click here to login </Link> </h2></center>
            // return <Redirect to='/login' />
        }

        // kalo udah login
        return (
            <div className="container">

                <EditProductModal  />

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

const mapStateToProps = (state) => {
    return {
        STATEUSER : state.auth
    }
}

export default connect(mapStateToProps)(ManageProduct);