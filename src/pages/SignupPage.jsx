import styles from "../styles/SignupPage.module.css";
import AccountForm from "../components/auth/AcoountForm";
import StoreForm from "../components/auth/StoreForm";
import Header from "../components/layout/Header";
import TitleBox from "../components/auth/TitleBox";

function SignupPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <TitleBox isShow={true} />
        <AccountForm />
        <StoreForm />
      </div>
    </>
  );
}

export default SignupPage;
