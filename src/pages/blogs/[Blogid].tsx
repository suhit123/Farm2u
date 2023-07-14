import { useRouter } from "next/router";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from '@/styles/detailed_blog.module.css'
import { RWebShare } from "react-web-share";
import Blogad from "../components/Blogad";
import sharepngpage from '@/resources/sharepngpage.png'
import Custom404 from "../404";
const Blogid=()=>{
    const router=useRouter()
    let Blogid=router.query.Blogid;
    let currentUrl:any;
    if (typeof window !== 'undefined') {
        currentUrl = window.location.href;
    }
    const [Blogdata,setBlogdata]:any=useState({});
    const [pagecomments,setPagecomments]=useState([]);
    const [checkId,setCheckId]=useState(false);
    const [location,setLocation]:any=useState("");
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
    useEffect(() => {
        if (Blogid) {
          axios
            .get(`../api/Blogs/${Blogid}`)
            .then((res) => {
              setBlogdata(res.data);
              setPagecomments(res.data.comments.reverse())
            })
            .catch((err) => {
              console.log("Something wrong!");
              if (err.response.data === "iderror") {
                setCheckId(true);
              }
            });
        }
      }, [Blogid,reducerValue]);
    useEffect(()=>{
        setLocation(currentUrl);
    },[currentUrl])
    useEffect(()=>{

    },[Blogdata])
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get("../api/Blogs")
        .then((res)=>{
             setData(res.data);

        })
        .catch((err)=>{
            console.log(err);})
    },[]);
    //scroll
    const [scrollTop,setScrollTop]=useState(0);
    const onScroll=()=>{
        const winScroll =document.documentElement.scrollTop;
        const height=document.documentElement.scrollHeight-
        document.documentElement.clientHeight;
        const scrolled=(winScroll/height)*100;
        setScrollTop(scrolled);
    }
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            window.addEventListener("scroll",onScroll);
            return ()=> window.removeEventListener("scroll",onScroll);
        }
    },[]);
    //comment
    const[commentingState,setCommentingState]=useState(true);
    const [newcomment,setNewcomment]=useState({
        name:"",
        comment:""
    })
    const handlechange=(e:any)=>{
        setNewcomment({...newcomment,[e.target.name]:e.target.value});
    }
    const userSubmit=async(e:any)=>{
        e.preventDefault();
        console.log(newcomment)
        await axios.post(`../api/Blogs/${Blogid}`,newcomment)
        .then((res)=>{
            console.log("Comment added!");
            forceUpdate();
            setCommentingState(false);
            setNewcomment({name:"",comment:""})
            axios.post('/api/SMTP/Blogcomment',{name:newcomment.name,comment:newcomment.comment,blogid:Blogid,Blogtitle:Blogdata.title})
            .then((res)=>{
                console.log("Comment added and posted");
            })
            .catch((err)=>{
                console.log("comment added email failed");
            })
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    return(
        <>
        <Nav/>
        <div className={styles.progressMainWrapper}>
            <div
                className={styles.progressMainStyle}
                style={{width: `${scrollTop}%`}}
            ></div>
        </div>
        {checkId?<Custom404/>:<>
        <div className={styles.detailed_blog_container_entire}>
            <div className={styles.sharepage_block}>
            <RWebShare
                data={{
                    text: "Web Share - GfG",
                    url: `${currentUrl}`,
                    title: "GfG",
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <Image src={sharepngpage} alt=""/>
            </RWebShare>
            <p>Share</p>
            </div>
            <div className={styles.detailed_blog_container_entire_box1}>
            <div className={styles.detailed_blog_container} >
            <p className={styles.detailed_blog_container_date}>{Blogdata.publishDate} | Genmatrix Remedies</p>
            <h3>{Blogdata.title}</h3>
            <div className={styles.detailedblog_main_image_div}><Image src={Blogdata.image} className={styles.detailedblog_main_image} alt="" width={500} height={500}/></div>
            </div>
            <div className={styles.detailedblog_main_content_div_entire}>
            <div className={styles.detailedblog_main_content_div} dangerouslySetInnerHTML={{__html:Blogdata.bodycontent}}></div>
            </div>
            <div className={styles.blog_comment_section}>
                <h5 className={styles.comment_section_heading}>Comments</h5>
                {commentingState?<></>:<button className={styles.comment_section_addacomment} onClick={()=>{setCommentingState(!commentingState)}}>Add a comment</button>}
                {commentingState?<form className={styles.blogcommentform} onSubmit={userSubmit}>
                <input type="text" name="name" placeholder="Name" value={newcomment.name} onChange={handlechange} required/>
                <textarea name="comment" placeholder="Comment your message"  value={newcomment.comment} onChange={handlechange} required></textarea>
                <div>
                    <button className={styles.comment_section_submit}  type="submit">Submit</button>
                    {commentingState?<button className={styles.comment_section_close} onClick={()=>{setCommentingState(!commentingState)}}>Close</button>:<></>}
                </div>
                </form>:<></>}
                {pagecomments.length!==0?pagecomments.map((item:any)=>{
                    return(
                        <div className={styles.comment_block}>
                            <div className={styles.comment_block_upper}>
                                <h5>{item.name}</h5>
                                <p>{item.publishDate.split('T')[0]}</p>
                            </div>
                            <div className={styles.comment_block_lower}>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    )
                }):<p className={styles.no_comments_block}>No comments ! Be first to add a comment</p>}
            </div>
            </div>
            <div className={styles.blogbox_container_sticky}>
            <div className={styles.blogbox_container}>
                <h5>Latest Posts</h5>
                {data.slice(0,3).map((blog)=>{return(<div className={styles.blogbox_container_blocks}><Blogad blogboxdata={blog}/></div>)})}
            </div>
            </div>
            </div>
            
        </>}
        <Footer/>
        </>
    );
};
export default Blogid;