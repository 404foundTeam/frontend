import FormTitle from "../components/FormTitle";
import Header from "../components/layout/Header";
import SignInput from "../components/SignInput";
import TitleBox from "../components/TitleBox";
import styles from "../styles/SignupPage.module.css";

function SignupPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <TitleBox isShow={true} />
        <form className={`${styles.form} ${styles.account}`}>
          <FormTitle label="계정 정보" />
          <SignInput label="이름" type="text" />
          <div className={styles.line}></div>
          <SignInput label="이메일" isReq={false} type="email" />
          <div className={styles.line}></div>
          <SignInput label="아이디" type="text" />
          <div className={styles.line}></div>
          <div className={styles.pwBox}>
            <p className={styles.pwText}>
              영문, 숫자, 특수문자 조합으로 6~20자
            </p>
            <SignInput label="비밀번호" type="password" />
            <SignInput label="비밀번호 확인" type="password" />
          </div>
        </form>
        <form className={`${styles.form} ${styles.store}`}>
          <FormTitle label="업장 정보" isShow={true} />
        </form>
      </div>
    </>
  );
}

export default SignupPage;
