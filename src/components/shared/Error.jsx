import styles from "../../styles/shared/Error.module.css";
import Header from "../layout/Header";
import loadingImg from "../../assets/loading_img.png";

function Error() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src={loadingImg} className={styles.errorImg} />
        <p>잠시만 기다려주세요...</p>
        <p>market Bee가 길을 잃었어요....</p>
      </div>
    </>
  );
}

export default Error;
