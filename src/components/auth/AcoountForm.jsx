import { useEffect, useState } from "react";
import styles from "../../styles/auth/AccountForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";

function AccountForm() {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    id: "",
    pw: "",
  });
  const [pwCon, setPwCon] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (pwCon === "") {
      setIsCorrect(false);
      return;
    }

    setIsCorrect(pwCon === account.pw ? false : true);
  }, [account.pw, pwCon]);

  return (
    <FormLayout>
      <FormTitle label="계정 정보" />
      <SignInput
        label="이름"
        name="name"
        type="text"
        width="240px"
        value={account.name}
        onChange={handleChange}
      />
      <FormLine />
      <SignInput
        label="이메일"
        name="email"
        isReq={false}
        type="email"
        value={account.email}
        onChange={handleChange}
      />
      <FormLine />
      <SignInput
        label="아이디"
        name="id"
        type="text"
        value={account.id}
        onChange={handleChange}
      />
      <FormLine />
      <div className={styles.pwBox}>
        <p className={styles.pwText}>영문, 숫자, 특수문자 조합으로 6~20자</p>
        <SignInput
          label="비밀번호"
          name="pw"
          type="password"
          value={account.pw}
          onChange={handleChange}
        />
        {isCorrect && (
          <p className={styles.pwError}>비밀번호가 일치하지 않습니다.</p>
        )}
        <SignInput
          label="비밀번호 확인"
          type="password"
          value={pwCon}
          isCorrect={isCorrect}
          onChange={(e) => setPwCon(e.target.value)}
        />
      </div>
    </FormLayout>
  );
}

export default AccountForm;
