import { Link, useNavigate } from 'react-router-dom'
import { useState, useReducer, useContext } from 'react';
import { userReducer, initialState } from '../../data/reducers/userReducer';
import { signUpWithEmailAndPassword } from '../../Libs/firebaseutils';
import { AuthContext } from '../../Context/userContext';

function Signup() {

    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({ name: '', email: '', password: '' });
    const [state, dispatch] = useReducer(userReducer, initialState);

    const handleSignup = (e) => {
        e.preventDefault();
         signUpWithEmailAndPassword(registerInput.name,registerInput.email,registerInput.password,dispatch)
    };
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
                navigate('/')
            ) : (
                <div className="container">
                    <h3>Signup</h3>
                    <hr />
                    <form onSubmit={handleSignup}>
                        <div className="form-group row ">
                            <label className="col-sm-2 col-form-label">
                                Name:
                            </label>
                            <div className='col-sm-5'>
                                <input type="text" className='form-control' value={registerInput.name} onChange={(e) => setRegisterInput({ ...registerInput, name: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label className="col-sm-2 col-form-label">
                                Email:
                            </label>
                            <div className='col-sm-5'>
                                <input type="email" className='form-control' value={registerInput.email} onChange={(e) => setRegisterInput({ ...registerInput, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label className="col-sm-2 col-form-label">
                                Password:
                            </label>
                            <div className='col-sm-5'>
                                <input type="password" className='form-control' value={registerInput.password} onChange={(e) => setRegisterInput({ ...registerInput, password: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <button className='btn btn-warning' type="submit">Signup</button>
                        </div>
                    </form>
                    <div>
                        Already have an account
                        <Link className='btn btn-link' to='/login'>Login</Link>
                    </div>
                </div >
            )}
        </div >
    )
}

export default Signup
