import styles from '@/styles/home.module.css'
import React from 'react';
import Link from 'next/link';
const Bloghome=(props:any)=>{
    return(
        <>
        <div className={styles.blogbox_con}>
        <div className={styles.blogbox_image}><img className={styles.blogbox_image} src={props.blogboxdata.image} alt=""/></div>
        <Link href={`/blogs/${props.blogboxdata._id}`} className={styles.blogbox_heading}><h3>{props.blogboxdata.title}</h3></Link>
        <p className={styles.content}>{props.blogboxdata.description.slice(0,150)}... <Link href={`/blogs/${props.blogboxdata._id}`} className={styles.blog_viewmore}>Continue reading</Link></p>
        </div>
        </>
    );
}
export default Bloghome;