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
import Loader_colorring from '../../components/Loader_colorring';
import nodatafound from '@/resources/no_data_found.png'
import AdminNav from './AdminNav';
import React from 'react';
const Blogs=()=>{
    const router=useRouter();
    const [data,setData]:any=useState([]);
    const [loader,setLoader]=useState(false);
    const [alertmessage_delete,setAlertmessage_delete]:any=useState('');
    let key=1;
    const fetchData=()=>{
      setLoader(true);
      axios.get("../api/Blogs")
      .then((res)=>{
           setData(res.data);
           setLoader(false)
      })
      .catch((err)=>{
          console.log(err);})
        .finally(()=>{
          setLoader(false)
        })
    }
    useEffect(()=>{
       fetchData();
    },[]);
    return(
    <AdminRoute>
    <Admin/>
    <div className={"admin_nav_adjustment"}>
    <AdminNav/>
    <div className={styles.invetory_entire}>
    <h2>Blogs</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Publish Date</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {!loader && data.length!==0?data.map((item:any,index: number) => (
          <tr key={index}>
            <td>{key++}</td>
            <td>{item.title}</td>
            <td>{item.publishDate}</td>
            <td>
              <button className={styles.viewButton} onClick={() =>{router.push(`/blogs/${item._id}`)}}>
                <FontAwesomeIcon icon={faEye} /> View
              </button>
            </td>
            <td>
              <button className={styles.editButton} onClick={() => {router.push(`/admin/${item._id}`)}}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
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
                                     axios.delete(`../api/Blogs/${item._id}`)
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
                                         <button onClick={()=>{fetchData()
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
        </div>
      :
      <tr>
        <td colSpan={8}>
        <div className={styles.nodatafound}>
        <Image src={nodatafound} alt="Nothing found"/>
        </div>
        </td>
        </tr>}
      </tbody>
    </table>
    <p>End of the results</p>
    <button className={styles.add_new} onClick={()=>{router.push('/admin/Publishblog')}}>Add Blog</button>
    {alertmessage_delete}
    </div>
    </div>
    </AdminRoute>
    );
}
export default Blogs;