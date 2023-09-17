import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import styles from "@/styles/videos.module.css";
import { VideosProps, Video } from "@/Interfaces/Videos";
import Head from "next/head";
import { NextSeo } from "next-seo";
const Videos: React.FC<VideosProps> = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/Videos")
      .then((res) => {
        setVideos(res.data.reverse());
      })
      .catch((err) => {
        console.log("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
   <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Genmatrix Remedies - Videos"
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Genmatrix Remedies,genmatrix,remedies,gene,matrix,Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's FSSAI, GMP, HACCP, HALAL, ISO, KOSHER",
          },
          {
            name: "distribution",
            content: "global",
          },
          {
            name: "rating",
            content: "general",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
        openGraph={{
          type: "website",
          url: "https://genmatrix.in/videos",
          title: "Genmatrix Remedies - About us",
          images: [
            {
              url:
                "https://user-images.githubusercontent.com/105535366/258575801-4a10d747-83fa-48ae-af92-5027a37eb49c.png",
              width: 600,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <Loader time={1000} />
      <Nav />
      {loading ? (
        <>
          <h5 className={styles.heading}></h5>
          <div className={styles.video_container}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
              <div className={styles.video_block_empty} key={index}></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h5 className={styles.heading}>OUR VIDEOS</h5>
          <div className={styles.video_container}>
            {videos.map((video: Video) => {
              const videoSrc = "https://www.youtube.com/embed/" + video.url;
              return (
                <div className={styles.video_block} key={video.url}>
                  <iframe
                    src={videoSrc}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
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
export default Videos;
