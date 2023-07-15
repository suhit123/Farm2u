import { useEffect, useReducer, useState } from "react";
import styles from '@/styles/publish.module.css'
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import Image from 'next/image'
import successlogo from '@/resources/successicon.png'
import axios from "axios";
import { useRouter } from 'next/router';
import AdminRoute from "@/pages/admin/AdminRoute";
import Admin from ".";
import AdminNav from "./AdminNav";
const Editblog=()=>{
    const router=useRouter()
    let Blogid=router.query.Blogid;
    const [formData, setFormData]:any = useState({
        title: '',
        publishDate: '',
        image: '',
        category: '',
        description: '',
        bodycontent:null,
        comments:[]
      });
    const {quill,quillRef}:any=useQuill();
    const [alertmessage_publish,setAlertmessage_publish]:any=useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [initialContent,setInitialContent]=useState("");
    const[limitexceed,setLimitexceed]=useState(false);
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
      useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta:any, oldDelta:any, source:any) => {
            setFormData((prevState:any) => ({
                ...prevState,
                bodycontent: quillRef.current.firstChild.innerHTML
              }));
          });
        }
      }, [quill]);
      const fetchData=()=>{
        if (Blogid) {
          axios
            .get(`../../api/Blogs/${Blogid}`)
            .then((res) => {
              setFormData(res.data);
              setInitialContent(res.data.bodycontent);
              const delta = quill.clipboard.convert(res.data.bodycontent);
              quill.setContents(delta);
              console.log(formData)
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      useEffect(() => {
        fetchData();
      }, [Blogid,initialContent,quill]);
        const toBase64 =(file:any)=>new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>resolve(reader.result);
        reader.onerror=(error)=>reject(error);
        })
      const handleInputChange = async(e:any) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            setSelectedImage(file);
            if (file) {
              const reader:any = new FileReader();
              reader.onloadend = () => {
                console.log(reader.result)
                setFormData((prevState:any) => ({
                    ...prevState,
                    image:reader.result
                }));
              };
              reader.readAsDataURL(file);
            }
        } 
        else {
            const { name, value } = e.target;
            setFormData((prevState:any) => ({
            ...prevState,
            [name]: value
        }));
    }
      };
    
      const handlePublish = (e:any) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const sizeof = require('sizeof');
        const objectSizeBytes = sizeof.sizeof(formData);
        const objectSizeMB = objectSizeBytes / (1024 * 1024); // Convert bytes to megabytes
        console.log(objectSizeMB);
        if(objectSizeMB<=100){
        setAlertmessage_publish(
            <div className={styles.publishalert}>
                <div className={styles.publish_conformation}>
                    <p>Are you sure you want to edit this post ?</p>
                    <div className={styles.publish_alert_buttons}>
                        <button className={styles.publish_alert_button1} onClick={()=>{setAlertmessage_publish('')}}>No</button>
                        <button className={styles.publish_alert_button2} onClick={()=>{
                            console.log(formData)
                            axios.patch(`../api/Blogs/${Blogid}`,formData)
                            .then(()=>{
                                console.log("posted successfully!");
                            })
                            .catch((err)=>{
                                console.log("Something went wrong!");
                            })
                            setAlertmessage_publish(
                            <div className={styles.publish_confirm_alert}>
                            <div className={styles.publish_confirm_redirection}>
                                <Image src={successlogo} alt=""/>
                                <p>This blog has been edited successfully!</p>
                                <button onClick={()=>{document.location.href='/admin/Blogs'}}>Done</button>
                            </div>
                            </div>
                        )}}>Yes</button>
                    </div>
                </div>
                </div>
        )}
        else{
            console.log("Limit exceeded");
            setLimitexceed(true);
        }
      };
    return(
        <AdminRoute>
        <Admin/>
        <div className={"admin_nav_adjustment"}>
        <AdminNav/>
        <div><div className={styles.publish_post_form_container}>
            <form onSubmit={handlePublish}>
            <div className={styles.publish_post_form_container_leftbox}>
                <div>
                    Title:
                    <div><input className={styles.publish_blog_input} type="text" name="title" value={formData.title} onChange={handleInputChange} /></div>
                </div>
                <div>
                    Publish Date:
                    <div><input className={styles.publish_blog_input} type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} /></div>
                </div>
                <div>
                    Image:
                    <div><input className={styles.publish_blog_input} type="file" name="image" accept="image/*" onChange={handleInputChange} /></div>
                </div>
                <div>
                    Description:
                    <div><textarea className={styles.publish_blog_textarea} name="description" value={formData.description} onChange={handleInputChange} /></div>
                </div>
                {limitexceed?<p>Exceeded the maximum upload limit i.e 100MB</p>:<></>}
                <div>
                    <button type="submit" className={styles.publish_blog_submit} >Publish</button>
                </div>
            </div>
            </form>
            <div className={styles.quilljs}>
                <div ref={quillRef}/>
            </div>
        </div>
        {formData.comments.length!==0?<div className={styles.comments_edit}>
        <h5 style={{textAlign:"center",fontSize:"15px",margin:"15px"}}>Comments</h5>

        <table>
              <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Date</th>
                <th>Comment</th>
                <th>Options</th>
              </thead>
              <tbody>{formData.comments.map((item:any)=>{
          return(
                <tr>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.publishDate}</td>
                  <td>{item.comment}</td>
                  <td><button onClick={()=>{
                    try{
                      axios.delete(`/api/Blogs/${Blogid}/comments/${item._id}`)
                      .then((res)=>{
                        console.log("Successfully deleted");
                        fetchData();
                      })
                      .catch((err)=>{
                        console.log("Something went wrong!");
                      })
                    }
                    catch(err){
                      if(window){
                        window.alert("Something went wrong");
                      }
                    }
                  }}>Delete</button></td>
                </tr>
        );
        })}
        </tbody>
        </table></div>:<p style={{textAlign:"center"}}>No comments!</p>}
        {alertmessage_publish}
        </div>
        </div>
        </AdminRoute>
    );
}
export default Editblog;