import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AcoountForm";
import StoreForm from "../components/auth/StoreForm";
import TitleBox from "../components/auth/TitleBox";
import SignupAgreement from "../components/auth/SignupAgreement";
import { useSignForm } from "../hooks/useSignupForm";
// import { signup } from "../api";

function SignupPage() {
  const { account, setAccount, store, setStore } = useSignForm();
 
  return (
    <>
      <div className={styles.container}>
        <TitleBox isShow={true} />
        <AccountForm account={account} setAccount={setAccount} />
        <StoreForm store={store} setStore={setStore} />
        <SignupAgreement />
        <button
          className={styles.btn}
          onClick={() => {
            console.log(account);
            console.log(store);
          }}
        >
          가입하기
        </button>
      </div>
    </>
  );
}

export default SignupPage;
