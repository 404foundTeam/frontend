import { NavLink } from "react-router-dom";
import styles from "../../styles/layout/Header.module.css";

import logoImg from "../../assets/logo.png";

function Header({ isWelcome }) {
  return (
    <header>
      <img src={logoImg} className={styles.img}></img>
      <div className={styles.tags}>
        <NavLink to={!isWelcome ? "/main" : "/"} className={styles.text}>
          market BEE
        </NavLink>
        <div className={styles.links}>
          {!isWelcome && (
            <>
              <div className={styles.linkBox}>
                <NavLink to="/marketing" className={styles.link}>
                  소개
                </NavLink>
                <div className={styles.link}>홍보</div>
                <NavLink to="/smartreport" className={styles.link}>
                  스마트 리포트
                </NavLink>
              </div>
            </>
          )}
          <div className={styles.myBox}>
            <NavLink to="/my" className={styles.link}>
              마이 페이지
            </NavLink>
            <div className={styles.imgs}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
