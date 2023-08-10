import pagenotfound from "@/resources/Pagenotfound_image.jpg";
import styles from "@/styles/custom404.module.css";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
const Custom404 = () => {
  const router = useRouter();
  return (
    <div className={styles.pagenotfound}>
      <NextSeo
      title="Page not found"
      description="Discover a wide range of nutraceutical supplements at Genmatrix Remedies. Our products aim to empower you in your journey towards a healthier, happier life by providing essential minerals and nutrients. Join us in promoting health and well-being."
      nofollow={true}
      noindex={true}
    />
      <Image src={pagenotfound} alt="" width={5000} height={5000} />
      <p>The page you're looking for does not exist.</p>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        GO HOME
      </button>
    </div>
  );
};

export default Custom404;
