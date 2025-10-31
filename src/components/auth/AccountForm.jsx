import { useEffect, useState } from "react";
import styles from "../../styles/auth/AccountForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";
import { exists } from "../../api";

function AccountForm({ account, setAccount, handleAccount, isStore }) {
  const [emailError, setEmailError] = useState(false);
  const [idCheck, setIdCheck] = useState({
    available: true,
    message: "",
  });
  const [pwCon, setPwCon] = useState("");
  const [pwError, setPwError] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);

  // 커스텀 훅 account 상태 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  // 아이디 중복 검사
  const handleIdBlur = async () => {
    if (!account.userId) {
      setIdCheck({ available: true, message: "" });
      return;
    }

    try {
      const check = await exists({ userId: account.userId });
      setIdCheck({
        available: check.available,
        message: check.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (account.email === "") {
      setEmailError(false);
      return;
    }

    // 이메일 정규식 (RFC 5322 기반)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    setEmailError(!emailRegex.test(account.email));
  }, [account.email]);

  // 비밀번호 유효성 검사
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

  // 비밀번호 일치 검사
  useEffect(() => {
    if (pwCon === "") {
      setIsMismatch(false);
      return;
    }

    setIsMismatch(pwCon !== account.password);
  }, [account.password, pwCon]);

  // 계정 폼 상태 페이지로 전달
  useEffect(() => {
    const isUserNameValid = account.userName.trim() !== "";
    const isEmailValid = !emailError;
    const isIdValid = idCheck.available && account.userId.trim() !== "";
    const isPasswordValid = !pwError && account.password.trim() !== "";
    const isPwConValid = !isMismatch;

    const isFormValid =
      isUserNameValid &&
      isEmailValid &&
      isIdValid &&
      isPasswordValid &&
      isPwConValid;

    handleAccount(isFormValid);
  }, [account, emailError, idCheck, pwError, isMismatch, handleAccount]);

  return (
    <FormLayout>
      <FormTitle label="계정 정보" isStore={isStore} />
      <SignInput
        label="이름"
        name="userName"
        type="text"
        width="200px"
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
        hasError={emailError}
        onChange={handleChange}
      />
      <FormLine />
      <SignInput
        label="아이디"
        helper={idCheck.available ? idCheck.message : ""}
        error={!idCheck.available ? idCheck.message : ""}
        name="userId"
        type="text"
        value={account.userId}
        hasError={!idCheck.available}
        onChange={handleChange}
        onBlur={handleIdBlur}
        autocomplete="username"
      />
      <FormLine />
      <div className={styles.pwBox}>
        <SignInput
          label="비밀번호"
          helper="영문, 숫자, 특수문자 조합으로 6~20자"
          error="영문, 숫자, 특수문자 조합으로 6~20자로 입력해주세요."
          name="password"
          type="password"
          value={account.password}
          hasError={pwError}
          onChange={handleChange}
          autocomplete="new-password"
        />
        <SignInput
          label="비밀번호 확인"
          error="비밀번호가 일치하지 않습니다."
          type="password"
          value={pwCon}
          hasError={isMismatch}
          onChange={(e) => setPwCon(e.target.value)}
          autocomplete="new-password"
        />
      </div>
    </FormLayout>
  );
}

export default AccountForm;
