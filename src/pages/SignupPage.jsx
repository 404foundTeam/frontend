import { useNavigate } from "react-router-dom";
import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AccountForm";
import StoreForm from "../components/auth/StoreForm";
import TitleBox from "../components/auth/TitleBox";
import SignupAgreement from "../components/auth/SignupAgreement";
import { useSignForm } from "../hooks/useSignupForm";
import { signup } from "../api";
import { useState } from "react";

function SignupPage() {
  const { account, setAccount, store, setStore } = useSignForm();
  const [active, setActive] = useState({
    account: false,
    store: false,
    agreement: false,
  });
  const navigate = useNavigate();

  // 커스텀 훅 account, store 상태로 회원가입 api 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...account, ...store };

    try {
      const res = await signup(payload);
      alert(res.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("회원가입 실패");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TitleBox isShow={true} />
      <AccountForm account={account} setAccount={setAccount} />
      <StoreForm store={store} setStore={setStore} />
      <SignupAgreement active={active.agreement} />
      <button type="submit" className={styles.btn}>
        가입하기
      </button>
    </form>
  );
}

export default SignupPage;
