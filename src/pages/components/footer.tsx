import Image from 'next/image';
import styles from '@/styles/footer.module.css'
import logo from '@/resources/genmatrixwhitelogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
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
                <li>HOME</li>
                <li>PRODUCTS</li>
                <li>ABOUT</li>
                <li>VIDEOS</li>
                <li>BLOG</li>
                <li>CONTACT US</li>
            </ul>
            </div>
            <div className={`${styles.quicklinks} ${styles.contactus}`}>
            <p className={styles.heading}>Contact us</p>
                <p>Genmatrix remedies. 227, Building No.5-B, Andheri Kurla Road, Mittal Industrial Estate Rd, Andheri East, Mumbai, Maharashtra 400059.</p>
                <p>For any consumer complaints, queries and feedback, contact our customer care executive on above manufacturer's address or +91-999999999 | Genmatrix@gmail.com</p>
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