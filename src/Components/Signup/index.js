import React, { useReducer } from 'react' //useState also 
import { auth, fs } from '../../Config/Config'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../Common/Auth';

function Signup() {

    const navigate = useNavigate();
    <Auth/>

    const [state, dispatch] = useReducer(reducer, { uname: '', email: '', password: '', errorMsg: '', successMsg: '' })

    function reducer(state, action) {
        switch (action.type) {
            case 'setUname':
                return { ...state, uname: action.value };
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
    }
    const handleSignup = (e) => {
        e.preventDefault();
        //   console.log(uname,email,password);
        auth.createUserWithEmailAndPassword(state.email, state.password).then((credentials) => {
            // console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                UserName: state.uname,
                Email: state.email,
                Password: state.password
            }).then(() => {
                dispatch({
                    type: 'setSuccessMsg',
                    value: 'Signup succesful. You will now automatically get redirected to Home'
                })
                dispatch({
                    type: 'setErrorMsg',
                    value: ''
                })
                dispatch({
                    type: 'setUname',
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
                setTimeout(() => {
                    // setSuccessMsg('');
                    dispatch({
                        type: 'setSuccessMsg',
                        value: ''
                    })
                    console.log(state.email, state.password, state.successMsg)
                    navigate('/');
                }, 600)

            }).catch((error) => {
                // setErrorMsg(error.message)
                dispatch({
                    type: 'setErrorMsg',
                    value: error.message
                })
            })
        }).catch((error) => {
            // setErrorMsg(error.message)
            dispatch({
                type: 'setErrorMsg',
                value: error.message
            })
        })
    }
    return (
        <>
            {state.errorMsg && <>
                <div className='alert alert-danger alert-dismissible fade show'>
                    {state.errorMsg}
                </div>
                <br></br>
            </>}
            {state.successMsg && <>
                <div className='alert alert-success alert-dismissible fade show'>{state.successMsg}
                </div>
                <br></br>
            </>}
            <div className="container">
                <div className="mt-5">
                    <h1>Signup</h1>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="uname" className="form-label">Name</label>
                            <input type="text" className="form-control" id="uname" placeholder="name"
                                onChange={
                                    (e) => // setUname(e.target.value)
                                        dispatch({
                                            type: 'setUname',
                                            value: e.target.value
                                        })
                                } value={state.uname} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                onChange={(e) => // setEmail(e.target.value)
                                    dispatch({
                                        type: 'setEmail',
                                        value: e.target.value
                                    })
                                } />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="12345678"
                                onChange={(e) => // setPassword(e.target.value)
                                    dispatch({
                                        type: 'setPassword',
                                        value: e.target.value
                                    })
                                } />
                        </div>
                        <div className="mb-3">
                            <span>Already have an account Login
                                <Link to='/login'>Here</Link></span>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
