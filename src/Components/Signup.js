import React, { useState } from 'react'
import { auth, fs } from '../Config/Config'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate();

    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        //   console.log(uname,email,password);
        auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                UserName: uname,
                Email: email,
                Password: password
            }).then(() => {
                setSuccessMsg('Signup succesful. You will now automatically get redirected to Login');
                setUname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/login');
                }, 3000)
            }).catch((error) => {
                setErrorMsg(error.message)
            })
        }).catch((error) => {
            setErrorMsg(error.message)
        })
    }
    return (
        <>
        <div className="container">
            <div className="mt-5">
                {successMsg && <>
                    <div className='alert alert-success alert-dismissible fade show'>{successMsg}
                    </div>
                    <br></br>
                </>}
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="uname" className="form-label">Name</label>
                        <input type="text" className="form-control" id="uname" placeholder="name"
                            onChange={(e) => setUname(e.target.value)} value={uname} />
                    </div>
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
                        <span>Already have an account Login
                            <Link to='/login'>Here</Link></span>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">SignUp</button>
                    </div>
                </form>
                {errorMsg && <>
                    <div className='alert alert-danger alert-dismissible fade show'>
                        {errorMsg}
                    </div>
                    <br></br>
                </>}
            </div>
            </div>
        </>
    )
}

export default Signup
