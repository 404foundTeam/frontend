import { NavLink } from "react-router-dom";
import styles from "../../styles/layout/Header.module.css";
import logoImg from "../../assets/logo.png";
import up from "../../assets/menu_up.png";
import down from "../../assets/menu_down.png";
import MarketingMenu from "./MarketingMenu";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

function Header({ isWelcome }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className={styles.titleBox}>
        <img src={logoImg} className={styles.img}></img>
        <NavLink to={!isWelcome ? "/main" : "/"} className={styles.text}>
          market BEE
        </NavLink>
      </div>
      <div className={styles.links}>
        {!isWelcome && (
          <>
            <div className={styles.linkBox}>
              <NavLink to="/marketing" className={styles.link}>
                소개
              </NavLink>
              <div className={styles.marketingBox}>
                <div
                  className={`${styles.link} ${styles.showMenu}`}
                  onMouseEnter={() => setShowMenu(true)}
                  onMouseLeave={() => setShowMenu(false)}
                >
                  홍보
                </div>
                {showMenu ? (
                  <img src={down} className={styles.img} />
                ) : (
                  <img src={up} className={styles.img} />
                )}
              </div>
              {showMenu && (
                <MarketingMenu
                  onMouseEnter={() => setShowMenu(true)}
                  onMouseLeave={() => setShowMenu(false)}
                />
              )}
              <NavLink to="/smartreport" className={styles.link}>
                스마트 리포트
              </NavLink>
            </div>
            <div className={styles.myBox}>
              <NavLink to="/my" className={styles.link}>
                마이 페이지
              </NavLink>
              <div className={styles.profileImg}></div>
              <ProfileMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
