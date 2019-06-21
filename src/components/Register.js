import React, { Component } from 'react';
import axios from 'axios';

// mx-auto = margin horizontal ketengah
// kalo mau pake "col", harus dibungkus "row"
class Register extends Component {

    onClickButton = () => {
        // harus arrow function untuk bisa mengacu "this" accurately
        const inputUsername = this.username.value
        const inputEmail = this.email.value
        const PASSWORD = this.password.value

        console.log(`inputUsername = ${inputUsername}`)
        console.log(`inputEmail = ${inputEmail}`)

        // GET axios.get -> request data
        axios.get('http://localhost:2019/users', {
            params: {
                username: inputUsername,
                email: inputEmail
            }
        }).then( res => {
            console.log(res)

            if (res.data.length > 0) {
                // kalo ada username dan email yang sama
                if (res.data[0].username.toLowerCase() == inputUsername.toLowerCase()) {
                    alert( 'The username had been registered, please use different username :) ' )
                } else if (res.data[0].email.toLowerCase() == inputEmail.toLowerCase()) {
                    console.log('The email had been registered, please use different email')
                    alert( 'The email had been registered, please use different email')  
                } 

            } else {
                // POST axios.post  -> post / menaruh data
                axios.post('http://localhost:2019/users', {
                    username: inputUsername,
                    email:inputEmail,
                    password:PASSWORD
                }).then( (res) => {
                    console.log(res);
                }).catch( (err) => {
                    console.log(err);
                } )
            }

        }).catch( err => {
            console.log(err)
        })

        

        



        


    }

    render() {
        return (
            <div>

                <div className="mt-5 row">
                    <div className="card col-sm-4 mx-auto">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h2>Register</h2>
                            </div>
                            
                            <div className="card-title">
                                <h4>Username</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control" type="text"
                                    ref= { (inputUsername) => {this.username = inputUsername} }
                                />
                            </form>

                            <div className="card-title">
                                <h4>Email</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control"
                                    ref= { (inputEmail) => {this.email = inputEmail } }
                                />
                            </form>

                            <div className="card-title">
                                <h4>Password</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control" type="password" 
                                    ref= { (inputPassword) => {this.password = inputPassword } }
                                />
                            </form>

                            <button className="btn btn-success mt-3" onClick={this.onClickButton} >Click for Register</button>
                            
                        </div>
                    </div>
                </div>  

            </div>
        )
    }
}

export default Register