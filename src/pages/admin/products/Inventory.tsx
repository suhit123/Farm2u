import { faEdit, faTrash ,faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/admin/admintable_managemnt.module.css';
import Admin from "..";
import AdminRoute from "../AdminRoute";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import successlogo from '@/resources/successicon.png'
import Loader_colorring from "@/components/Loader_colorring";
import nodatafound from '@/resources/no_data_found.png'
import AdminNav from "../AdminNav";
import React from 'react';
const Inventory = () => {
  let key=1;
  const router=useRouter();
  const [alertmessage_delete,setAlertmessage_delete]:any=useState('');
  const [loader,setLoader]=useState(false);
  const [productsdata,setProductsData]:any=useState([]);
  const [loading,setLoading]=useState(false);
  const fetchdata= async()=>{
    setLoading(true);
    setLoader(true)
    await axios.get('../../api/products',)
    .then((res)=>{
        const productdata=res.data;
        setProductsData(productdata);
        console.log(productdata)
        setLoader(false)
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
      setLoading(false);
      setLoader(false)
    })
}  
  useEffect(()=>{
        fetchdata();
    },[])
  return (
    <AdminRoute>
    <Admin/>
    <div className="admin_nav_adjustment">
    <AdminNav/>
    <div className={styles.invetory_entire}>
    <h2>Products</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Product</th>
          <th>Price (In Rs.)</th>
          <th>Discount Price (In Rs.)</th>
          <th>Quantity</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {!loader && productsdata.length!==0? productsdata.map((item:any,index: number) => (
          <tr key={index}>
            <td>{key++}</td>
            <td>{item.heading}</td>
            <td>{item.price}</td>
            <td>{(item.price-(item.discount*item.price/100))}</td>
            <td>{item.qty}</td>
            <td>
              <button className={styles.editButton} onClick={() => {router.push(`/products/${item._id}`)}}>
                <FontAwesomeIcon icon={faEye} /> View
              </button>
            </td>
            <td>
              <button className={styles.editButton} onClick={() => {
                router.push(`/admin/products/${item._id}`)
              }}>
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
                                     axios.delete(`../../api/products/${item._id}`)
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
                                         <button onClick={()=>{fetchdata()
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
        )):loader && productsdata.length===0?
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
    <p>End of the results</p>
    <button className={styles.add_new} onClick={()=>{
      router.push('/admin/products/PublishProduct')
    }}>Add Product</button>
    </div>
    {alertmessage_delete}
    </div>
    </AdminRoute>
  );
};

export default Inventory;
