import React, { useReducer } from 'react'
import { auth } from '../../Config/Config'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../Common/Auth';

function Login() {
    const navigate = useNavigate();

    <Auth />

    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        errorMsg: '',
        successMsg: ''
    })
    function reducer(state, action) {
        switch (action.type) {
            case 'setEmail':
                return { ...state, email: action.value };
            case 'setPassword':
                return { ...state, password: action.value };
            case 'setErrorMsg':
                return { ...state, errorMsg: action.value };
            case 'setSuccessMsg':
                return { ...state, successMsg: action.value };
            default:
                return state;
        }
        // throw Error('Unknown action.');
    }
    // console.log(state.email,state.password)

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(state.email,state.password)
        auth.signInWithEmailAndPassword(state.email, state.password).then(() => {
            // setSuccessMsg('Login succesful. You will now automatically get redirected to Home')
            // setEmail('');
            // setPassword('');
            // setErrorMsg('');
            dispatch({
                type: 'setSuccessMsg',
                value: 'Login succesful. You will now automatically get redirected to Home'
            })

            setTimeout(() => {
                // setSuccessMsg('');
                dispatch({
                    type: 'setErrorMsg',
                    value: ''
                })
                dispatch({
                    type: 'setEmail',
                    value: ''
                })
                dispatch({
                    type: 'setPassword',
                    value: ''
                })
                dispatch({
                    type: 'setSuccessMsg',
                    value: ''
                })
                navigate('/');
            }, 600) // to add delay 3000
        }).catch((error) => {
            // setErrorMsg(error.message)
            let errorString = error.message;
            errorString = errorString.replace("Firebase: ", "");
            errorString = errorString.replace(/ \(auth\/.*?\)\./, "");

            dispatch({
                type: 'setErrorMsg',
                value: errorString
            })
        })
    }
    return (
        <>
            <div className="container mt-5">
                {state.successMsg && <>
                    <div className='alert alert-success alert-dismissible fade show'>{state.successMsg}
                    </div>
                    <br></br>
                </>}
                {state.errorMsg && <>
                    <div className='alert alert-danger alert-dismissible fade show'>
                        {state.errorMsg}
                    </div>
                    <br></br>
                </>}
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"
                            onChange={(e) =>
                                // setEmail(e.target.value)
                                dispatch({
                                    type: 'setEmail',
                                    value: e.target.value
                                })
                            } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="12345678"
                            onChange={(e) =>
                                //setPassword(e.target.value)
                                dispatch({
                                    type: 'setPassword',
                                    value: e.target.value
                                })
                            } />
                    </div>
                    <div className="mb-3">
                        <span>Don't have an account Signup&nbsp;
                            <Link to='/signup'>Here</Link></span>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Login
