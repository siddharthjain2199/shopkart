import React, { useReducer } from 'react'
import { auth } from '../../Config/Config'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const [errorMsg, setErrorMsg] = useState('');
    // const [successMsg, setSuccessMsg] = useState('');

    function reducer(state, action) {
        if (action.type === 'setEmail') {
            return {
                email: state.email
            };
        }
        if (action.type === 'setPassword') {
            return {
                password: state.password
            };
        }
        if (action.type === 'setErrorMsg') {
            return {
                errorMsg: state.errorMsg
            };
        }
        if (action.type === 'setSuccessMsg') {
            return {
                successMsg: state.successMsg
            };
        }
        throw Error('Unknown action.');
    }

    const [state, dispatch] = useReducer(reducer, {email: '', password: '', errorMsg: '', successMsg: ''})

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email,password)
        auth.signInWithEmailAndPassword(state.email, state.password).then(() => {
            // setSuccessMsg('Login succesful. You will now automatically get redirected to Home')
            // setEmail('');
            // setPassword('');
            // setErrorMsg('');
            dispatch({
                type: 'setSuccessMsg',
                nextName: 'Login succesful. You will now automatically get redirected to Home'
            })
            dispatch({
                type: 'setErrorMsg',
                nextName: ''
            })
            dispatch({
                type: 'setEmail',
                nextName: ''
            })
            dispatch({
                type: 'setPassword',
                nextName: ''
            })
            setTimeout(() => {
                // setSuccessMsg('');
                dispatch({
                    type: 'setSuccessMsg',
                    nextName: ''
                })
                navigate('/');
            },) // to add delay 3000
        }).catch((error) => {
            // setErrorMsg(error.message)
            dispatch({
                type: 'setErrorMsg',
                nextName: error.message
            })
        })

    }
    return (<>
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
                            nextName: e.target.value
                        })
                    } value={state.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="12345678"
                        onChange={(e) => 
                        //setPassword(e.target.value)
                        dispatch({
                            type: 'setPassword',
                            nextName: e.target.value
                        })
                    } value={state.password} />
                </div>
                <div className="mb-3">
                    <span>Don't have an account Signup
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
