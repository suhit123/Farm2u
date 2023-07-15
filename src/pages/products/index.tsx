import { useEffect, useState } from 'react';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactStars from 'react-stars';
import axios from 'axios';
import Image from 'next/image';
import Footer from '../components/footer';
import Nav from '../components/nav';
import styles from '@/styles/products.module.css';
import Loader from '../components/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
interface Product {
  _id: string;
  image1: string;
  comments: Comment[];
  heading: string;
  price: number;
  discount: number;
}
const Products = ({ productsData }: { productsData: Product[] }) => {
  const { data: session }:any = useSession();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const addToCart = async (productId:any) => {
    if (session) {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [productId]: true,
      }));

      try {
        await axios.post('../api/cart/addToCart', {
          userId: session?.user?._id,
          productId,
        });
        console.log('Successfully added!');
        router.push('/Cart');
      } catch (err) {
        console.log('Something went wrong!');
      } finally {
        setLoading((prevLoading) => ({
          ...prevLoading,
          [productId]: false,
        }));
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Loader time={1000} />
      <Nav />
      <div className={styles.products_container}>
        <div className={styles.products_page}>
          {productsData.map((item:any) => {
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
                    <Image src={item.image1} alt="" width={5000} height={5000} />
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
                      {loading[item._id] ? (<FontAwesomeIcon icon={faSpinner} className="fa-spin" />) : (
                        'ADD TO CART'
                      )}
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

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.VERCEL_URL; // Update with your actual base URL
    const res = await axios.get(`${baseUrl}/api/products`);
    const productsData = res.data;
    return {
      props: { productsData },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { productsData: [] },
    };
  }
}

export default Products;
