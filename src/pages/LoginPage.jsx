import { useEffect, useState } from "react";
import styles from "../styles/LoginPage.module.css";
import TitleBox from "../components/auth/TitleBox";
import LoginInput from "../components/auth/LoginInput";
import { Link } from "react-router-dom";
import { login } from "../api";
import useAuthStore from "../store/useAuthStore";

function LoginPage() {
  const [auth, setAuth] = useState({ userId: "", password: "" });
  const [isActive, setIsActive] = useState(false);
  const setAuthStore = useAuthStore((state) => state.setAuthStore);

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
      setAuthStore(getAuth.accessToken, getAuth.storeName, getAuth.roadAddress);

      alert("로그인 성공");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    auth.userId && auth.password ? setIsActive(true) : setIsActive(false);
  }, [auth]);

  return (
    <>
      <div className={styles.container}>
        <TitleBox />
        <form
          className={styles.form}
          // onSubmit={handleSubmit}
        >
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
    </>
  );
}

export default LoginPage;
