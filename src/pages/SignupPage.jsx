import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AcoountForm";
import StoreForm from "../components/auth/StoreForm";
import TitleBox from "../components/auth/TitleBox";

function SignupPage() {
  return (
    <>
      <div className={styles.container}>
        <TitleBox isShow={true} />
        <AccountForm />
        <StoreForm />
      </div>
    </>
  );
}

export default SignupPage;
