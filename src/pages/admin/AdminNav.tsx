import { useSession } from "next-auth/react";
import styles from '@/styles/admin/adminnav.module.css'
const AdminNav=()=>{
    const {data:session}=useSession();
    return(
            <nav className={styles.adminnav}>
                <div className={styles.adminnav_div}>
                <h5>Hi Admin &#128075;!</h5>
                <p>{session?.user?.email}</p>
                </div>
            </nav>
    )
}
export default AdminNav;