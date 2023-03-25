// Login.js
import { Link, Navigate } from 'react-router-dom'
import { useState, useReducer, useContext } from 'react';
import { userReducer, initialState } from '../../data/reducers/userReducer';
import { signInWithEmailAndPassword } from '../../Libs/firebaseutils';
import { AuthContext } from '../../Context/userContext';

const Login = () => {
    const [loginInput, setLoginInput] = useState({ email: '', password: '' });
    const [state, dispatch] = useReducer(userReducer, initialState);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(loginInput.email,loginInput.password,dispatch)
    };

    const handleEmail = (e) => setLoginInput({ ...loginInput, email: e.target.value })
    const handlePassword = (e) => setLoginInput({ ...loginInput, password: e.target.value })
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            {state.error && <>
                <div className='alert alert-danger alert-dismissible fade show'>
                    {state.error}
                </div>
                <br></br>
            </>}
            {currentUser ? (
                <Navigate to="/" />
            ) : (
                <div className="container">
                    <h3>Login</h3>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <div className="form-group row ">
                            <label className="col-sm-2 col-form-label">
                                Email:
                            </label>
                            <div className='col-sm-5'>
                                <input type="email" className='form-control' value={loginInput.email} onChange={handleEmail} />
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label className="col-sm-2 col-form-label">
                                Password:
                            </label>
                            <div className='col-sm-5'>
                                <input type="password" className='form-control' value={loginInput.password} onChange={handlePassword} />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <button className='btn btn-warning' type="submit">Login</button>
                        </div>
                    </form>
                    <div>
                        Not have an account
                        <Link className='btn btn-link' to='/signup'>Signup</Link>
                    </div>
                </div >
            )}
        </div >
    );
};

export default Login;
