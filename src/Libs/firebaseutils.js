import { auth, fs } from '../Config/Config';

export const signUpWithEmailAndPassword = async (uname, email, password, dispatch, navigate) => {
    await auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
        fs.collection('users').doc(credentials.user.uid).set({
            UserName: uname,
            Email: email,
            Password: password
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
                // console.log(state.email, state.password, state.successMsg)
                navigate('/');
            }, 600)
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
};

export const signInWithEmailAndPassword = async (email, password, dispatch, navigate) => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
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
        }, 600)
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
};

export const signOutWithEmailAndPassword = async (navigate) => {
    await auth.signOut().then(() => {
        navigate('/login');
    })
};

