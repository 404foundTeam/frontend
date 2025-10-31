import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/layout/ProfileMenu.module.css";

function ProfileMenu({ onMouseEnter, onMouseLeave }) {
  const clearAuthStore = useAuthStore((state) => state.clearAuthStore);
  const navigate = useNavigate();

  const hanldeLogout = () => {
    clearAuthStore();
    navigate("/");
  };

  return (
    <div
      className={styles.menuBox}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.content}>
        <div>결제 내역 / 환불</div>
        <div>내 쿠폰</div>
        <div>회원정보 수정</div>
        <div>비밀번호 변경</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.logout} onClick={hanldeLogout}>
        로그아웃
      </div>
    </div>
  );
}

export default ProfileMenu;
