import React, { useContext, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth';
import { signInWithEmailAndPassword } from '../../Libs/firebaseutils';

function Login() {
    const navigate = useNavigate();

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
        try {
            signInWithEmailAndPassword(state.email, state.password, dispatch, navigate)
        } catch (error) {
            alert(error);
        }
    }
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        // return <Redirect to="/" />;
        navigate('/')
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
