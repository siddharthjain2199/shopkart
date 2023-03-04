import React, { useReducer } from 'react' //useState also 
import { auth, fs } from '../../Config/Config'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate();

    function reducer(state, action) {
        if (action.type === 'setUname') {
            return {
                uname: state.uname
            };
        }
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

    // const [uname, setUname] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const [errorMsg, setErrorMsg] = useState('');
    // const [successMsg, setSuccessMsg] = useState('');

    const [state, dispatch] = useReducer(reducer, { uname: '', email: '', password: '', errorMsg: '', successMsg: '' })

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
                // setSuccessMsg('Signup succesful. You will now automatically get redirected to Login');
                // setUname('');
                // setEmail('');
                // setPassword('');
                // setErrorMsg('');

                dispatch({
                    type: 'setSuccessMsg',
                    nextName: 'Signup succesful. You will now automatically get redirected to Login'
                })
                dispatch({
                    type: 'setErrorMsg',
                    nextName: ''
                })
                dispatch({
                    type: 'setUname',
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
                    navigate('/login');
                }, 3000)
            }).catch((error) => {
                // setErrorMsg(error.message)
                dispatch({
                    type: 'setErrorMsg',
                    nextName: error.message
                })
            })
        }).catch((error) => {
            // setErrorMsg(error.message)
            dispatch({
                type: 'setErrorMsg',
                nextName: error.message
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
            <div className="container">
                <div className="mt-5">
                    {state.successMsg && <>
                        <div className='alert alert-success alert-dismissible fade show'>{state.successMsg}
                        </div>
                        <br></br>
                    </>}
                    <h1>Signup</h1>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="uname" className="form-label">Name</label>
                            <input type="text" className="form-control" id="uname" placeholder="name"
                                onChange={
                                    (e) => // setUname(e.target.value)
                                        dispatch({
                                            type: 'setUname',
                                            nextName: e.target.value
                                        })
                                } value={state.uname} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                onChange={(e) => // setEmail(e.target.value)
                                    dispatch({
                                        type: 'setEmail',
                                        nextName: e.target.value
                                    })
                                } value={state.email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="12345678"
                                onChange={(e) => // setPassword(e.target.value)
                                    dispatch({
                                        type: 'setPassword',
                                        nextName: e.target.value
                                    })
                                } value={state.password} />
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
