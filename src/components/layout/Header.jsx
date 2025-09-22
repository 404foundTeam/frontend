import { NavLink } from "react-router-dom";
import styles from "../../styles/Header.module.css";

import logoImg from "../../assets/logo.png";

function Header({ isWelcome }) {
  return (
    <header>
      <img src={logoImg} className={styles.img}></img>
      <div className={styles.tags}>
        <NavLink to={!isWelcome ? "/main" : "/"} className={styles.text}>
          market BEE
        </NavLink>
        {!isWelcome && (
          <>
            <NavLink to="/marketing" className={styles.link}>
              홍보
            </NavLink>
            <NavLink to="/smartreport" className={styles.link}>
              스마트 리포트
            </NavLink>
            <NavLink to="/my" className={`${styles.my} ${styles.link}`}>
              마이페이지
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
