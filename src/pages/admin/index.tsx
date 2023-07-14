import AdminRoute from "./AdminRoute";
import styles from '@/styles/admin/indexpage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faShoppingCart,
  faNewspaper,
  faSignOutAlt,
  faVideo ,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import logo from '@/resources/logo_text.png';
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const Admin = () => {
  const router=useRouter();
  return (
    <AdminRoute>
      <div className={styles.adminContainer}>
        <div className={styles.nav_btm}>
        <Image className={styles.logo} src={logo} alt="" />
          <ul className={styles.nav_ul}>
          <li
            className={`${styles.nav_li}`}
            onClick={() => {router.push('/admin/Dashboard');}}
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </li>
          <li
            className={`${styles.nav_li}`}
            onClick={() => {router.push('/admin/products/Inventory')}}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Products</span>
          </li>
          <li
            className={`${styles.nav_li}`}
            onClick={() => {router.push('/admin/Videos')}}
          >
            <FontAwesomeIcon icon={faVideo} />
            <span>Videos</span>
          </li>
          <li
            className={`${styles.nav_li}`}
            onClick={() => {router.push('/admin/Blogs')}}
          >
            <FontAwesomeIcon icon={faNewspaper} />
            <span>Blogs</span>
          </li>
          <li
            className={`${styles.nav_li}`}
            onClick={() => {router.push('/admin/ChangePassword')}}
          >
            <FontAwesomeIcon icon={faKey} />
            <span>Change password</span>
          </li>
          <li className={styles.nav_li}  onClick={()=>{signOut()}}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </li>
          </ul>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
