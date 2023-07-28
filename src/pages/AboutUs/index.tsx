import Footer from "@/components/footer";
import Nav from "@/components/nav";
import styles from "@/styles/aboutus.module.css";
import Marquee from "react-fast-marquee";
import {
  faTrophy, // Icon for "OUR STRENGTH"
  faBullseye, // Icon for "MISSION"
  faEye, // Icon for "OUR VISION"
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Aboutus = () => {
  return (
    <>
      <Nav />
      <div className={styles.aboutusPage}>
        <div className={styles.aboutusPage_heading}>
          <h5>ABOUT US</h5>
        </div>
        <div className={styles.aboutusPage_content}>
          <p>
            We, at GENMATRIX REMEDIES, strive to build a bond of Love and Trust
            with our valued customers worldwide. With our range of nutraceutical
            supplements, we aim to empower you in your journey towards a
            healthier, happier life. With a means to reestablish the significant
            minerals and nutrients back into your body. Our division has built
            up a wide scope of indispensable nutraceutical supplements that
            plays an important role in promoting your health and well-being of
            your loved ones. By providing a combination of nutritional and
            pharmaceutical benefits. These products are derived from natural
            sources and are formulated to provide specific health benefits
            beyond basic nutrition. Let's embark on this path together!
          </p>
          <Marquee pauseOnHover={true} speed={70}>
            <div className={styles.quotes_blocks}>
              <h5>
                <FontAwesomeIcon icon={faTrophy} />
              </h5>
              <h6>OUR STRENGTH</h6>
              <p>
                Our strength stems from our commitment to quality and providing
                scientifically backed nutraceutical supplements to promote an
                enriched health and wellness to millions across the Globe
              </p>
            </div>
            <div className={styles.quotes_blocks}>
              <h5>
                <FontAwesomeIcon icon={faBullseye} />
              </h5>
              <h6>MISSION</h6>
              <p>
                To be the most trusted source of premium nutraceutical products
                that are required in the markets across the globe with best
                prices helping individuals live healthier, happier lives.
              </p>
            </div>
            <div className={styles.quotes_blocks}>
              <h5>
                <FontAwesomeIcon icon={faEye} />
              </h5>
              <h6>OUR VISION</h6>
              <p>
                'RETURN TO OUR ROOTS' - to bridge the gap between traditional
                medicine and nutritional supplementation, offering
                evidence-based nutraceuticals that complement a holistic
                approach to health.
              </p>
            </div>
          </Marquee>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Aboutus;
