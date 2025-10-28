import { useEffect, useState } from "react";
import styles from "../../styles/auth/AccountForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";

function AccountForm({ account, setAccount }) {
  const [pwCon, setPwCon] = useState("");
  const [pwError, setPwError] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // 비어있으면 에러 메시지 초기화
    if (account.password === "") {
      setPwError(false);
      return;
    }

    // Regex: 6~20자, 영문, 숫자, 특수문자(!@#$%^&*) 최소 1개씩 포함
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,20}$/;

    setPwError(!regex.test(account.password));
  }, [account.password]);

  useEffect(() => {
    if (pwCon === "") {
      setIsMismatch(false);
      return;
    }

    setIsMismatch(pwCon !== account.password);
  }, [account.password, pwCon]);

  return (
    <FormLayout>
      <FormTitle label="계정 정보" />
      <SignInput
        label="이름"
        name="userName"
        type="text"
        width="240px"
        value={account.userName}
        onChange={handleChange}
      />
      <FormLine />
      <SignInput
        label="이메일"
        error="이메일이 올바르지 않습니다."
        name="email"
        isReq={false}
        type="email"
        value={account.email}
        onChange={handleChange}
      />
      <FormLine />
      <SignInput
        label="아이디"
        error="아이디가 중복됩니다."
        name="userId"
        type="text"
        value={account.userId}
        onChange={handleChange}
      />
      <FormLine />
      <div className={styles.pwBox}>
        <SignInput
          label="비밀번호"
          helper="영문, 숫자, 특수문자 조합으로 6~20자를 입력해주세요."
          error="영문, 숫자, 특수문자 조합으로 6~20자로 입력해주세요."
          name="password"
          type="password"
          value={account.password}
          hasError={pwError}
          onChange={handleChange}
        />
        <SignInput
          label="비밀번호 확인"
          error="비밀번호가 일치하지 않습니다."
          type="password"
          value={pwCon}
          hasError={isMismatch}
          onChange={(e) => setPwCon(e.target.value)}
        />
      </div>
    </FormLayout>
  );
}

export default AccountForm;
