import React from 'react';
import Footer from '../components/footer';
import Nav from '../components/nav';
import styles from '@/styles/videos.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader';
const Videos = () => {
  const [videos,setVideos]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    try{
      axios.get('/api/Videos')
      .then((res)=>{
        setVideos(res.data.reverse())
      })
      .catch((err)=>{
        console.log("Something went wrong")
      })
      .finally(()=>{
        setLoading(false);
      })
    }
    catch(err){
      console.log("Something went wrong")
    }
  },[])
  return (
    <>
      <Loader time={1000}/>
      <Nav />
      {loading?
      <><h5 className={styles.heading}></h5>
      <div className={styles.video_container}>
        {[1,2,3,4,5,6,7,8,9].map((videoId) => (
          <div className={styles.video_block_empty} key={videoId}>
            
          </div>
        ))}
      </div></>:
      <><h5 className={styles.heading}>OUR VIDEOS</h5>
      <div className={styles.video_container}>
        {
        videos.map((videoId:any) => {
          const viderosrc="https://www.youtube.com/embed/"+videoId.url;
          return(
          <div className={styles.video_block} key={videoId}>
            <iframe  src={viderosrc}  title="YouTube video player"  allowFullScreen></iframe>
          </div>)
    })}
      </div></>}
      <Footer />
    </>
  );
};

export default Videos;
