import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AcoountForm";
import StoreForm from "../components/auth/StoreForm";
import TitleBox from "../components/auth/TitleBox";
import SignupAgreement from "../components/auth/SignupAgreement";

function SignupPage() {
  return (
    <>
      <div className={styles.container}>
        <TitleBox isShow={true} />
        <AccountForm />
        <StoreForm />
        <SignupAgreement />
        <button className={styles.btn}>가입하기</button>
      </div>
    </>
  );
}

export default SignupPage;
