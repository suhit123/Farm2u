import Link  from 'next/link';
import axios from "axios";
import Footer from "../components/footer";
import Nav from "../components/nav";
import styles from '@/styles/signup.module.css'
import Image from "next/image";
import googlelogo from'@/resources/google.png';
import successlogo from '@/resources/successicon.png'
import { useEffect, useState } from 'react'
import Loader from '../components/loader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
const Signup=()=>{
    const {data:session,status}=useSession()    
    const [changeLoad,setChangeLoad]=useState(false);
    const router = useRouter();
    const [showpass,setShowpass]=useState('password');
    const [redirection_login,setRedirection_login]:any=useState("");
    const [responseerr,setResponseerr]:any=useState({
        emailerr:"",
        passerr:""
    });
    const [user,setUser]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    useEffect(()=>{
        if(status==="authenticated"){
            router.push('/')
        }
    },[status])
    const handlechange=(e:any)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const redirect_now=()=>{
        router.push({
            pathname: '/login'
          });
    }
    const userSubmit=async(e:any)=>{
        e.preventDefault();
        console.log(user);
        if(user.password.length<8){
            setResponseerr({
                passerr:<p><span>&#9888;</span>Password should contain atleast 8 characters </p>,
            })  
            return;
        }
        setChangeLoad(true);
        await axios.post('../api/User',user)
        .then((res)=>{
            console.log(res.data.token);
            setRedirection_login(<div className={styles.loginalert}>
                <div className={styles.login_redirection}>
                    <Image src={successlogo} alt=""/>
                    <p>Your account has been created successfully!</p>
                    <button onClick={redirect_now}>Next →</button>
                </div>
                </div>)
                setChangeLoad(false)
        })
        .catch((err)=>{
            let errresponse=err.response.data;
            if(errresponse==="emailerror"){
                setResponseerr({
                    emailerr:<p><span>&#9888;</span>Email already exist! </p>,
                })    
            }
        })
        .finally(()=>{
            setChangeLoad(false)
        })
    }
    return(
        <>
        <Loader time={500}/>
        <Nav/>
        <form className={styles.signupform}  onSubmit={userSubmit} >
            <h3>CREATE ACCOUNT</h3>
            <p>First Name</p>
            <input type="text" name="firstname" placeholder="eg. Ravi" value={user.firstname} onChange={handlechange} required/>
            <p>Last Name</p>
            <input type="text" name="lastname" placeholder="eg. Kumar" value={user.lastname} onChange={handlechange} required/>
            <p>Email</p>
            <input type="email" name="email" placeholder="eg. Ravikumar@gmail.com" value={user.email} onChange={handlechange} required/>
            <p className="responseerr">{responseerr.emailerr}</p>
            <p>Password</p>
            <input type={`${showpass}`} name="password" placeholder="eg. Ravi@1456" value={user.password} onChange={handlechange} required/>
            <p className="responseerr">{responseerr.passerr}</p>
            <div className={styles.show_pass_signup}>
                <input type="checkbox" onChange={()=>{
                    if(showpass=='password'){
                        setShowpass('text');
                    }
                    else{
                        setShowpass('password');
                    }
                }}/>
                <p>Show password</p>
            </div>
            <button type='submit' >{changeLoad?<FontAwesomeIcon icon={faSpinner} className="fa-spin" />:<>Submit</>}
            </button>
            <p className={styles.loginredirection}>Already have an account ? <Link href="/login">Log in</Link></p>
        </form>
        {redirection_login}
        <Footer/>
        </>
    );
};
export default Signup;