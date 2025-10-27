import { useEffect, useState } from "react";
import styles from "../styles/LoginPage.module.css";
import Header from "../components/layout/Header";
import TitleBox from "../components/TitleBox";
import AuthInput from "../components/AuthInput";

function LoginPage() {
  const [auth, setAuth] = useState({ id: "", pw: "" });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    auth.id && auth.pw ? setIsActive(true) : setIsActive(false);
  }, [auth]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <TitleBox />
        <form className={styles.form}>
          <AuthInput
            type="text"
            placeholder="아이디를 입력해주세요."
            value={auth.id}
            onChange={(e) =>
              setAuth((state) => ({ ...state, id: e.target.value }))
            }
            onClick={() => setAuth((state) => ({ ...state, id: "" }))}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={auth.pw}
            onChange={(e) =>
              setAuth((state) => ({ ...state, pw: e.target.value }))
            }
            onClick={() => setAuth((state) => ({ ...state, pw: "" }))}
          />
          <button
            type="submit"
            className={`${styles.btn} ${isActive ? styles.active : ""}`}
          >
            로그인
          </button>
        </form>
        <div className={styles.authFooter}>
          <a>비밀번호 찾기</a> | <a>아이디 찾기</a> | <a>회원가입</a>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
