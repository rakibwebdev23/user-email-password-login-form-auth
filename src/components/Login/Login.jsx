import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const [errorLogin, setErrorLogin] = useState('');
    const [successLogin, setSuccessLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsChecked = e.target.terms.checked;
        
        // reset email and password error field
        setErrorLogin('');
        setSuccessLogin('');

        if(password.length < 6){
            setErrorLogin('Please Your password at least 6 characters');
            return;
        }
        else if(!termsChecked){
            setErrorLogin("Please checked Terms and Condition");
            return;
        }
        // create user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccessLogin("User logged in successfully")
                }
                else{
                    alert("Please verify your account")
                }
            })
            .catch(error => {
                setErrorLogin(error.message);
            })
    }

    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            alert("Please provide an email");
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            alert("Please write a valid email");
            return;
        }

        // send validation email

        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert("Please check your email");
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" 
                            placeholder="email" 
                            ref={emailRef}
                            name="email" 
                            className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered w-full" name="password" required />
                                <span className="absolute mt-4 right-6 text-xl" onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                   {
                                        showPassword ? <FaEyeSlash/> : <FaEye/>
                                   }
                                </span>
                            </div>
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="font-semibold">
                            <input type="checkbox" name="terms" id="terms" />
                            <label className="ml-2" htmlFor="terms">Accepted our <a className="text-blue-600" href="">Terms and Condition</a></label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            <p>New to the Website? <Link to="/signUp" className="text-blue-600 font-bold">Please SignUp</Link></p>
                        </div>
                    </form>
                    {
                        errorLogin && <p className="text-red-600 text-xl">{errorLogin}</p>
                    }
                    {
                        successLogin && <p>{successLogin}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;