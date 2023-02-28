import React, { useState } from 'react'
import { auth } from '../Config/Config'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email,password)
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setSuccessMsg('Login succesful. You will now automatically get redirected to Home')
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/');
            },) // to add delay 3000
        }).catch((error) => {
            setErrorMsg(error.message)
        })

    }
    return (<>
        <div className="container mt-5">
            {successMsg && <>
                <div className='alert alert-success alert-dismissible fade show'>{successMsg}
                </div>
                <br></br>
            </>}
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="12345678"
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="mb-3">
                    <span>Don't have an account Signup
                        <Link to='/signup'>Here</Link></span>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            {errorMsg && <>
                <div className='alert alert-danger alert-dismissible fade show'>
                    {errorMsg}
                </div>
                <br></br>
            </>}
        </div>
    </>

    )
}

export default Login
