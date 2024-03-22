import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebase'
import axios from 'axios';
import { SignInSuccess } from '../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle.user);
            const res = await axios.post('http://localhost:3000/user/google', {
                username: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                profilePicture: resultsFromGoogle.user.photoURL,
            }, { withCredentials: true });
            const data = JSON.stringify(res);
            if(data){
                dispatch(SignInSuccess(JSON.parse(data)));
                navigate('/');
                console.log(data);
            };
            console.log('User registered/signed in successfully');
            window.alert(`Welcome, @${resultsFromGoogle.user.displayName}`);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="">
            <button
                className="w-full bg-green-400 text-green-800 rounded-md py-2 px-4"
                type="button"
                onClick={handleGoogleClick}
            >
                <div className="flex flex-row">
                    <div className="font-Kanit font-bold text-teal-950">Continue with Google</div>
                </div>
            </button>
        </div>
    )
};

export default OAuth;