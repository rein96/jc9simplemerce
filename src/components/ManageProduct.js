import React from 'react';
import axios from 'axios';

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