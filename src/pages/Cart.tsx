import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import cartstyles from "@/styles/cartpage.module.css";
import cartemptyimg from "@/resources/cartempty.png";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Loader_colorring from "./components/Loader_colorring";
const Cart = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus }: any = useSession();
  const [cartDataContents, setCartDataContents]: any = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [cartData, setCartData]: any = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [addressDataCheck,setAddressDataCheck]=useState(false);
  useEffect(() => {
    if (sessionStatus === 'loading') {
      return;
    }
    if (!session) {
      router.push('/');
    }
  }, [session, sessionStatus, router]);
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("./api/products")
        .then((res) => {
          const productdata = res.data;
          setCartDataContents(productdata);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchdata();
  }, []);

  const Addtocart = async (productId: String) => {
    setLoading(true); // Start loading
    await axios
      .post("./api/cart/addToCart", { userId: session?.user?._id, productId: productId })
      .then((res) => {
        console.log("Successfully added!");
        forceUpdate();
      })
      .catch((err) => {
        console.log("something went wrong!");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const RemoveFromcart = async (productId: String) => {
    setLoading(true); // Start loading

    await axios
      .post("./api/cart/removeFromCart", { userId: session?.user?._id, productId: productId })
      .then((res) => {
        console.log("Successfully removed!");
        forceUpdate();
      })
      .catch((err) => {
        console.log("something went wrong!");
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    if (session) {
      setLoading(true);
      axios
        .post("./api/cart/cartData", { id: session?.user?._id })
        .then((res) => {
          const cartData = res.data;
          setCartData(cartData);
          if(cartData.length===0){
            setAddressDataCheck(true);
          }
          else{
            setAddressDataCheck(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [reducerValue, cartDataContents]);

  useEffect(() => {
    let tp = 0;
    let dp = 0;
    if (cartData.length !== 0 && cartDataContents.length !== 0) {
      cartData.map((item: any) => {
        const dataelement = cartDataContents.find((i: any) => i._id === item.productId);

        if (dataelement) {
          tp += dataelement.price * item.quantity;
          dp += (Math.floor((( dataelement.discount * dataelement.price) / 100))) * item.quantity;
        }
      });
    }
    setTotalPrice(tp);
    setTotalDiscount(dp);
  }, [reducerValue, cartData, cartDataContents]);

  return (
    <>{!session?<></>:<>
      <Nav />
      <div className={cartstyles.cartpage_entire}>
        <h4 className={cartstyles.heading}>Shopping Cart</h4>
        {cartData.length !== 0 && cartDataContents.length !== 0 ? (
          <div className={cartstyles.cart_main_block}>
             {loading ? ( 
                <Loader_colorring/>
                ) : <p></p>}
            <div className={cartstyles.cart_items}>
              <div className={cartstyles.cart_items_list}>
                  <table className={cartstyles.table}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className={cartstyles.mobile}>Price</th>
                        <th>Discount Price</th>
                        <th >Quantity</th>
                        <th className={cartstyles.mobile}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.map((item: any) => {
                        const dataelement = cartDataContents.find((i: any) => i._id === item.productId);
                        if (dataelement) {
                          return (
                            <>
                              <tr>
                                <td>
                                  <div className={cartstyles.image_and_title}>
                                    <Image src={dataelement.image1} alt="" width={100} height={100} />
                                    <div>
                                      <p className={cartstyles.mobile}>{dataelement.heading}</p>
                                      <p className={cartstyles.desktop}>{dataelement.heading.slice(0,20)}...</p>
                                      <p className={`${cartstyles.companyname} ${cartstyles.mobile}`}>Genmatrix remedies</p>
                                    </div>
                                  </div>
                                </td>
                                <td className={cartstyles.mobile}>
                                  <p>Rs. {dataelement.price}</p>
                                </td>
                                <td>
                                  <p>Rs. {Math.floor(dataelement.price-((dataelement.discount * dataelement.price) / 100))}</p>
                                </td>
                                <td>
                                  <div className={cartstyles.quantity}>
                                    <button className={cartstyles.cart_removefromcart_products} onClick={() => { RemoveFromcart(dataelement._id) }}>-</button>
                                    <p>{item.quantity}</p>
                                    <button className={cartstyles.cart_addtocart_products} onClick={() => { Addtocart(dataelement._id) }}>+</button>
                                  </div>
                                </td>
                                <td className={cartstyles.mobile}>Rs. {Math.floor(dataelement.price-((dataelement.discount * dataelement.price) / 100)) * item.quantity}</td>
                              </tr>
                            </>
                          );
                        }
                      })}
                    </tbody>
                  </table>
              </div>
            </div>
            <div className={cartstyles.cart_right_container}>
              <h3>Order Summary</h3>
              <div className={cartstyles.cart_total}>
                <p>Total</p>
                <p className={cartstyles.priceamounts}>{totalPrice}</p>
              </div>
              <div className={cartstyles.cart_discount}>
                <p>Discount</p>
                <p className={cartstyles.priceamounts}>- {totalDiscount}</p>
              </div>
              <div className={cartstyles.cart_subtotal}>
                <p>Subtotal</p>
                <p className={cartstyles.priceamounts}>Rs. {totalPrice - totalDiscount}</p>
              </div>
              <button className={cartstyles.cart_checkout } onClick={() => {
                  router.push("/checkout");
                }}>PROCEED TO CHECKOUT</button>
              <button
                className={cartstyles.cart_back}
                onClick={() => {
                  router.push("/products");
                }}
              >
                GO BACK
              </button>
            </div>
          </div>
        ) : addressDataCheck?(
          <div className={cartstyles.cart_empty_div}>
            <div className={cartstyles.cart_empty_image}>
              <Image src={cartemptyimg} alt="" />
              <p>Oops! Your cart is empty</p>
            </div>
            <div className={cartstyles.cart_bottom_container}>
              <button
                className={cartstyles.cart_continue_shopping}
                onClick={() => {
                  router.push("/products");
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ):<></>}
      </div>
      <Footer />
    </>}</>
  );
};

export default Cart;
