import Head from 'next/head'
import Nav from './components/nav'
import Footer from './components/footer'
import Loader from './components/loader'
import styles from '@/styles/home.module.css'
import Image from 'next/image'
import fssai from '@/resources/certifications/fssai.png';
import GMP from '@/resources/certifications/GMP.jpg';
import HACCP from '@/resources/certifications/HACCP.jpeg';
import HALAL from '@/resources/certifications/HALAL.jpg';
import ISO from '@/resources/certifications/ISO.jpeg';
import KOSHER from '@/resources/certifications/KOSHER.jpeg';
import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Video_slider from './components/Slider_video'
import bloghomestyles from '@/styles/home.module.css'
import React from 'react';
export default function Home() {
  const [blogdata,setBlogData]=useState([]);
    useEffect(()=>{
        axios.get("../api/Blogs")
        .then((res)=>{
             setBlogData(res.data);

        })
        .catch((err)=>{
            console.log(err);})
    },[]);

  return (
    <>
      <Head>
        <title>Genmatrix Remedies</title>
        <meta name="description" content="We, at GENMATRIX REMEDIES, strive to build a bond of Love and Trust with our valued customers worldwide. With our range of nutraceutical supplements, we aim to empower you in your journey towards a healthier, happier life. With a means to reestablish the significant minerals and nutrients back into your body. Our division has built up a wide scope of indispensable nutraceutical supplements that plays an important role in promoting your health and well-being of your loved ones. By providing a combination of nutritional and pharmaceutical benefits. These products are derived from natural sources and are formulated to provide specific health benefits beyond basic nutrition. Let's embark on this path together!" />
        <meta name="keywords" content="Genmatrix Remedies, Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's FSSAI, GMP, HACCP, HALAL, ISO, KOSHER" />
        <meta name="distribution" content="global" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
    <Loader time={1000}/>
    <div className={styles.entire_landing_page}>
         <Nav/>
         <div className={styles.landing_content}>
            <div className={styles.landing_content_block}><h2>Welcome to</h2>
            <h3><Typewriter
            options={{
              autoStart:true,
              loop:true,
              delay:100,
              strings:[
                "GENMATRIX REMEDIES"
              ]
            }}
            ></Typewriter></h3>
            <p>Marching Towards Gene Matrix</p>
            </div>
         </div>
         <div className={styles.landingpage_blogs}>
         <div className={styles.blogs_top}>
            <div className={styles.blogs_line}></div>
            <h4>OUR BLOGS</h4>
            <div className={styles.blogs_line}></div>
          </div>
         <div className={styles.blogbox_container}>
         {blogdata.length!==0?blogdata.slice(0,4).map((blog:any,index: number)=>{return(<div className={styles.blogbox_container_blocks} key={index}>
          <div className={bloghomestyles.blogbox_con}>
        <div className={bloghomestyles.blogbox_image}><img className={bloghomestyles.blogbox_image} src={blog.image} alt=""/></div>
        <Link href={`/blogs/${blog._id}`} className={bloghomestyles.blogbox_heading}><h3>{blog.title}</h3></Link>
        <p className={bloghomestyles.content}>{blog.description.slice(0,150)}... <Link href={`/blogs/${blog._id}`} className={bloghomestyles.blog_viewmore}>Continue reading</Link></p>
        </div>
         </div>)}):
         [0,1,2].map((index: number)=>{
          return(<div className={styles.blogbox_con_empty} key={index}>
         <div className={styles.blogbox_image_empty}></div>
         <div className={styles.blogbox_heading_empty}></div>
         <div className={styles.content_empty}></div>
         </div>)})}
          </div>
          <Link href="/blogs"><button className={styles.landing_blog_seemore}>See More</button></Link>
          </div>
          <Video_slider/>
         <div className={styles.company_certifications}>
          <div className={styles.company_certifications_top}>
            <div className={styles.company_certifications_line}></div>
            <h4>OUR CERTIFICATIONS</h4>
            <div className={styles.company_certifications_line}></div>
          </div>
            <div className={styles.company_certifications_images}>
              <Image src={fssai} alt=""/>
              <Image src={GMP} alt=""/>
              <Image src={HACCP} alt=""/>
              <Image src={HALAL} alt=""/>
              <Image src={ISO} alt=""/>
              <Image src={KOSHER} alt=""/>
          </div>
          </div>
          <div className={styles.contact_us_banner}>
            <div className={styles.contact_us_banner_block}>
              <h3>We'd love to hear from you</h3>
            <p>whether you had a question about product, pricing, or anything else, we are ready to answer all your questions.</p>
            <Link href="/contactus"><button>Contact us</button></Link>
            </div>
          </div>
         <Footer/>
    </div>
    </main> 
    </>
  )
}
