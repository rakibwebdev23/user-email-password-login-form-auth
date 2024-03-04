import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const DaisyLoginForm = () => {

    const [errorSignUp, setErrorSignUp] = useState('');
    const [successSignUp, setSuccessSignUp] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleDaisyHeroLoginForm = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        // reset error empty
        setErrorSignUp('');
        setSuccessSignUp('');

        if (password.length < 6) {
            setErrorSignUp("Password should be at least 6 characters or longer");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorSignUp("Your password should have at least one upper case");
            return;
        }
        else if(!accepted){
            setErrorSignUp("Please accept our terms and condition");
            return;
        }

        // create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccessSignUp("You are successfully submitted")
            })
            .catch(error => {
                setErrorSignUp(error.message);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">
                            Sign Up Now</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleDaisyHeroLoginForm} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email address" className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" required />
                                    <span className="absolute mt-4 right-6" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" name="terms" id="terms" />
                                <label className="ml-1" htmlFor="terms">Accept Our <a className="text-blue-600 border border-b-2" href="">Terms and Condition</a></label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            errorSignUp && <p className="text-xl text-red-600">{errorSignUp}</p>
                        }
                        {
                            successSignUp && <p className="text-xl text-green-600">{successSignUp}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaisyLoginForm;