import { useEffect, useReducer, useState } from "react";
import styles from '@/styles/publish.module.css'
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import Image from 'next/image'
import successlogo from '@/resources/successicon.png'
import axios from "axios";
import AdminRoute from "./AdminRoute";
import Admin from ".";
import AdminNav from "./AdminNav";
import React from 'react';
const Publishblog=()=>{
    const {quill,quillRef}:any=useQuill();
    const [alertmessage_publish,setAlertmessage_publish]:any=useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const[limitexceed,setLimitexceed]=useState(false);
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
    const [formData, setFormData]:any = useState({
        title: '',
        publishDate: '',
        image: '',
        category: '0',
        description: '',
        bodycontent:null
      });
      useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta:any, oldDelta:any, source:any) => {
            setFormData((prevState:any) => ({
                ...prevState,
                bodycontent: quillRef.current.firstChild.innerHTML
              }));
          });
        }
        else{
            forceUpdate();
        }
      }, [quill,reducerValue]);
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
        setLimitexceed(false)
        setAlertmessage_publish(
            <div className={styles.publishalert}>
                <div className={styles.publish_conformation}>
                    <p>Are you sure you want to publish this post ?</p>
                    <div className={styles.publish_alert_buttons}>
                        <button className={styles.publish_alert_button1} onClick={()=>{setAlertmessage_publish('')}}>No</button>
                        <button className={styles.publish_alert_button2} onClick={()=>{
                            console.log(formData)
                            axios.post('../api/Blogs',formData)
                            .then(()=>{
                                console.log("posted successfully!");
                                setAlertmessage_publish(
                                    <div className={styles.publish_confirm_alert}>
                                    <div className={styles.publish_confirm_redirection}>
                                        <Image src={successlogo} alt=""/>
                                        <p>This blog has been posted successfully!</p>
                                        <button onClick={()=>{document.location.href='/admin/Blogs'}}>Done</button>
                                    </div>
                                    </div>
                                )
                                axios.post('/api/SMTP/Blogadded',formData)
                                .then((res)=>{
                                    console.log("Mails sent")
                                })
                                .catch((err)=>{
                                    console.log("Mails sending failed")
                                })
                            })
                            .catch((err)=>{
                                console.log("Something went wrong!");
                            })
                    }}>Yes</button>
                    </div>
                </div>
                </div>
        )}
        else{
            console.log("Limit exceeded")
            setLimitexceed(true);
        }
      };
    return(
        <AdminRoute>
        <Admin/>
        <div className={"admin_nav_adjustment"}>
        <AdminNav/>
        <div>
            <div className={styles.publish_post_form_container}>
            <form onSubmit={handlePublish}>
            <div className={styles.publish_post_form_container_leftbox}>
                <div>
                    Title:
                    <div><input className={styles.publish_blog_input} type="text" name="title" value={formData.title} onChange={handleInputChange} required/></div>
                </div>
                <div>
                    Publish Date:
                    <div><input className={styles.publish_blog_input} type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} required/></div>
                </div>
                <div>
                    Image:
                    <div><input className={styles.publish_blog_input} type="file" name="image" accept="image/*" onChange={handleInputChange} required/></div>
                </div>
                <div>
                    Summary:
                    <div><textarea className={styles.publish_blog_textarea} name="description" value={formData.description} onChange={handleInputChange} required/></div>
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
        {alertmessage_publish}
        </div>
        </div>
        </AdminRoute>
    );
}
export default Publishblog;