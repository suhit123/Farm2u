import axios from "axios";
import { Usercheck } from "./check";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Nav from "./../components/nav";
import Usernav from "./Usernav";
import Footer from "./../components/footer";
import styles from "@/styles/user/user.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Loader_colorring from "./../components/Loader_colorring";
import nodatafound from "@/resources/no_data_found.png";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
const Orders = ({ orders }: { orders: Order[] }) => {
  Usercheck()
  const [loader, setLoader] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<boolean[]>(new Array(orders.length).fill(false));
  const toggleExtendedDiv = (index:any) => {
    const expandedCopy = [...expandedOrders];
    expandedCopy[index] = !expandedCopy[index];
    setExpandedOrders(expandedCopy);
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.block}>
          <Usernav />
          <div className={styles.right_block}>
            <div className={styles.orders}>
              <h5>Orders</h5>
              {!loader ? (
              orders.length !== 0 ? (
                orders.map((item:Order, index:any) => {
                  return (
                    <div className={styles.orders_div} key={item._id}>
                      <p className={styles.order_id}>Order ID : {item._id}</p>
                      <div className={styles.orders_blocks}>
                        <p className={styles.order_date}>
                          Date : {item.createdAt.split("T")[0]}
                        </p>
                        {item.products.map((i:any) => {
                          console.log(i)
                          return (
                            <div
                              className={styles.order_block_products}
                              key={i._id}
                            >
                              <Image
                                src={i.productId.image1}
                                alt="image"
                                width={100}
                                height={100}
                              />
                              <div className={styles.order_block_product}>
                                <h6>{i.productId.heading}</h6>
                                <p>Qty : {i.quantity}</p>
                                <p>Price (1pc) : {i.price}</p>
                              </div>
                            </div>
                          );
                        })}
                        <p className={styles.statusbar}>Status : <span>{item.status==="pending"?<>Processing</>:item.status==="cancelled"?<>Cancelled</>:<>Completed</>}</span></p>
                        <button
                          onClick={() => toggleExtendedDiv(index)}
                        >
                          {!expandedOrders[index]?<>Show details{" "}
                          <FontAwesomeIcon
                            icon={faChevronDown}
                          /></>:<>Show less{" "}
                          <FontAwesomeIcon
                            icon={faChevronUp}
                          /></>}
                        </button>
                        {expandedOrders[index] && (
                          <div className={styles.extendeddiv}>
                            <div className={styles.extended_blocks}>
                                <h5>Address : </h5>
                                <p>{item.address.firstName} {item.address.lastName}, {item.address.address}, {item.address.pincode}, {item.address.city}, {item.address.state}, {item.address.country}</p>
                            </div>
                            <div className={styles.extended_blocks}>
                                <h5>Contact : </h5>
                                <p>{item.address.phoneNumber}</p>
                            </div>
                            <div className={styles.extended_blocks}>
                                <h5>Total Amount : </h5>
                                <p>{item.totalAmount}</p>
                            </div>
                            <div className={styles.extended_blocks}>
                                <h5>Payment Status : </h5>
                                <p>{item.paymentStatus}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
            <div className={styles.orders_datanotfound}>
                <Image src={nodatafound} alt="No orders" />
            </div>
              )
            ) : (
            <div className={styles.orders_loader}>
              <Loader_colorring />
            </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context:GetServerSidePropsContext<ParsedUrlQuery>) {
  try {
    const session:any = await getSession(context);

    if (!session) {
      // Handle case where session is not available
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const baseUrl = process.env.BASE_URL;
    const response = await axios.get(`${baseUrl}/api/Orders/${session?.user?._id}`);
    const orders = response.data.data.reverse();
    return {
      props: {
        orders,
      },
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      props: {
        orders: [],
      },
    };
  }
}


export default Orders;

interface Order {
  _id: string;
  userId: string;
  address: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    _id: string;
  };
  email: string;
  products: {
    productId: {
      _id: string;
      heading: string;
      image1: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  __v: number;
}
