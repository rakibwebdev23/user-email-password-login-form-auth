import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const acceptedTerms = e.target.terms.checked;
        const name = e.target.name.value;

        // reset error
        setSignUpError('');
        setSignUpSuccess('');

        if (password.length < 6) {
            setSignUpError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setSignUpError('Your password should have at least one upper case, character,symbols and numbers');
            return;
        }
        else if (!acceptedTerms) {
            setSignUpError('Please checked our terms and condition');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSignUpSuccess('Your email submitted successfully')
                
                sendEmailVerification(result.user)
                .then(() =>{
                    alert("Please check your email and verify your account")
                })
            })
            .catch(error => {
                error ? setSignUpError(error.message) : ''
            })
    }


    return (
        <div>
            <div className="mx-auto">
                <p className="text-3xl text-green-600 text-center mb-2">Please Login</p>
                <form onSubmit={handleOnSubmit} className="text-center bg-red-200 p-4">
                    <input className="md:w-full p-2 mt-2" type="name" name="name" placeholder="Name" id="" required /><br />
                    <input className="md:w-full p-2 mt-2" type="email" name="email" placeholder="email address" id="" required /><br />
                    <div className="relative">
                        <input className="md:w-full p-2 mt-2" type={showPassword ? "text" : "password"} name="password" placeholder="password" id="" required />
                        <span className="absolute mt-5 right-4" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    <br />
                    <div className="flex items-center">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2 font-bold" htmlFor="terms">Accept Our <a className="text-blue-600" href="">Terms and Condition</a></label>
                    </div>
                    <input className="md:w-full bg-blue-600 text-white font-bold p-2 mt-4" type="submit" value="Login" />
                    <div>
                        <p>Already have an account? <Link to="/login" className="text-blue-600 font-bold">Please Login</Link></p>
                    </div>
                </form>
                {
                    signUpError && <p className="text-center text-xl text-red-600">{signUpError}</p>
                }
                {
                    signUpSuccess && <p className="text-center text-xl text-green-600">{signUpSuccess}</p>
                }

            </div>
        </div>
    );
};

export default SignUp;