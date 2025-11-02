import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/layout/MarketingMenu.module.css";
import useActiveStroe from "../../store/useActiveStore";

function MarketingMenu({ onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();
  const setSmartActive = useActiveStroe((state) => state.setSmartActive);

  return (
    <div
      className={styles.menuBox}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <p className={styles.menuTitle}>홍보</p> */}
      <div className={styles.navs}>
        <NavLink to="/cardnews">카드뉴스 제작</NavLink>
        <NavLink to="/camera">사진 촬영 가이드</NavLink>
        <NavLink to="/map">지도 이용 제휴</NavLink>
        <div
          onClick={() => {
            setSmartActive("marketing");
            navigate("/smartreport");
          }}
        >
          맞춤형 마케팅
        </div>
      </div>
    </div>
  );
}

export default MarketingMenu;
