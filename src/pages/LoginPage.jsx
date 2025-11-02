import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import styles from "../styles/LoginPage.module.css";
import useAuthStore from "../store/useAuthStore";
import TitleBox from "../components/auth/TitleBox";
import LoginInput from "../components/auth/LoginInput";
import { toast } from "react-toastify";
import ToastMessage from "../components/shared/ToastMessage";

function LoginPage() {
  const [auth, setAuth] = useState({ userId: "", password: "" });
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const setAuthStore = useAuthStore((state) => state.setAuthStore);

  // 커스텀 훅 auth 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuth((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const getAuth = await login({
        userId: auth.userId,
        password: auth.password,
      });
      if (getAuth.success) {
        setAuthStore(
          getAuth.accessToken,
          getAuth.placeName,
          getAuth.storeUuid,
          getAuth.roadAddress
        );

        toast(<ToastMessage>{getAuth.message}</ToastMessage>, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        // alert(getAuth.message);
        setTimeout(() => {
          navigate("/main");
        }, 1500);
      } else {
        toast.info(getAuth.message);
        // alert(getAuth.message);
      }
    } catch (error) {
      toast.error("서버 오류");
      // alert("서버 오류");
      console.log(error);
    }
  };

  // 버튼 활성화
  useEffect(() => {
    auth.userId && auth.password ? setIsActive(true) : setIsActive(false);
  }, [auth]);

  return (
    <div className={styles.container}>
      <TitleBox />
      <form className={styles.form} onSubmit={handleSubmit}>
        <LoginInput
          label="아이디"
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={auth.userId}
          onChange={handleChange}
          onRest={() => setAuth((state) => ({ ...state, userId: "" }))}
        />
        <LoginInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={auth.password}
          onChange={handleChange}
          onRest={() => setAuth((state) => ({ ...state, password: "" }))}
        />
        <button
          type="submit"
          className={`${styles.btn} ${isActive ? styles.active : ""}`}
        >
          로그인
        </button>
      </form>
      <div className={styles.authFooter}>
        <a>비밀번호 찾기</a> | <a>아이디 찾기</a> |{" "}
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default LoginPage;
