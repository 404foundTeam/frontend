import { NavLink } from "react-router-dom";
import styles from "../../styles/layout/MarketingMenu.module.css";

function MarketingMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={styles.menuBox}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className={styles.menuTitle}>홍보</p>
      <div className={styles.navs}>
        <NavLink to="/cardnews">카드뉴스 제작</NavLink>
        <NavLink to="/camera">사진 촬영 가이드</NavLink>
        <NavLink to="/map">지도 이용 제휴</NavLink>
        <NavLink to="/smartreport">맞춤형 마케팅</NavLink>
      </div>
    </div>
  );
}

export default MarketingMenu;
