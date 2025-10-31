import { NavLink, useLocation } from "react-router-dom";
import styles from "../../styles/layout/Header.module.css";
import logoImg from "../../assets/logo.png";
import up from "../../assets/menu_up.png";
import down from "../../assets/menu_down.png";
import MarketingMenu from "./MarketingMenu";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";

function Header({ isWelcome }) {
  const [showMarketing, setShowMarketing] = useState(false); // 홍보 메뉴 제어
  const [showProfile, setShowProfile] = useState(false); // 프로필 메뉴 제어
  const loaction = useLocation();

  // 페이지 이동 시 모든 메뉴 제거
  useEffect(() => {
    setShowMarketing(false);
    setShowProfile(false);
  }, [loaction]);

  return (
    <header>
      <div className={styles.titleBox}>
        <img src={logoImg} className={styles.logoImg}></img>
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
                  onMouseEnter={() => setShowMarketing(true)}
                  onMouseLeave={() => setShowMarketing(false)}
                >
                  홍보
                </div>
                {showMarketing ? (
                  <img src={down} className={styles.img} />
                ) : (
                  <img src={up} className={styles.img} />
                )}
              </div>
              {showMarketing && (
                <MarketingMenu
                  onMouseEnter={() => setShowMarketing(true)}
                  onMouseLeave={() => setShowMarketing(false)}
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
              <div
                className={styles.profileImg}
                onMouseEnter={() => setShowProfile(true)}
                onMouseLeave={() => setShowProfile(false)}
              ></div>
              {showProfile && (
                <ProfileMenu
                  onMouseEnter={() => setShowProfile(true)}
                  onMouseLeave={() => setShowProfile(false)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
