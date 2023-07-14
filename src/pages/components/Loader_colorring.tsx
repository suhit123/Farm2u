import { ColorRing } from "react-loader-spinner";
import styles from '@/styles/loader_colorring.module.css'
const Loader_colorring=()=>{
    return(
        <div className={styles.loading}>
        <ColorRing
        visible={true}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#1e2940','#1e2940','#1e2940','#1e2940','#1e2940']}
        />
        </div>
    );
};
export default Loader_colorring;