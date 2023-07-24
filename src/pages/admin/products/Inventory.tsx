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
import AdminNav from "../../../components/AdminNav";
import React from 'react';

interface coupon{
  _id:string,
  amount:number,
  discount:number,
  coupon:string
}

const Inventory = () => {
  let key=1;
  const router=useRouter();
  const [alertmessage_delete,setAlertmessage_delete]:any=useState('');
  const [loader,setLoader]=useState<boolean>(false);
  const [productsdata,setProductsData]:any=useState([]);
  const [coupon,setCoupon]=useState<coupon>({
    _id:'',
    amount:0,
    discount:0,
    coupon:''
  })
  const [couponEdit,setCouponEdit]=useState<boolean>(false);
  const fetchdata= async()=>{
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
      setLoader(false)
    })
}
  const fetchCoupon=async()=>{
    await axios.get('../../api/Coupon/get')
    .then((res)=>{
      setCoupon(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
        fetchdata();
        fetchCoupon();
    },[])
  const handleChange=async(e:any)=>{
    setCoupon((coupon)=>({
      ...coupon,[e.target.name]:e.target.value
    }))
  }
  const handleCouponSubmit=async(e:any)=>{
    e.preventDefault();
    console.log(coupon)
    await axios.patch(`../../api/Coupon/${coupon._id}`,coupon)
    .then((res)=>{
      console.log("Added new coupon");
    })
    .catch((err)=>{
      console.log("Something gone wrong!");
    })
    .finally(()=>{
      setCouponEdit(false)
      fetchCoupon();
    })
  }
  return (
    <AdminRoute>
    <Admin/>
    <div className="admin_nav_adjustment">
    <AdminNav/>
    {couponEdit?<div className={styles.coupon_div}>
      <p>coupon</p>
      <div className={styles.coupon_inputs}>
      <p>Amount above (Rs):</p>
      <input type='number' placeholder="1500" name="amount" value={coupon.amount} onChange={handleChange}/>
      </div>
      <div className={styles.coupon_inputs}>
      <p>Discount percentage (%) :</p>
      <input type='number' placeholder="10" name="discount" value={coupon.discount} onChange={handleChange}/>
      </div>
      <div className={styles.coupon_inputs}>
        <p>Code :</p>
      <input type='text' placeholder="GEN1500" name="coupon" value={coupon.coupon} onChange={handleChange}/>
      </div>
      <button className={styles.coupon_save} onClick={handleCouponSubmit}>Save</button>
    </div>
    :<div className={styles.coupon_div}>
      <p>coupon</p>
      <div className={styles.coupon_inputs}>
      <p>Amount above (Rs):</p>
      <p>{coupon.amount}</p>
      </div>
      <div className={styles.coupon_inputs}>
      <p>Discount percentage (%) :</p>
      <p>{coupon.discount}</p>
      </div>
      <div className={styles.coupon_inputs}>
        <p>Code :</p>
        <p>{coupon.coupon}</p>
      </div>
      <button className={styles.coupon_edit} onClick={()=>{setCouponEdit(true)}}>Edit</button>
    </div>}
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
