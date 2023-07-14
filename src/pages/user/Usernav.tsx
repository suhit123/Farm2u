import { FaUser, FaMapMarker, FaClipboardList, FaLock, FaSignOutAlt } from 'react-icons/fa';
import styles from '@/styles/user/user.module.css';
import { useSession ,signOut, getSession} from 'next-auth/react';
import Link from 'next/link';
const Usernav=()=>{
    return(<div className={styles.usernav}>
        <ul>
          <li><Link href='/user'><FaUser /><span className={styles.mobile_none}> Profile</span></Link></li>
          <li><Link href='/user/Address'><FaMapMarker /> <span className={styles.mobile_none}>Addresses</span></Link></li>
          <li><Link href='/user/Orders'><FaClipboardList /> <span className={styles.mobile_none}>My Orders</span></Link></li>
          <li><Link href='/user/changePassword'><FaLock /> <span className={styles.mobile_none}>Change Password</span></Link></li>
          <li><button onClick={()=>{signOut()}}><FaSignOutAlt /><span className={styles.mobile_none}> Logout</span></button></li>
        </ul>
      </div>)
}
export default Usernav;