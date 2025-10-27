import { useEffect, useState } from "react";
import styles from "../styles/LoginPage.module.css";
import TitleBox from "../components/auth/TitleBox";
import LoginInput from "../components/auth/LoginInput";
import { Link } from "react-router-dom";

function LoginPage() {
  const [auth, setAuth] = useState({ id: "", pw: "" });
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuth((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    auth.id && auth.pw ? setIsActive(true) : setIsActive(false);
  }, [auth]);

  return (
    <>
      <div className={styles.container}>
        <TitleBox />
        <form className={styles.form}>
          <LoginInput
            label="아이디"
            name="id"
            type="text"
            placeholder="아이디를 입력해주세요."
            value={auth.id}
            onChange={handleChange}
            onRest={() => setAuth((state) => ({ ...state, id: "" }))}
          />
          <LoginInput
            label="비밀번호"
            name="pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={auth.pw}
            onChange={handleChange}
            onRest={() => setAuth((state) => ({ ...state, pw: "" }))}
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
