import Image from 'next/image';
import styles from '@/styles/footer.module.css'
import logo from '@/resources/genmatrixwhitelogo.png'
import React from 'react';
import Link from 'next/link';
const Footer=()=>{
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
return (
    <div className={styles.footer_container}>
        <div className={styles.footer_top}>
            <Image src={logo} alt=''/>
            <div className={styles.quicklinks}>
            <p className={styles.heading}>Quick Pages</p>
            <ul>
                <li><Link href={'/'}>HOME</Link></li>
                <li><Link href={'/AboutUs'}>ABOUT</Link></li>
                <li><Link href={'/products'}>PRODUCTS</Link></li>
                <li><Link href={'/videos'}>VIDEOS</Link></li>
                <li><Link href={'/blogs'}>BLOG</Link></li>
                <li><Link href={'/contactus'}>CONTACT US</Link></li>
            </ul>
            </div>
            <div className={`${styles.quicklinks} ${styles.contactus}`}>
            <p className={styles.heading}>Contact us</p>
                <p>Genmatrix remedies. F115, PADMADHAM APARTMENTS, VIJAYAPURI COLONY, TARNAKA, SECUNDERABAD -500017</p>
                <p>For any consumer complaints, queries and feedback, contact our customer care executive on above manufacturer's address or <a href="tel:7569444410">7569444410</a> | <a href="mailto:gnxremedys@gmail.com">gnxremedys@gmail.com</a></p>
            </div>
            <div className={styles.quicklinks}>
            <iframe className={styles.contactusmap} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.477600397684!2d78.52954141392536!3d17.48470024909373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9baa5cca5a41%3A0x745662c3aad3b3b7!2sGenmatrix%20Remedies!5e0!3m2!1sen!2sin!4v1686063691834!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>
            </div>
        </div>
        <div className={styles.footer_btm}>
            <p>© 2023 , GENMATRIX REMEDIES</p>
            <p className={styles.gototop} onClick={scrollToTop}>Go to Top</p>
        </div>
    </div>
);
};
export default Footer;