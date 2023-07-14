import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '@/styles/video_curosel.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
const Video_slider=()=>{
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };
    return (
      <div>
        <div className={styles.video_slider_top}>
            <div className={styles.video_slider_line}></div>
            <h4>OUR VIDEOS</h4>
            <div className={styles.video_slider_line}></div>
          </div>
        <Slider {...settings} className={styles.slider}>
          {videos.map((item:any)=>{
            return(
                <div className={styles.video_curosel}>
                    {<iframe src={`https://www.youtube.com/embed/${item.url}`} allowFullScreen></iframe>}
                </div>
            );
          })}
        </Slider>
      </div>
    );
  }
  const CustomPrevArrow = (props:any) => {
    const { onClick } = props;
    return (
      <button className={styles.prev_arrow} onClick={onClick}>
        ~
      </button>
    );
  };
  
  const CustomNextArrow = (props:any) => {
    const { onClick } = props;
    return (
      <button className={styles.next_arrow} onClick={onClick}>
        ~
      </button>
    );
  };
export default Video_slider;