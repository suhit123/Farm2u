import styles from '@/styles/blogbox.module.css'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Blogbox=(props:any)=>{
    return(
        <div className={styles.blogbox_con}>
        <div className={styles.blogbox_image}><Image className={styles.blogbox_image} src={props.blogboxdata.image} alt="" width={100} height={100}/></div>
        <Link href={`/blogs/${props.blogboxdata._id}`} className={styles.blogbox_heading}><h3>{props.blogboxdata.title}</h3></Link>
        <div className={styles.blogbox_details}>
            <p className={styles.companyname}>Genmatrix Remedies</p>
            <p>{props.blogboxdata.publishDate}</p>
        </div>
        <p className={styles.content}>{props.blogboxdata.description.slice(0,150)}... <Link href={`/blogs/${props.blogboxdata._id}`} className={styles.blog_viewmore}>Continue reading</Link></p>
        </div>
    );
}
export default Blogbox;