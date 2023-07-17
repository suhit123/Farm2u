import Image from 'next/image';
import logo from '@/resources/logo_text.png'
import 'bootstrap/dist/css/bootstrap.css'
import styles from "@/styles/nav.module.css";
import profile from '@/resources/profile.png'
import Link  from 'next/link';
import axios from "axios";
import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import cartpng from '@/resources/cart.png'
import cartstyles from '@/styles/cart.module.css'
import cartcomponentstyles from '@/styles/cartcomponent.module.css'
import cartemptyimg from '@/resources/cartempty.png'
import { useSession ,signOut} from 'next-auth/react';
import Loader_colorring from './Loader_colorring';
import facebooklogo from '@/resources/facebooklogo.png'
import whatsapplogo from '@/resources/whatsapplogo.png'
import React from 'react';
const Nav=()=>{
const router = useRouter();
const {data:session}:any=useSession();
const [cartData,setCartData]:any =useState([]);
const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
const [cartState,setCartState]=useState(false);
const [discountBarState,setDiscountBarState]=useState(true);
const [cartDataContents,setCartDataContents]:any=useState([]);
const [totalPrice,setTotalPrice]=useState(0);
const [totalDiscount,setTotalDiscount]=useState(0);
useEffect(()=>{
  const fetchdata= async()=>{
      await axios.get('../api/products',)
      .then((res)=>{
          const productdata=res.data;
          setCartDataContents(productdata);
          console.log(productdata)
      })
      .catch((err)=>{
          console.log(err);
      })
  }
  fetchdata();
},[])
const closeNav=()=>{
    setCartState(false);
}
const openNav=()=>{
  setCartState(true);
}
const Addtocart=async(productId:String)=>{
  setLoading(true); // Start loading
  await axios.post("../api/cart/addToCart",{userId:session?.user?._id,productId:productId})
  .then((res)=>{
      console.log("Successfully added!");
      forceUpdate()
  })
  .catch((err)=>{
      console.log("something went wrong!")
  })
  .finally(() => {
    setLoading(false); // Stop loading
  });
}
const RemoveFromcart=async(productId:String)=>{
  setLoading(true); // Start loading
  await axios.post("../api/cart/removeFromCart",{userId:session?.user?._id,productId:productId})
  .then((res)=>{
      console.log("Successfully removed!")
      forceUpdate()
  })
  .catch((err)=>{
      console.log("something went wrong!")
  })
  .finally(() => {
    setLoading(false); // Stop loading
  });
}
const[loading,setLoading]=useState(false);
useEffect(()=>{
  if(session){
    setLoading(true);
    axios.post('../api/cart/cartData',{id:session?.user?._id})
      .then((res)=>{
          const cartData=res.data;
          setCartData(cartData);
      })
      .catch((err)=>{
          console.log(err);
      })
    setLoading(false);
  }
},[cartState,reducerValue])
useEffect(()=>{
  let tp=0;
  let dp=0;
  if(cartData.length!==0 && cartDataContents.length!==0){
    cartData.map((item:any,index: number)=>{
      const dataelement=cartDataContents.find((i:any)=>i._id===item.productId);
      
      if(dataelement){tp+=dataelement.price*item.quantity;
      dp+=Math.floor(dataelement.price-((dataelement.discount*dataelement.price)/100))* item.quantity;
      }
    })
  }
  setTotalPrice(tp);
  setTotalDiscount(tp-dp)
},[reducerValue,cartData,cartState,cartDataContents])
return(
  <div className={styles.entirenav}>
    {discountBarState?<div className={styles.discount_nav_bar}>
          <p>Get 10% Discount for Purchase above Rs. 1500/- Use Coupon : GMR1500</p>
          <a className={cartstyles.closebtn} onClick={()=>{setDiscountBarState(!discountBarState)}}>&times;</a>
    </div>:<></>}
    <div className={styles.main_nav_bar_p}>
        <Image className={styles.logo} src={logo} alt=""/>
        <div className={styles.main_nav_bar_r_p}>
            <div className={styles.main_nav_bar_r_p_profile}>
                {session?
                <div className={styles.profile_dropdown}>
                  <button className={styles.profile_drop_click} onClick={()=>{
                    if(session?.user?.role==="admin"){
                      router.push('/admin/Dashboard');
                    }
                    else{
                      router.push('/user');
                    }
                  }}>
                    <Image src={profile} alt=""/><span className={styles.mobile_display}>{session?.user?.firstname} {session?.user?.lastname}</span>
                  </button>
                  <button onClick={openNav} className={styles.cartPng_nav}>
                    <Image src={cartpng} alt=""/>
                    </button>
                  <button className={styles.profile_logout} onClick={()=>{signOut() ;
                                                                          router.push('/login')}}>Log out</button>
                </div>
                :<p className={styles.login_signup}><Link href='/login' className={styles.login_logout}><span>Login</span></Link> | <Link href='/signup' className={styles.login_logout}><span>Signup</span></Link></p>}
            </div>
        </div>
    </div>
  <div className={styles.nav_bar_private}>
  <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark">
  <div className="container-fluid">
    <div className={styles.nav_btm}>
      <ul className={styles.nav_ul} >
        <li className={styles.nav_li}>
          <Link className={styles.nav_li_a} href="/">HOME</Link>
        </li>
        <li className={styles.nav_li}>
          <a className={styles.nav_li_a} href="/AboutUs">ABOUT</a>
        </li>
        <li className={styles.nav_li}>
          <a className={styles.nav_li_a} href="/products">PRODUCTS</a>
        </li>
        <li className={styles.nav_li}>
          <a className={styles.nav_li_a} href="/videos">VIDEOS</a>
        </li>
        <li className={styles.nav_li}>
          <a className={styles.nav_li_a} href="/blogs">BLOG</a>
        </li>
        <li className={styles.nav_li}>
          <a className={styles.nav_li_a} href="/contactus">CONTACT US</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  </div>
  <div className={`${cartstyles.sidecartcontainer} ${cartState?cartstyles.sidecart_visible_container:cartstyles.sidecart_none_container}`} onClick={closeNav}>
  </div>
  <div id="mySidenav" className={`${cartstyles.sidecart} ${cartState?cartstyles.sidecart_visible:cartstyles.sidecart_none}`}>
  <h4 className={cartstyles.heading}>Shopping Cart</h4>
  <a className={cartstyles.closebtn} onClick={closeNav}>&times;</a>
  {cartData.length!==0 && cartDataContents.length!==0?<div>
  <div className={cartstyles.cart_items}><div className={cartstyles.cart_items_list}>
  {loading ? ( 
                <Loader_colorring/>
                ) : <p></p>}{cartData.map((item:any,index: number)=>{
      const dataelement=cartDataContents.find((i:any)=>i._id===item.productId)
      if(dataelement){
      return(
        <>
          <div className={cartcomponentstyles.cart_products_list_item} key={index}>
            <div className={cartcomponentstyles.cart_products_list_item_image}>
              <Image src={dataelement.image1} alt="" width={100} height={100}/>
            </div>
            <div className={cartcomponentstyles.cart_products_list_items_content}>
            <h6>{dataelement.heading}</h6>
            <h5><del>Rs. {dataelement.price}</del>  Rs. {Math.floor(dataelement.price-((dataelement.discount*dataelement.price)/100))}</h5>
            <div className={cartcomponentstyles.cart_editing_buttons}>
              <button className={cartcomponentstyles.cart_removefromcart_products} onClick={()=>{RemoveFromcart(dataelement._id)}}>-</button>
              <p>{item.quantity}</p>
              <button className={cartcomponentstyles.cart_addtocart_products} onClick={()=>{Addtocart(dataelement._id)}}>+</button></div>
            </div>
          </div>
          <div className={cartcomponentstyles.cart_prodicts_item_underline}></div>
    </>
      );}
  })}</div></div>
  <div className={cartstyles.cart_bottom_container}>
  <div className={cartstyles.cart_total}>
  <p>Total</p>
  <p>{totalPrice}</p>
  </div>
  <div className={cartstyles.cart_discount}>
  <p>Discount</p>
  <p>- {totalDiscount}</p>
  </div>
  <div className={cartstyles.cart_subtotal}>
  <p>Subtotal</p>
  <h5>Rs. {totalPrice-totalDiscount}</h5>
  </div>
  <button className={cartstyles.cart_checkout} onClick={()=>{router.push('/Cart')}}>CHECKOUT</button>
  </div>
  </div>
  :<div className={cartstyles.cart_empty_div}>
    <Image src={cartemptyimg} alt=""/>
    <p>Oops! Your cart is empty</p>
    <div  className={cartstyles.cart_bottom_container}><button className={cartstyles.cart_checkout} onClick={()=>{router.push('/products')}}>Continue Shopping</button></div>
  </div>}
  </div>
  <div className={styles.facebook_link}>
  <a href='https://wa.me/7569444410' style={{marginBottom:"5px"}}><Image width="40" height="40" style={{borderRadius:"3px"}} src={whatsapplogo} alt="whatsapp--v1"/></a>
    <a href='https://www.facebook.com/profile.php?id=100093098380347' ><Image width="40" height="40" src={facebooklogo} alt="facebook--v1"/></a>
  </div>
  </div>
);
};
export default Nav;