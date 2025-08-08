import logoImg from "../assets/logo.png";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <header>
      <img src={logoImg} className={styles.logoImg}></img>
      <div className={styles.tags}>
        <a className={styles.text}>market BEE</a>
        <a>홍보</a>
        <a>스마트 리포트</a>
        <a className={styles.my}>MY</a>
      </div>
    </header>
  );
}

export default Header;
