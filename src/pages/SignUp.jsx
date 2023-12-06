import React from 'react'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import{toast} from 'react-toastify';
import {setDoc,doc, serverTimestamp} from 'firebase/firestore'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
function SignUp() {
    const [showPassword , setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        name: '',
        email: '',

        password: ''
    });
    const onChange = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value,
        }));
    }

    const {name,email, password} = formData;
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
            try{
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(auth,email,password);
                const user = userCredential.user;
                updateProfile(auth.currentUser,{
                    displayName: name,
                })
                const formDataCopy = {...formData};
                delete formDataCopy.password
                formDataCopy.timestamp = serverTimestamp();

                await setDoc(doc(db,'users',user.uid),formDataCopy);
                navigate('/');
            }
            catch(error){
                toast.error('something went wrong with registration');
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>

                </header>


                <form onSubmit ={onSubmit}>
                <input type="text" name="name" id="name" className="nameInput" placeholder='Name' value={name} onChange={onChange} />
                    <input type="email" name="email" id="email" className="emailInput" placeholder='Email' value={email} onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'}
                        className='passwordInput'
                        placeholder='Password'
                        value={password}
                        id='password'
                        onChange={onChange}
                        />
                        <img src={visibilityIcon} alt=""  className='showPassword'
                        onClick={()=>setShowPassword((prevState)=>!prevState)}
                        setShowPassword={setShowPassword}
                        />
                    </div>
                    <Link to='forgotPassword' className='forgotPasswordLink'>Forgot Password</Link>
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px'/>
                        </button>
                    </div>
                </form>
                <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
            </div>
           

        </>
    )
}

export default SignUp