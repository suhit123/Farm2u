import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import Loader from "../components/loader";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import fssai from "@/resources/certifications/fssai.png";
import GMP from "@/resources/certifications/GMP.jpg";
import HACCP from "@/resources/certifications/HACCP.jpeg";
import HALAL from "@/resources/certifications/HALAL.jpg";
import ISO from "@/resources/certifications/ISO.jpeg";
import KOSHER from "@/resources/certifications/KOSHER.jpeg";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import axios from "axios";
import Video_slider from "../components/Slider_video";
import bloghomestyles from "@/styles/home.module.css";
import React from "react";
import { Blog } from "@/Interfaces/Blogs";
import Marquee from "react-fast-marquee";
import img1 from '@/resources/gallery/img1.jpg'
import img2 from '@/resources/gallery/truying.jpg'
import img3 from '@/resources/gallery/img3.jpg'
import img4 from '@/resources/gallery/img4.jpg'
import img5 from '@/resources/gallery/img5.jpg'
import img6 from '@/resources/gallery/img6.jpg'
import img7 from '@/resources/gallery/img7.jpg'
import dna_back from '@/resources/dna_back.jpg'
import {
  faCameraRetro
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyimage from "@/resources/emptyimage.png";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
export default function Home() {
  const router:any=useRouter();
  const [blogdata, setBlogData] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get("../api/Blogs?start=0&end=2")
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
      title="Genmatrix Remedies - Nutraceutical Supplements for a Healthier Life"
      description="Discover a wide range of nutraceutical supplements at Genmatrix Remedies. Our products aim to empower you in your journey towards a healthier, happier life by providing essential minerals and nutrients. Join us in promoting health and well-being."
      additionalMetaTags={[{
        property:'keywords',
        content:"Genmatrix Remedies,genmatrix,remedies,gene,matrix,Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's FSSAI, GMP, HACCP, HALAL, ISO, KOSHER"
      },{
        name:"viewport",
        content:"width=device-width, initial-scale=1"
      }]}
      openGraph={{
        type: 'website',
        url: 'https://genmatrix.in/',
        title: 'Genmatrix Remedies - Nutraceutical Supplements for a Healthier Life',
        description: 'Discover a wide range of nutraceutical supplements at Genmatrix Remedies. Our products aim to empower you in your journey towards a healthier, happier life by providing essential minerals and nutrients. Join us in promoting health and well-being.',
        images: [
          {
            url: "https://user-images.githubusercontent.com/105535366/258575801-4a10d747-83fa-48ae-af92-5027a37eb49c.png",
            width: 600,
            height: 600,
            alt: 'Og Image Alt',
          }
        ],
      }}
    />
      <main>
        <Loader time={1000} />
        <div className={styles.entire_landing_page}>
          <Nav />
          <div className={styles.landing_content}>
            <div className={styles.landing_content_block}>
              <h2>Welcome to</h2>
              <h3>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    strings: ["GENMATRIX REMEDIES"],
                  }}
                ></Typewriter>
              </h3>
              <p>Marching Towards Gene Matrix</p>
            </div>
          </div>
          <div className={styles.products_top}>
              <div className={styles.products_line}></div>
              <h4>OUR PRODUCTS</h4>
              <div className={styles.products_line}></div>
            </div>
          <div className={styles.landingPage_Products}>
            <div className={styles.product_blocks}>
              <Image src={img1} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>ZIPPER | The Miracle Healer</h5>
                <button onClick={()=>{router.push('/products/64c008fc228fa3c2c29607dd')}}>VIEW</button>
              </div>
            </div>
            <div className={styles.product_blocks}>
              <Image src={img2} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>TRUYNG | That Turns To Your Younger Days</h5>
                <button onClick={()=>{router.push('/products/64b29866dd82f1e5842e817c')}}>VIEW</button>
              </div>
            </div>
            <div className={styles.product_blocks}>
              <Image src={img3} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>ROREND or SNOOZER | THE ROYAL GATEWAY THAT ENDS THE RUBBISH ROAR</h5>
                <button onClick={()=>{router.push('/products/64b293c476ffdcafe799fd2b')}}>VIEW</button>
              </div>
            </div>
            <div className={styles.product_blocks}>
              <Image src={img7} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>IGNITE | It fans the spark in u</h5>
                <button onClick={()=>{router.push('/products/64cbd52dd30a088c117c1a7d')}}>VIEW</button>
              </div>
            </div>
            <div className={styles.product_blocks}>
              <Image src={img5} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>TURMAX | THAT TURNS & MAXIMIZES TO YOUR TEENS</h5>
                <button onClick={()=>{router.push('/products/64b296dadd82f1e5842e807c')}}>VIEW</button>
              </div>
            </div>
            <div className={styles.product_blocks}>
              <Image src={img6} alt=""/>
              <div className={styles.product_hover_div}>
                <h5>GOWISTRUM</h5>
                <button onClick={()=>{router.push('/products/64b298c3dd82f1e5842e8180')}}>VIEW</button>
              </div>
            </div>
          </div>
          <div className={styles.landingpage_blogs}>
            <div className={styles.blogs_top}>
              <div className={styles.blogs_line}></div>
              <h4>OUR BLOGS</h4>
              <div className={styles.blogs_line}></div>
            </div>
            <div className={styles.blogbox_container}>
              {blogdata.length !== 0
                ? blogdata.slice(0, 4).map((blog: Blog, index: number) => {
                    return (
                      <div
                        className={styles.blogbox_container_blocks}
                        key={index}
                      >
                        <div className={bloghomestyles.blogbox_con}>
                          <div className={bloghomestyles.blogbox_image}>
                            <img
                              className={bloghomestyles.blogbox_image}
                              src={blog.image}
                              alt=""
                            />
                          </div>
                          <Link
                            href={`/blogs/${blog._id}`}
                            className={bloghomestyles.blogbox_heading}
                          >
                            <h3>{blog.title}</h3>
                          </Link>
                          <p className={bloghomestyles.content}>
                            {blog.description.slice(0, 150)}...{" "}
                            <Link
                              href={`/blogs/${blog._id}`}
                              className={bloghomestyles.blog_viewmore}
                            >
                              Continue reading
                            </Link>
                          </p>
                        </div>
                      </div>
                    );
                  })
                : [0, 1, 2].map((index: number) => {
                    return (
                      <div className={styles.blogbox_con_empty} key={index}>
                        <div className={styles.blogbox_image_empty}></div>
                        <div className={styles.blogbox_heading_empty}></div>
                        <div className={styles.content_empty}></div>
                      </div>
                    );
                  })}
            </div>
            <Link href="/blogs">
              <button className={styles.landing_blog_seemore}>See More</button>
            </Link>
          </div>
          <Video_slider />
          <div className={styles.company_certifications}>
            <div className={styles.company_certifications_top}>
              <div className={styles.company_certifications_line}></div>
              <h4>OUR CERTIFICATIONS</h4>
              <div className={styles.company_certifications_line}></div>
            </div>
            <div className={styles.company_certifications_images}>
              <Image src={fssai} alt="" width={100} height={100}/>
              <Image src={GMP} alt="" width={100} height={100}/>
              <Image src={HACCP} alt="" width={100} height={100}/>
              <Image src={HALAL} alt="" width={100} height={100}/>
              <Image src={ISO} alt="" width={100} height={100}/>
              <Image src={KOSHER} alt="" width={100} height={100}/>
            </div>
          </div>
          <div className={styles.image_gallery}><div className={styles.image_gallery_curosel}>
            <h4><FontAwesomeIcon icon={faCameraRetro}/> PRODUCT GALLERY</h4>
            <p>With our range of nutraceutical supplements, we aim to empower you in your journey towards a healthier, happier life. </p>
              <Marquee speed={40}>
              <Image src={img1} alt="" width={500} height={500}/>
              <Image src={img2} alt="" width={500} height={500}/>
              <Image src={img3} alt="" width={500} height={500}/>
              <Image src={img4} alt="" width={500} height={500}/>
              <Image src={img5} alt="" width={500} height={500}/>
              <Image src={img6} alt="" width={500} height={500}/>  
              </Marquee>
          </div>
          </div>
          <div className={styles.contact_us_banner}>
            <div className={styles.contact_us_banner_block}>
              <h3>We'd love to hear from you</h3>
              <p>
                whether you had a question about product, pricing, or anything
                else, we are ready to answer all your questions.
              </p>
              <Link href="/contactus">
                <button>Contact us</button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
