import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const SignUp = () => {
    const auth = getAuth(app)
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const trams = e.target.trams.checked;
        console.log(email, password, trams)

        // clear state
        setRegisterError("")
        setSuccess("");

        //  check password length
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters')
            return;
        } else if (/[A-Z]/.test(password) === false) {
            setRegisterError('Password must contain one uppercase letter')
            return
        } else if (!trams) {
            setRegisterError('Please accept our trams & condition')
            return
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                //  redirect to dashboard after successful login
                setSuccess('User Crate Successfully!')

            })
            .catch(error => {
                console.error(error)
                // set error message to display on the screen
                setRegisterError(error.message)
            })

    }
    return (
        <div>
            <div className="mx-auto w-3/6">
                <h3 className="text-3xl">Please Register</h3>
                <br />
                <form onSubmit={handleFormSubmit}>
                    <input className=" p-2 outline-1 w-3/6 mb-3" type="email" name="email" required placeholder="Email Address" id="" />
                    <br />
                    <div className="relative">
                        <input
                            className="p-2 outline-1 w-3/6"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Password" id="" />
                        <span className="absolute top-3 left-[375px]" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaRegEye></FaRegEye>
                            }
                        </span>
                    </div>

                    <input type="checkbox" name="trams" id="trams" />
                    <label className="ml-2" htmlFor="trams">Accept out trams & condition</label><br />

                    <br />
                    <input className="btn btn-secondary w-3/6 text-white font-bold" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
            </div>
        </div>
    );
};

export default SignUp;