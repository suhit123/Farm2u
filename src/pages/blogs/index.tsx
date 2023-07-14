import styles from '@/styles/blogs.module.css'
import Nav from '../components/nav';
import Footer from '../components/footer';
import Blogbox from '../components/blogbox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader';
const Blogs=()=>{
    const [shownum,setShownum]=useState(3);
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("../api/Blogs")
        .then((res)=>{
             setData(res.data);
        })
        .catch((err)=>{
            console.log(err);})
    },[]);
    const [notifyemail,setNotifyemail]=useState("");
    const handlenotify=async(e:any)=>{
        await axios.post("../api/notifyemails",{email:notifyemail})
        .then((res)=>{
            console.log("Successfully registered!")
        })
        .catch((err)=>{
            console.log("Already registered!")
        })
    }
    return(
        <>
        <Loader time={1000}/>
        <Nav/>
        <div className={styles.blogbox_container}>
            {data.slice(0,shownum).map((blog)=>{return(<Blogbox blogboxdata={blog}/>)})}
        </div>
        <div className={styles.blogs_loadmore_btn}>
        {shownum>=data.length?<p>End of the results!</p>:<button onClick={()=>setShownum(shownum+3)}>Load more</button>}
        </div>
        <div className={styles.blognotification_container}>
            <div className={styles.blognotification_box1}>
            <h4>Get the latest updates</h4>
            <p>Enter your email for never miss posts</p>
            </div>
            <div className={styles.blognotification_box2}>
                <form onSubmit={handlenotify}>
                <input type='mail' placeholder='example@gmail.com' name='email' onChange={(e)=>{setNotifyemail(e.target.value)}} required/>
                <button type='submit'>Notify</button>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
export default Blogs;