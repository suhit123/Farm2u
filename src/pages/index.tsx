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
import Blogbox from './components/blogbox'
import Blogad from './components/Blogad'
import Video_slider from './components/Slider_video'
import dynamic from 'next/dynamic';
import Bloghome from './components/Bloghome'
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
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
  return (
    <>
      <Head>
        <title>Genmatrix Remedies</title>
        <meta name="description" content="Generated by create next app" />
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
         {blogdata.length!==0?blogdata.slice(0,4).map((blog)=>{return(<div className={styles.blogbox_container_blocks}><Bloghome blogboxdata={blog}/></div>)}):
         [0,1,2].map(()=>{
          return(<div className={styles.blogbox_con_empty}>
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
