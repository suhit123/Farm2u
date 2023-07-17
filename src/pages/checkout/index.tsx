import React, { useEffect, useReducer, useState } from 'react';
import styles from '@/styles/checkout/address.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import cartstyles from '@/styles/checkout/cart.module.css'
import Loader_colorring from '../../components/Loader_colorring';
import { useRouter } from 'next/router';
import genmatrixlogo from '@/resources/logo_text.png'
import Head from 'next/head';
import circlelogo from '@/resources/genmatrixlogo2.png'
const CheckoutForm = () => {
  const router=useRouter();
  const { data: session , status: sessionStatus}:any = useSession();
  const [formData, setFormData] = useState({
    _id:'123',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  //address fetching
  const [addressData, setAddressData]= useState([]);
  const fetchAddressData = () => {
    axios.get(`/api/users/${session?.user?._id}/addresses`)
        .then((res) => {
        setAddressData(res.data.reverse());
        console.log(res.data)
      })
      .catch((err) => {
        console.log("Something went wrong");
      })
      .finally(() => {
      });
  };
  useEffect(()=>{
    if(sessionStatus==="authenticated"){
      fetchAddressData();
    }
  },[sessionStatus])
  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddressSelection = (selectedAddress:any) => {
    setFormData({
      ...formData,
      ...selectedAddress,
    });
  };


  //side bar
  const [cartDataContents, setCartDataContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
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
  }, [router]);
  useEffect(() => {
    if (session) {
      setLoading(true);
      axios
        .post("./api/cart/cartData", { id: session?.user?._id })
        .then((res) => {
          const cartData = res.data;
          setCartData(cartData);
          if (cartData.length === 0) {
            router.push('/products');
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
      cartData.map((item:any,index: number) => {
        const dataelement:any = cartDataContents.find((i:any) => i._id === item.productId);

        if (dataelement) {
          tp += dataelement.price * item.quantity;
          dp += (Math.floor((( dataelement.discount * dataelement.price) / 100))) * item.quantity;
        }
      });
    }
    setTotalPrice(tp);
    setTotalDiscount(dp);
  }, [reducerValue, cartData, cartDataContents]);
  const addToOrders=async()=>{
    try{
      let cart:any=[];
      cartData.map((item:any) => {
        console.log(item)
        const dataelement:any = cartDataContents.find((i:any) => i._id === item.productId);
        if (dataelement) {
          cart.push({
            productId:item.productId,
            quantity:item.quantity,
            price:Math.floor(dataelement.price-((dataelement.discount * dataelement.price) / 100))
          })
        }})
      const {_id,...addressdata}=formData 
      let data={
          userId:session?.user?._id,
          address:addressdata,
          email:session?.user?.email,
          products:cart,
          totalAmount:totalPrice - totalDiscount,
          paymentStatus:'paid',
      };
      console.log(data)
      await axios.post('/api/Orders',data)
      .then(async(res)=>{
        await axios.delete(`/api/cart/ResetCart/${session?.user?._id}`)
        .then((res)=>{
          console.log("cart reset");
        })
        .catch((err)=>{
          alert("Something gone wrong reseting the cart items!");
        })
        .finally(()=>{
          router.push('/user/Orders');
        })
      })
      .catch((err)=>{
        alert("something went wrong")
        console.log("Something wen't wrong!");
      })
    }
    catch(err){
      console.log("Something wen't wrong!");
    }
  }
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let amount=totalPrice-totalDiscount;
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" , body:JSON.stringify(amount)}).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key:process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "GENMATRIX REMEDIES",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: circlelogo,
      handler: function (response:any) {
        // // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        if (response.razorpay_payment_id) {
          // Payment successful
          addToOrders();
        } else {
          // Payment failed
          console.log("Payment failed");
        }
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    makePayment();
  };
  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {!session?<></>:
    <>
    <div className={cartstyles.grey_box}></div>
    <div className={styles.checkout_container}>
    <div>
    <Image className={styles.company_logo} src={genmatrixlogo} alt="genmatrix_logo"/>
    <div className={styles.checkout_form_container}>
    <h3>Shipping Address</h3>
    <form className={styles.checkout_form} onSubmit={handleSubmit}>
      <div className={styles.f_l_names}>
      <div className={styles.form_group}>
        <label htmlFor="firstName">First Name</label>
        <input className={`${styles.input} ${styles.fname}`} type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="lastName">Last Name</label>
        <input className={`${styles.input} ${styles.lname}`} type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input className={styles.input} type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="address">Address</label>
        <input className={styles.input} type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="landmark">Landmark</label>
        <input className={styles.input} type="text" id="landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
      </div>
      <div className={styles.c_s_p_div}>
      <div className={ `${styles.form_group}`}>
        <label htmlFor="city">City</label>
        <input className={styles.input_} type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className={ `${styles.form_group}`}>
        <label htmlFor="state">State</label>
        <select className={`${styles.input_} ${styles.state}`} id="state" name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
        </select>
      </div>
      <div className={ `${styles.form_group}`}>
        <label htmlFor="pincode">Pincode</label>
        <input className={styles.input_} type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
      </div>
      </div>
      <div className={styles.form_group}>
        <label htmlFor="country">Country / Region</label>
        <select className={styles.input} id="country" name="country" value={formData.country} disabled>
          <option value="India">India</option>
        </select>
      </div>
      <div>
        <p className={styles.savedadress}>Select from saved</p>
        {addressData.map((item:any,index: number)=>{
          return(
            <div className={styles.selectaddress} key={index}>
              <p className={styles.shipto}>Ship to</p>
              <p className={styles.shiptoaddress}>{item.address}, {item.pincode} {item.city} {item.state} {item.country}</p>
              <input type='radio'  
                      id={`address_${item._id}`}
                      name="selectedAddress"
                      value={item._id}
                      checked={formData._id === item._id}
                      onChange={() => handleAddressSelection(item)}/>
            </div>
          );
        })}
      </div>
      <div className={styles.info_form_back_submit}>
      <Link href="/Cart"> Return to cart</Link>
      <button className={styles.info_submit} type="submit">Submit</button>
      </div>
    </form>
    </div>
    </div>
    <div className={cartstyles.rightbox}>
    {cartData.length !== 0 && cartDataContents.length !== 0 ? (
          <>
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
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.map((item:any,index: number) => {
                        const dataelement:any = cartDataContents.find((i:any) => i._id === item.productId);
                        if (dataelement) {
                          return (
                              <tr key={index}>
                                <td>
                                  <div className={cartstyles.image_and_title}>
                                    <Image src={dataelement.image1} alt="" width={100} height={100} />
                                    <div>
                                      <p>{dataelement.heading}</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className={cartstyles.quantity}>
                                    <p>{item.quantity}</p>
                                  </div>
                                </td>
                                <td>Rs. {Math.floor(dataelement.price-((dataelement.discount * dataelement.price) / 100)) * item.quantity}</td>
                              </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
          <div className={cartstyles.coupon_discount_section}>
            <input type='text' placeholder='Discount code'/>
            <button>Apply</button>
          </div>
          <div className={cartstyles.cart_total}>
                <p>Subtotal</p>
                <p className={cartstyles.priceamounts}>{totalPrice - totalDiscount}</p>
              </div>
              <div className={cartstyles.cart_discount}>
                <p>Shipping</p>
                <p className={cartstyles.priceamounts}>Free</p>
              </div>
              <div className={cartstyles.cart_subtotal}>
                <div>
                  <p>Total</p>
                  <p>(Including of all taxes)</p>
                </div>
                <p className={cartstyles.priceamounts}>Rs. {totalPrice - totalDiscount}</p>
              </div>
         </> 
        ) :(<p>wait for a moment ...</p>) 
        }
    </div>
    </div>
    </>}
    </>
  );
};

export default CheckoutForm;
