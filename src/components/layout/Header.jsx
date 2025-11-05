import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const loaction = useLocation(); // 메뉴 제거

  const goToMain = () => {
    navigate("/main");
  };

  // 페이지 이동 시 모든 메뉴 제거
  useEffect(() => {
    setShowMarketing(false);
    setShowProfile(false);
  }, [loaction]);

  return (
    <header>
      <div className={styles.headerBox}>
        <div className={styles.headerInner}>
          <div className={styles.titleBox} onClick={goToMain}>
            <img src={logoImg} className={styles.logoImg}></img>
            <div className={styles.text}>market BEE</div>
          </div>
          <div className={styles.links}>
            {!isWelcome && (
              <>
                <div className={styles.linkBox}>
                  <NavLink to="/about" className={styles.link}>
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
                    <img
                      src={showMarketing ? down : up}
                      className={`${styles.img} ${
                        showMarketing ? styles.active : ""
                      }`}
                    />
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
                    마이페이지
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
        </div>
      </div>
    </header>
  );
}

export default Header;
