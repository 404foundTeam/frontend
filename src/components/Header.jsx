import { NavLink } from "react-router-dom";
import logoImg from "../assets/logo.png";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImg} className={styles.img}></img>
      <div className={styles.tags}>
        <NavLink to="/main" className={styles.text}>
          market BEE
        </NavLink>
        <NavLink to="/marketing" className={styles.link}>
          홍보
        </NavLink>
        <NavLink to="/smartreport" className={styles.link}>
          스마트 리포트
        </NavLink>
        <NavLink to="/my" className={`${styles.my} ${styles.link}`}>
          MY
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
