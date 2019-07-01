import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ManageProduct extends React.Component {

    state = {
        products: [],   // [ { id, name, price, desc, item, src } ]
        selectedID : 0  // All products starts from ID 1

    }

    componentDidMount() {
        // Akses database
        this.getProduct();
    }

    onSaveItem = id => {
        var editedName = this.editName.value;
        var editedDesc = this.editDesc.value;
        var editedPrice = this.editPrice.value;
        var editedSrc = this.editSrc.value;

        // patch = update data | put = overwrite data
        axios.patch(`http://localhost:2019/products/${id}` , {
            nama: editedName,
            desc: editedDesc,
            price: editedPrice,
            src: editedSrc
            }
        ).then( () => {
            this.getProduct();
            alert('Product has been successfully edited !')
        }).catch( err => console.log(err) )
    }

    renderList = ( ) => {
        const hasil = this.state.products.map( el => {
            
            if(el.id !== this.state.selectedID){    // 2 !== 1 = true
                return (
                    <tr>
                        {/* <td>{el.id}</td> */}
                        <td>{el.nama}</td>
                        <td>{el.desc}</td>
                        <td>{el.price}</td>
                        <td>
                            <img src={el.src} style={ { width: '300px' } }/>
                        </td>
                        <td>
                            <button onClick={() => {this.setState({selectedID: el.id})}} className = 'btn btn-primary'>Edit</button>
                            <button className = 'btn btn-warning' onClick={ () => { this.deleteProduct(el.id) } }>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        {/* <td>{el.id}</td> */}
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={el.nama}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={el.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={el.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editSrc = input}} type="text" defaultValue={el.src}/>
                        </td>
                        {/* <td>
                            <img className='list' src={el.src}/>
                        </td> */}
                        <td>
                            <button className='btn btn-primary' onClick={ () => { this.onSaveItem(el.id) } } >Save</button>
                            <button onClick={() => {this.setState({selectedID: 0})}} className = 'btn btn-warning'>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })

        return hasil;
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
        .then( res => {
            console.log(res);
            this.setState( { products: res.data , selectedID : 0} ) //selectedID = 
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

    deleteProduct = (id) => {
        
            axios.delete(`http://localhost:2019/products/${id}`)
             .then( res => {

            this.getProduct();

            alert('Item has been deleted');
        }).catch( err => console.log(err));
          
    }

    render() {
        console.log(`this.state.selectedID = ${this.state.selectedID}`);

        // kalo belom login = STATEUSER.username nya kosong
        if (this.props.STATEUSER.username === '') {
            return <center><h2> You have to login first, <Link to='/login'> Click here to login </Link> </h2></center>
            // return <Redirect to='/login' />
        }

        // kalo udah login
        return (
            <div className="container">

                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            {/* <th scope="col">ID</th> */}
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