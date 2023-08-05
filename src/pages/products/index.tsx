import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-stars";
import axios from "axios";
import Image from "next/image";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import styles from "@/styles/products.module.css";
import Loader from "../../components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { products } from "@/Interfaces/Products";
import { NextSeo } from "next-seo";
import Head from "next/head";
const Products = () => {
  const { data: session }: any = useSession();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const [productsData, setProductData] = useState<products[]>([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProductData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addToCart = async (productId: any) => {
    if (session) {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [productId]: true,
      }));

      try {
        await axios.post("../api/cart/addToCart", {
          userId: session?.user?._id,
          productId,
        });
        console.log("Successfully added!");
        router.push("/Cart");
      } catch (err) {
        console.log("Something went wrong!");
      } finally {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [productId]: false,
        }));
      }
    } else {
      router.push("/signup");
    }
  };
  return (
    <>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
      title="Genmatrix Remedies - Products"
      description="Discover a wide range of nutraceutical supplements at Genmatrix Remedies. Our products aim to empower you in your journey towards a healthier, happier life by providing essential minerals and nutrients. Join us in promoting health and well-being."
      additionalMetaTags={[{
        property:'keywords',
        content:"Genmatrix Remedies,genmatrix,remedies,gene,matrix,Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's,Ignite,Turmax"
      },{
        name:"distribution",
        content:"global"
      },{
        name:"rating",
        content:"general"
      },{
        name:"viewport",
        content:"width=device-width, initial-scale=1"
      }]}
      openGraph={{
        type: 'website',
        url: 'https://genmatrix.vercel.app/products',
        title: 'Genmatrix Remedies - Products',
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
      <Loader time={1000} />
      <Nav />
      <div className={styles.products_container}>
        <div className={styles.products_page}>
          {productsData.length === 0
            ? [0, 1, 2, 3].map((item: any, Index: Number) => {
                return (
                  <div
                    className={styles.products_list_item_grid}
                    key={item._id}
                  >
                    <div className={styles.products_list_item_empty}>
                      <div
                        className={styles.products_list_item_image_empty}
                      ></div>
                      <div className={styles.products_list_items_content}>
                        <div className={styles.p_empty}></div>
                        <div className={styles.h_empty}></div>
                        <div className={styles.hs_empty}></div>
                        <div className={styles.p_empty}></div>
                        <button
                          className={styles.addtocart_products_empty}
                        ></button>
                      </div>
                      <p
                        className={styles.products_page_item_discounttag_empty}
                      ></p>
                    </div>
                  </div>
                );
              })
            : productsData.map((item: any, index: number) => {
                const reviews = item.comments;
                let ratingAddition = 0;
                reviews.forEach((comment: any) => {
                  ratingAddition += comment.rating;
                });
                let averageRating = 5;
                averageRating = ratingAddition / reviews.length;
                return (
                  <div
                    className={styles.products_list_item_grid}
                    key={item._id}
                  >
                    <div className={styles.products_list_item}>
                      <div className={styles.products_list_item_image}>
                        <Image
                          src={item.image1}
                          alt=""
                          width={5000}
                          height={5000}
                        />
                      </div>
                      <div className={styles.products_list_items_content}>
                        <p>Genmatrix remedies</p>
                        <Link href={`/products/${item._id}`}>
                          <h3>{item.heading}</h3>
                        </Link>
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={averageRating}
                          color2={"#ffd700"}
                        />
                        <h4>
                          <del>Rs. {item.price}</del> Rs.{" "}
                          {Math.floor(
                            item.price - (item.discount * item.price) / 100
                          )}
                        </h4>
                        {item?.qty < 1 ? (
                          <button className={styles.addtocart_products}>
                            OUT OF STOCK
                          </button>
                        ) : (
                          <button
                            className={styles.addtocart_products}
                            onClick={() => addToCart(item._id)}
                            disabled={loading[item._id]}
                          >
                            {loading[item._id] ? (
                              <FontAwesomeIcon
                                icon={faSpinner}
                                className="fa-spin"
                              />
                            ) : (
                              "ADD TO CART"
                            )}
                          </button>
                        )}
                      </div>
                      <p className={styles.products_page_item_discounttag}>
                        -{item.discount}%
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Products;