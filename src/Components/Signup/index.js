import React, { useReducer } from 'react' //useState also 
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../Common/Auth';
import { signUpWithEmailAndPassword } from '../../Libs/firebaseutils';

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
    const handleSignup = async (e) => {
        e.preventDefault();
        //   console.log(uname,email,password);
        await signUpWithEmailAndPassword(state.uname,state.email,state.password,dispatch,navigate)
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
                            <span>Already have an account Login&nbsp;
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
