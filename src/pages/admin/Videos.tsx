import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminRoute from './AdminRoute';
import Image from 'next/image';
import { faEdit, faTrash ,faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/admin/admintable_managemnt.module.css';
import { useRouter } from 'next/router';
import successlogo from '@/resources/successicon.png'
import Admin from '.';
import nodatafound from '@/resources/no_data_found.png'
import { ColorRing } from 'react-loader-spinner';
import Loader_colorring from '../components/Loader_colorring';
import AdminNav from './AdminNav';
const Blogs=()=>{
    const router=useRouter();
    const [data,setData]:any=useState([]);    
    const [loader,setLoader]=useState(false);
    const [alertmessage_delete,setAlertmessage_delete]:any=useState('');
    const [loading,setLoading]=useState(false);
    let key=1;
    const fetchData=()=>{
      setLoader(true);
        axios.get("../api/Videos")
        .then((res)=>{
             setData(res.data.reverse());
             setLoader(false)
        })
        .catch((err)=>{
            console.log(err);})
            .finally(()=>{
              setLoader(false);
            })
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const [formData, setFormData] = useState({
        media: 'youtube',
        url: '',
      });
    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        setLoading(true);
        try{
            axios.post('/api/Videos',formData)
            .then((res)=>{
                console.log("Uploaded");
            })
            .catch((err)=>{
                console.log("something went wrong!");
            })
            .finally(()=>{
                setLoading(false);
                fetchData();
            })
        }
        catch(err){
            console.log("something went wrong!");
        }
        setFormData({
          media: 'youtube',
          url: '',
        });
      };
    return(
    <AdminRoute> 
    <Admin/>
    <div className={"admin_nav_adjustment"}>
    <AdminNav/>
    <div className={styles.invetory_entire}>
    <h2>Videos</h2>
    <form onSubmit={handleSubmit} className={styles.videoform}>
      <div className={styles.videoform_div1}>
        <label htmlFor="mediaType">Media Type:</label>
        <select className={styles.input1} id="mediaType" name="mediaType" value={formData.media} onChange={handleInputChange} required> 
          <option  value="youtube">YouTube</option>
        </select>
      </div>
      <div className={styles.videoform_div2}>
        <label htmlFor="url">URL:</label>
        <input className={styles.input2} type="text" id="url" name="url" placeholder="Enter URL" value={formData.url} onChange={handleInputChange} required/>
      </div>
      <button className={styles.videoform_submit} type="submit">{loading ? <ColorRing
                                            visible={true}
                                            height="15"
                                            width="15"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#1e2940','#1e2940','#1e2940','#1e2940','#1e2940']}
                                            />: 'Submit'}</button>
    </form>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Media</th>
          <th>URL</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {!loader && data.length!==0?data.map((item:any) => (
          <tr>
            <td>{key++}</td>
            <td>{item.media}</td>
            <td>
                <a href={`https://www.youtube.com/watch?v=${item.url}`}>https://www.youtube.com/embed/{item.url}</a>
            </td>
            <td>
              <button className={styles.deleteButton} onClick={(e:any) => {
                 e.preventDefault();
                 setAlertmessage_delete(
                     <div className={styles.publishalert}>
                         <div className={styles.publish_conformation}>
                             <p>Are you sure you want to delete this post ?</p>
                             <div className={styles.publish_alert_buttons}>
                                 <button className={styles.publish_alert_button1} onClick={()=>{setAlertmessage_delete('')}}>No</button>
                                 <button className={styles.publish_alert_button2} onClick={()=>{
                                     axios.delete(`../api/Videos/${item._id}`)
                                     .then(()=>{
                                         console.log("Deleted successfully!");
                                     })
                                     .catch((err)=>{
                                         console.log("Something went wrong!");
                                     })
                                     setAlertmessage_delete(
                                     <div className={styles.publish_confirm_alert}>
                                     <div className={styles.publish_confirm_redirection}>
                                         <Image src={successlogo} alt=""/>
                                         <p>This blog has been deleted successfully!</p>
                                         <button onClick={()=>{fetchData();
                                                               setAlertmessage_delete('')}}>Done</button>
                                     </div>
                                     </div>
                                 )}}>Yes</button>
                             </div>
                         </div>
                         </div>)}}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </td>
          </tr>
        )):loader && data.length===0?
        <div className={styles.loader}>
        <Loader_colorring/>
        </div>:
        <tr>
          <td colSpan={8}>
          <div className={styles.nodatafound}>
          <Image src={nodatafound} alt="Nothing found"/>
          </div>
          </td>
          </tr>}
      </tbody>
    </table>
    <p className={styles.endofresults}>End of the results</p>
    {alertmessage_delete}
    </div>
    </div>
    </AdminRoute>
    );
}
export default Blogs;