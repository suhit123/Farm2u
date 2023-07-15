import Footer from "../components/footer";
import Nav from "../components/nav";
import styles from '@/styles/user/user.module.css';
import Usernav from "./Usernav";
import { Usercheck } from "./check";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from 'react';
const Dashboard = ({addressData}:any) => {
  const router=useRouter();
  const {data:session,status}:any=useSession();
  Usercheck();
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.block}>
          <Usernav/>
          <div className={styles.right_block}>
          <div className={styles.dashboard}>
            <h5>USER DETAILS</h5>
             <table className={styles.table}>
              <tbody>
               <tr >
                   <th className={styles.heading}>First name:</th>
                  <td className={styles.content}>{session?.user?.firstname}</td>
              </tr>
                <tr>
                 <th className={styles.heading}>Last name:</th>
                 <td className={styles.content}>{session?.user?.lastname}</td>
                </tr>
                <tr>
                  <th className={styles.heading}>Email:</th>
                  <td className={styles.content}>{session?.user?.email}</td>
                </tr>
                </tbody>
            </table>
            <h6 className={styles.heading}>Address:</h6>
            {!addressData?<div className={styles.newaddress}><p>Click here to add a new address</p><button className={styles.add_address} onClick={()=>{router.push('/user/Address')}}>New Address</button></div>:<div className={styles.address_block}>
                        <p>{addressData.firstName} {addressData.lastName}</p>
                        <p>{addressData.phoneNumber}</p>
                        <p>{addressData.address}</p>
                        <p>Near {addressData.landmark}</p>
                        <p>{addressData.city}, {addressData.state}, {addressData.pincode}</p>
                        <p>{addressData.country}</p>
            </div>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export async function getServerSideProps(context:GetServerSidePropsContext<ParsedUrlQuery>){
  try{
    const session:any = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const baseUrl = process.env.VERCEL_URL;
    const response = await axios.get(`${baseUrl}/api/users/${session?.user?._id}/addresses`);
    const addressData = response.data.reverse()[0] || [];
    return {
      props: {
        addressData,
      },
    };
  }
  catch(err){
    console.log(err)
    return {
      props:{addressData:[]}
    }
  }
}
export default Dashboard;
