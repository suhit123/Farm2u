import { useEffect, useReducer, useState } from "react";
import styles from '@/styles/publish.module.css'
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import Image from 'next/image'
import successlogo from '@/resources/successicon.png'
import axios from "axios";
import AdminRoute from "../AdminRoute";
import Admin from "..";
import AdminNav from "../AdminNav";
const PublishProduct=()=>{
    const {quill,quillRef}:any=useQuill();
    const [alertmessage_publish,setAlertmessage_publish]:any=useState('');
    const[limitexceed,setLimitexceed]=useState(false);
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
    const [formData, setFormData]:any = useState({
        heading: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        qty:0,
        price:0,
        discount:0,
        description: null
      });
      useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta:any, oldDelta:any, source:any) => {
            setFormData((prevState:any) => ({
                ...prevState,
                description: quillRef.current.firstChild.innerHTML
              }));
          });
        }
        else{
            forceUpdate();
        }
      }, [quill,reducerValue]);
      const handleInputChange = async(e:any) => {
            const { name, value } = e.target;
            setFormData((prevState:any) => ({
            ...prevState,
            [name]: value
        }));
      };
    
      const handlePublish = (e:any) => {
        e.preventDefault();
        const sizeof = require('sizeof');
        const objectSizeBytes = sizeof.sizeof(formData);
        const objectSizeMB = objectSizeBytes / (1024 * 1024); 
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
                            axios.post('../../api/products',formData)
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
                                <p>This product has been posted successfully!</p>
                                <button onClick={()=>{document.location.href='/admin/products/Inventory'}}>Done</button>
                            </div>
                            </div>
                        )}}>Yes</button>
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
        <div><div className={styles.publish_post_form_container}>
            <form onSubmit={handlePublish}>
            <div className={styles.publish_post_form_container_leftbox}>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Heading:
                    <div><input className={styles.publish_blog_input} type="text" name="heading" value={formData.heading} onChange={handleInputChange} required/></div>
                </div >
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Image1:
                    <div>
                    <input
                        className={styles.publish_blog_input}
                        type="text"
                        name="image1"
                        value={formData.image1}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Image2:
                    <div>
                    <input
                        className={styles.publish_blog_input}
                        type="text"
                        name="image2"
                        value={formData.image2}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Image3:
                    <div>
                    <input
                        className={styles.publish_blog_input}
                        type="text"
                        name="image3"
                        value={formData.image3}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Image4:
                    <div>
                    <input
                        className={styles.publish_blog_input}
                        type="text"
                        name="image4"
                        value={formData.image4}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Price:
                    <div><input className={styles.publish_blog_input} type="number" name="price" value={formData.price} onChange={handleInputChange} required/></div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Discount (In percentage %):
                    <div><input className={styles.publish_blog_input} type="number" name="discount" value={formData.discount} onChange={handleInputChange} required/></div>
                </div>
                <div className={styles.publish_post_form_container_leftbox_div}>
                    Quantity:
                    <div><input className={styles.publish_blog_input} type="number" name="qty" value={formData.qty} onChange={handleInputChange} required/></div>
                </div>
                {limitexceed?<p>Exceeded the maximum upload limit i.e 100MB</p>:<></>}
                <div className={styles.publish_post_form_container_leftbox_div}>
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
export default PublishProduct;