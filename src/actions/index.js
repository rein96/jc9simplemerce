import axios from 'axios';
import cookies from 'universal-cookie';

// Bikin cookie
const cookie = new cookies()

// Action creator

export const onLoginUser = (inputUsername, inputPassword) => {

    return (dispatch) => {  // dispatch adalah function

        // get from database
        axios.get('http://localhost:2019/users', {
            params: {
                username: inputUsername,
                password: inputPassword
            }
        }).then( (res) => {
            console.log(res);

            if (res.data.length > 0 ) {

                alert('Welcome back ' + res.data[0].username);

                // Destructuring 
                const { id, username } = res.data[0]

                // Kirim action ke reducer, untuk disimpan username
                dispatch({      //dispatch parameternya {obj} => function( {obj} )
                    type: 'LOGIN_SUCCESS',
                    payload : {
                        id: res.data[0].id,
                        username: res.data[0].username
                    }
                })


                // Create data untuk cookie
                cookie.set( 'USERNAMECOOKIE', {id, username} , { path: '/'} )
            }

            else if (res.data.length === 0) {
                alert(' Oops, username or password is incorrect :( ')
            }
        }).catch( err => {
            console.log(err);
            alert('Server error')
        })
    }  
}

export const keepLogin = (objUser) => {
    // objUser = {id, username}
    return {
        type: "LOGIN_SUCCESS",
        payload : {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('USERNAMECOOKIE')
    // tidak butuh payload, karena log out gak bawa apapun ke state
    return {
        type: 'LOGOUT_SUCCESS'
    }
}