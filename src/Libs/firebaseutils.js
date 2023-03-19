import { auth, fs } from '../Config/Config';
import userTypes from '../data/types/userTypes';

export const signUpWithEmailAndPassword = async (name, email, password, dispatch) => {
    const setUserDetails = (user) => {
        const { displayName, email } = user;
        dispatch({ type: userTypes.SET_USER_DETAILS, payload: { name: displayName, email } });
    };
   await auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        fs.collection('users').doc(userCredential.user.uid).set({
            UserName: name,
            Email: email,
            Password: password
        })
        dispatch({ type: userTypes.REGISTER });
        setUserDetails(userCredential.user);
        auth.currentUser.updateProfile({ displayName: name });
    })
    .catch((error) => {
        let errorString = error.message;
        errorString = errorString.replace("Firebase: ", "");
        errorString = errorString.replace(/ \(auth\/.*?\)\./, "");
        dispatch({ type: userTypes.REGISTER_ERROR, payload: { message: errorString } });
    });
};

export const signInWithEmailAndPassword = async (email, password, dispatch) => {
    const setUserDetails = (user) => {
        const { displayName, email } = user;
        dispatch({ type: userTypes.SET_USER_DETAILS, payload: { name: displayName, email } });
    };
    await auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        dispatch({ type: userTypes.LOGIN });
        setUserDetails(userCredential.user);
    })
    .catch((error) => {
        let errorString = error.message;
        errorString = errorString.replace("Firebase: ", "");
        errorString = errorString.replace(/ \(auth\/.*?\)\./, "");
        dispatch({ type: userTypes.LOGIN_ERROR, payload: errorString });
    });
};

export const signOutWithEmailAndPassword = async (dispatch) => {
    auth.signOut().then(() => {
            dispatch({ type: userTypes.LOGOUT });
        });
};

