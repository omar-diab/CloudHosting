import Image from "next/image";
import { TiTick } from "react-icons/ti";
import HeroImage from "../../../public/logo.png";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>
          The best web hosting solution for your online success
        </p>
        <div className={styles.services}>
          <div className={styles.service}>
            <span className={styles.true}>
              <TiTick />
            </span>{" "}
            Easy to use control panel
          </div>
          <div className={styles.service}>
            <span className={styles.true}>
              <TiTick />
            </span>{" "}
            Secure Hosting
          </div>
          <div className={styles.service}>
            <span className={styles.true}>
              <TiTick />
            </span>{" "}
            Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image src={HeroImage} width={500} height={500} alt="CloudImage" className={styles.img}/>
      </div>
    </div>
  );
};

export default Hero;
