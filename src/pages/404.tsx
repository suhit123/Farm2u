import pagenotfound from '@/resources/Pagenotfound_image.jpg'
import styles from '@/styles/custom404.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
const Custom404 = () => {
  const router=useRouter();
  return (
    <div className={styles.pagenotfound}>
      <Image src={pagenotfound} alt="" width={5000} height={5000}/>
      <p>The page you're looking for does not exist.</p>
      <button onClick={()=>{router.push('/')}}>GO HOME</button>
    </div>
  );
};

export default Custom404;