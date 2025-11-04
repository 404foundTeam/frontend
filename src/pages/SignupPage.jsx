import { useNavigate } from "react-router-dom";
import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AccountForm";
import StoreForm from "../components/auth/StoreForm";
import TitleBox from "../components/auth/TitleBox";
import SignupAgreement from "../components/auth/SignupAgreement";
import { useSignForm } from "../hooks/useSignupForm";
import { signup } from "../api/auth";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import ToastMessage from "../components/shared/ToastMessage";

function SignupPage() {
  const { account, setAccount, store, setStore } = useSignForm();
  const [formValidity, setFormValidity] = useState({
    account: false,
    store: false,
    agreement: false,
  });
  const navigate = useNavigate();

  const handleAccount = useCallback((value) => {
    setFormValidity((prev) => ({ ...prev, account: value }));
  }, []);
  const handleStore = useCallback((value) => {
    setFormValidity((prev) => ({ ...prev, store: value }));
  }, []);
  const handleAgreement = useCallback((value) => {
    setFormValidity((prev) => ({ ...prev, agreement: value }));
  }, []);

  // 커스텀 훅 account, store 상태로 회원가입 api 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidity.account === false) {
      toast.error("계정 정보를 올바르게 입력해주세요");
      return;
    }
    if (formValidity.store === false) {
      toast.error("업장 정보를 올바르게 입력해주세요");
      return;
    }
    if (formValidity.agreement === false) {
      toast.error("약관 동의를 확인해주세요");
      return;
    }

    const payload = { ...account, ...store };

    try {
      const res = await signup(payload);

      toast(<ToastMessage>{res.message}</ToastMessage>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("회원가입 실패");
    }
  };

  const isDsiabled =
    formValidity.account && formValidity.store && formValidity.agreement;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TitleBox isShow={true} />
      <AccountForm
        account={account}
        setAccount={setAccount}
        handleAccount={handleAccount}
        isStore={formValidity.store}
      />
      <StoreForm store={store} setStore={setStore} handleStore={handleStore} />
      <SignupAgreement handleAgreement={handleAgreement} />
      <button type="submit" className={styles.btn} disabled={!isDsiabled}>
        가입하기
      </button>
    </form>
  );
}

export default SignupPage;
