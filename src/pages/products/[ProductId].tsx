import { useRouter } from "next/router";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import emptyimage from '@/resources/emptyimage.png'
import styles from '@/styles/detailedproducts.module.css'
import ReactStars from 'react-stars'
import axios from "axios";
import loaderimage from '@/resources/genmatrixlogo2.png'
import { useSession } from "next-auth/react";
const DetailedProduct=()=>{
    const {data:session}:any=useSession();
    const router=useRouter()
    let ProductId=router.query.ProductId;
    const [checkId,setCheckId]=useState(false);
    const [productdata,setProductdata]:any=useState();
    const [rating,setRating]=useState(5);
    const [imageSlideshow,setImageSlideShow]:any=useState({
        img1:emptyimage,
        img2:emptyimage,
        img3:emptyimage,
        img4:emptyimage
    });
    const [mainImage,setMainImage]=useState(imageSlideshow.img1);
    const [pagecomments,setPagecomments]:any=useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [reducerValue,forceUpdate]=useReducer(x=>x+1,0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleLoad = () => {
          setIsLoading(false);
        };
        window.addEventListener('load', handleLoad);
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }, []);
    useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      const threshold = 400;

      if (scrollHeight > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []);
    useEffect(() => {
        if (ProductId) {
          axios.get(`../api/products/${ProductId}`)
            .then((res) => {
              setProductdata(res.data);
              setImageSlideShow({
                img1:res.data.image1,
                img2:res.data.image2,
                img3:res.data.image3,
                img4:res.data.image4
            })
            setMainImage(res.data.image1)
            setPagecomments(res.data.comments.reverse())
            const reviews=res.data.comments;
            let rating_addition=0;
            reviews.map((comment:any)=>{
                rating_addition+=comment.rating}
            )
            const average_rating=rating_addition/reviews.length;
            setRating(average_rating);
            })
            .catch((err) => {
              console.log("Something wrong!");
              if (err.response.data === "iderror") {
                setCheckId(true);
              }
            });
        }
      }, [ProductId,reducerValue]);

    const[commentingState,setCommentingState]=useState(true);
    const [newcomment,setNewcomment]=useState({
        name:"",
        rating:5,
        comment:""
    })
    const handlechange=(e:any)=>{
        setNewcomment({...newcomment,[e.target.name]:e.target.value});
    }
    const ratingChanged= (newRating:any) => {
        console.log(newRating);
        setNewcomment({...newcomment,rating:newRating});
      }
    const userSubmit=async(e:any)=>{
        e.preventDefault();
        console.log(newcomment)
        await axios.post(`../api/products/${ProductId}`,newcomment)
        .then((res)=>{
            console.log("Comment added!");
            forceUpdate();
            setCommentingState(false);
            setNewcomment({name:"",rating:5,comment:""})
            axios.post('/api/SMTP/ProductComment',{name:newcomment.name, comment:newcomment.comment,Productid:ProductId,Producttitle:productdata.heading,rating:newcomment.rating})
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const Addtocart=async(productId:String)=>{
      if(session){
        await axios.post("../api/cart/addToCart",{userId:session?.user?._id,productId:productId})
      .then((res)=>{
          console.log("Successfully added!")
      })
      .catch((err)=>{
          console.log("something went wrong!")
      })}
      else{
       router.push('/login');
      }
   }
    return(
        <>
        {isLoading && productdata?<>{isVisible?<div className={styles.bottom_bar}>
            <div  className={styles.bottom_bar_container}>
            <div className={styles.bottom_bar_container_left}><Image src={imageSlideshow.img1} onClick={()=>{setMainImage(imageSlideshow.img1)}} alt="" width={100} height={100}/>
            <div>
            <h6 className={styles.mobile_display}>{productdata.heading}</h6>
            <h6 className={styles.desktop}>{productdata.heading.slice(0,20)}...</h6>
            <p>M.R.P.: <del>Rs. {productdata.price}</del><span className={styles.showcasing_discountprice}>Rs. {productdata.price-((productdata.discount*productdata.price)/100)}</span></p>
            </div>
            </div>
            <button onClick={()=>{Addtocart(productdata._id)
                                  router.push('/Cart')}}>ADD TO CART</button>
            </div>
        </div>:<></>}
        <Nav/>
        <div className={styles.detailed_product_page}>
        <div className={styles.detailedproduct_main_content}>
        <div className={styles.imageshow_block}>
            <div className={styles.imageshow_block_left}>
                <div className={styles.imageshow_block_left_images}><Image src={imageSlideshow.img1} onClick={()=>{setMainImage(imageSlideshow.img1)}} alt="" width={100} height={100}/></div>
                <div className={styles.imageshow_block_left_images}><Image src={imageSlideshow.img2} onClick={()=>{setMainImage(imageSlideshow.img2)}} alt="" width={100} height={100}/></div>
                <div className={styles.imageshow_block_left_images}><Image src={imageSlideshow.img3} onClick={()=>{setMainImage(imageSlideshow.img3)}} alt="" width={100} height={100}/></div>
                <div className={styles.imageshow_block_left_images}><Image src={imageSlideshow.img4} onClick={()=>{setMainImage(imageSlideshow.img4)}} alt="" width={100} height={100}/></div>
            </div>
            <div className={styles.imageshow_block_right}>
            <Image src={mainImage} alt="" width={100} height={100}/>
            </div>
        </div>
        <div className={styles.detailedproduct_main_details}>
            <h5>{productdata.heading}</h5>
            <h6>M.R.P.: <del>Rs. {productdata.price}</del>  <span className={styles.showcasing_discountprice}>Rs. {productdata.price-((productdata.discount*productdata.price)/100)}</span></h6>
            <p>(inclusive of all taxes)</p>
            <div className={styles.review_side_num}>
            <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={rating}
                    color2={'#ffd700'} /><p>{Math.round(rating*10)/10}/5</p></div>
            <p>	&#128525; Yay! You saved Rs. {((productdata.discount*productdata.price)/100)}</p>
            <button onClick={()=>{Addtocart(productdata._id)
                                          router.push('/Cart')}}>ADD TO CART</button>
            <div className={styles.maufactured_and_marketed}>
                <h6>Manufactured & Marketed by :</h6>
                <p>Genmatrix remedies. 227, Building No.5-B, Andheri Kurla Road, Mittal Industrial Estate Rd, Andheri East, Mumbai, Maharashtra 400059.</p>
                <p>For any consumer complaints, queries and feedback, contact our customer care executive on above manufacturer's address or +91-999999999 | Genmatrix@gmail.com</p>
            </div>
        </div>
        </div>
        <div className={styles.description}>
            <h4>PRODUCT DESCRIPTION</h4>
            <p>
          <div className={styles.detailedproduct_main_content_div} dangerouslySetInnerHTML={{__html:productdata.description}}/>
          </p>
        </div>
        <div className={styles.blog_comment_section}>
                <h5 className={styles.comment_section_heading}>Reviews</h5>
                {commentingState?<></>:<button className={styles.comment_section_addacomment} onClick={()=>{setCommentingState(!commentingState)}}>Add a comment</button>}
                {commentingState?<form className={styles.blogcommentform} onSubmit={userSubmit}>
                <input type="text" name="name" placeholder="Name" value={newcomment.name} onChange={handlechange} required/>
                <ReactStars
                    count={5}
                    size={24}
                    onChange={ratingChanged}
                    value={newcomment.rating}
                    color2={'#ffd700'} />
                <textarea name="comment" placeholder="Enter your review"  value={newcomment.comment} onChange={handlechange} required></textarea>
                <div>
                    <button className={styles.comment_section_submit}  type="submit">Submit</button>
                    {commentingState?<button className={styles.comment_section_close} onClick={()=>{setCommentingState(!commentingState)}}>Close</button>:<></>}
                </div>
                </form>:<></>}
                {pagecomments.length!==0?pagecomments.map((item:any)=>{
                    return(
                        <div className={styles.comment_block}>
                            <div className={styles.comment_block_upper}>
                                <h5>{item.name}</h5>
                                <p>Date : {item.publishDate.split('T')[0]}</p>
                            </div>
                            <div className={styles.comment_block_lower}>
                            <ReactStars
                                 count={5}
                                 size={24}
                                 value={item.rating}
                                 edit={false}
                                 color2={'#ffd700'} />
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    )
                }):<p className={styles.no_comments_block}>No comments ! Be first to add a comment</p>}
            </div>
        </div>
        <Footer/>
        </>
        :<div className="loader_bg" style={{"visibility":`visible`}}>
        <div className='loader_block'>
          <div className="loader"></div>
        </div>
        <div className='loader_block'>
          <div className="loader1"><Image className="logo_preloader" src={loaderimage} alt=""/></div>
        </div>
      </div>}
        </>
    );
};
export default DetailedProduct;