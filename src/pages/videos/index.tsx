import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader';
import Footer from '../../components/footer';
import Nav from '../../components/nav';
import styles from '@/styles/videos.module.css';
interface Video {
  url: string;
}
interface VideosProps {
  initialVideos: Video[];
}
const Videos: React.FC<VideosProps> = ( ) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/Videos')
      .then((res) => {
        setVideos(res.data.reverse());
      })
      .catch((err) => {
        console.log('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Loader time={1000} />
      <Nav />
      {loading ? (
        <>
          <h5 className={styles.heading}></h5>
          <div className={styles.video_container}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
              <div className={styles.video_block_empty} key={index} ></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h5 className={styles.heading}>OUR VIDEOS</h5>
          <div className={styles.video_container}>
            {videos.map((video: Video) => {
              const videoSrc = 'https://www.youtube.com/embed/' + video.url;
              return (
                <div className={styles.video_block} key={video.url}>
                  <iframe src={videoSrc} title="YouTube video player" allowFullScreen></iframe>
                </div>
              );
            })}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

// export async function getServerSideProps() {
//   try {
//     const baseUrl = process.env.VERCEL_URL;
//     const res = await axios.get(`${baseUrl}/api/Videos`);
//     const initialVideos: Video[] = res.data.reverse();
//     return { props: { initialVideos } };
//   } catch (error) {
//     console.log('Something went wrong');
//     return { props: { initialVideos: [] } };
//   }
// }

export default Videos;
