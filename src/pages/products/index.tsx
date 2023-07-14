import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactStars from 'react-stars';
import axios from 'axios';
import Image from 'next/image';
import Footer from '../components/footer';
import Nav from '../components/nav';
import styles from '@/styles/products.module.css';
import { ColorRing } from "react-loader-spinner";
import Loader from '../components/loader';
const Products = () => {
  const { data: session }:any = useSession();// Retrieve session data using next-auth
  const [productsdata, setProductsData]:any = useState([]); // Renamed variable to follow conventions
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});// Removed unnecessary type annotation
  const router = useRouter();
  const [productloading,setProductloading]=useState(false);// Renamed variable to follow conventions
  useEffect(() => {
    const fetchData = async () => {
      setLoading((prevLoading:any) => {
        const newLoading: { [key: string]: boolean } = {};
        productsdata.forEach((item:any) => {
          newLoading[item._id] = true;
        });
        return newLoading;
      });
      setProductloading(true);
      try {
         // Fetch product data from the API
        const res = await axios.get('../api/products');
        const productData = res.data;
        setProductsData(productData);
        console.log(productData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading((prevLoading:any) => {
          const newLoading = { ...prevLoading };
          productsdata.forEach((item:any) => {
            newLoading[item._id] = false;
          });
          return newLoading;
        });
        setProductloading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (productId:any) => {
    if (session) {
      setLoading((prevLoading:any) => {
        return { ...prevLoading, [productId]: true };
      });

      try {
         // Add the product to the cart
        await axios.post('../api/cart/addToCart', { userId: session?.user?._id, productId });
        console.log('Successfully added!');
        router.push('/Cart');
      } catch (err) {
        console.log('Something went wrong!');
      } finally {
        setLoading((prevLoading:any) => {
          return { ...prevLoading, [productId]: false };
        });
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <>
    <Loader time={1000}/>
      <Nav />
      <div className={styles.products_container}>
        <div className={styles.products_page}>
          {productloading?
          // Display placeholders while loading
          [0,1,2,3].map((item:any)=>{
            return(
              <div className={styles.products_list_item_grid} key={item._id}>
                <div className={styles.products_list_item_empty}>
                  <div className={styles.products_list_item_image_empty}>
                  </div>
                  <div className={styles.products_list_items_content}>
                    <div className={styles.p_empty}></div>
                    <div className={styles.h_empty}></div>
                    <div className={styles.hs_empty}></div>
                    <div className={styles.p_empty}></div>
                    <button
                      className={styles.addtocart_products_empty}
                    >
                    </button>
                  </div>
                  <p className={styles.products_page_item_discounttag_empty}></p>
                </div>
              </div>
            );
          })
          :productsdata.map((item:any) => {
            const reviews = item.comments;
            let ratingAddition = 0;
            reviews.forEach((comment:any) => {
              ratingAddition += comment.rating;
            });
            let averageRating = 5;
            averageRating = ratingAddition / reviews.length;
            return (
              <div className={styles.products_list_item_grid} key={item._id}>
                <div className={styles.products_list_item}>
                  <div className={styles.products_list_item_image}>
                    <Image src={item.image1} alt="" width={100} height={100} />
                  </div>
                  <div className={styles.products_list_items_content}>
                    <p>Genmatrix remedies</p>
                    <Link href={`/products/${item._id}`}>
                      <h3>{item.heading}</h3>
                    </Link>
                    <ReactStars count={5} size={24} edit={false} value={averageRating} color2={'#ffd700'} />
                    <h4>
                      <del>Rs. {item.price}</del> Rs. {Math.floor(item.price - (item.discount * item.price) / 100)}
                    </h4>
                    <button
                      className={styles.addtocart_products}
                      onClick={() => addToCart(item._id)}
                      disabled={loading[item._id]}
                    >
                      {loading[item._id] ? <ColorRing
                                            visible={true}
                                            height="30"
                                            width="30"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']}
                                            />: 'ADD TO CART'}
                    </button>
                  </div>
                  <p className={styles.products_page_item_discounttag}>-{item.discount}%</p>
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
