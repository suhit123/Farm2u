import styles from '@/styles/blogs.module.css'
import Nav from '../components/nav';
import Footer from '../components/footer';
import Blogbox from '../components/blogbox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader';
import { ColorRing } from 'react-loader-spinner';
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
    const [emailSent,setEmailSent]=useState(false);
    const [loader,setLoader]=useState(false);
    const handlenotify=async(e:any)=>{
        e.preventDefault();
        setLoader(true);
        await axios.post("../api/notifyemails",{email:notifyemail})
        .then((res)=>{
            setEmailSent(true);
            setLoader(false);
            console.log("Successfully registered!")
        })
        .catch((err)=>{
            console.log("Already registered!")
        })
        .finally(()=>{
            setLoader(false);
        })
    }
    return(
        <>
        <Loader time={1000}/>
        <Nav/>
        <div className={styles.blogbox_container}>
        {data.length!==0?data.slice(0,shownum).map((blog)=>{return(<Blogbox blogboxdata={blog}/>)}):[0,1,2].map(()=>{
            return(
        <div className={styles.blogbox_con_empty}>
        <div className={styles.blogbox_image_empty}></div>
        <div className={styles.blogbox_heading_empty}></div>
        <div className={styles.blogbox_details_empty}>
            <div className={styles.companyname_empty}></div>
            <div className={styles.content_empty}></div>
        </div>
        <p className={styles.content}></p>
        </div>
            )
        })
        }
        </div>
        <div className={styles.blogs_loadmore_btn}>
        {shownum>=data.length?<p className={styles.endofresults}>End of the results!</p>:<button onClick={()=>setShownum(shownum+3)}>Load more</button>}
        </div>
        <div className={styles.blognotification_container}>
            <div className={styles.blognotification_box1}>
            <h4>Get the latest updates</h4>
            <p>Enter your email for never miss posts</p>
            </div>
            <div className={styles.blognotification_box2}>
                <form onSubmit={handlenotify}>
                <input type='mail' placeholder='example@gmail.com' name='email' onChange={(e)=>{setNotifyemail(e.target.value)}} required/>
                <button type='submit'>{loader?<ColorRing
                                            visible={true}
                                            height="30"
                                            width="30"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']}
                                            />:!loader && emailSent?<>Sent</>:<>Notify</>}</button>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}
export default Blogs;