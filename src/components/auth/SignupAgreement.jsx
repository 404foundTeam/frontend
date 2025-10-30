import { useEffect, useState } from "react";
import styles from "../../styles/auth/SignupAgreement.module.css";
import Agreement from "./Agreement";
import CheckBox from "./CheckBox";
import FormLine from "./FormLine";

function SignupAgreement({ isAgreement }) {
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
    ads: false,
  });

  const handleAllClick = () => {
    const value = !agreements.all;
    setAgreements({
      all: value,
      service: value,
      privacy: value,
      marketing: value,
      ads: value,
    });
  };

  const handleClick = (e) => {
    const value = !agreements[e];

    setAgreements((prev) => ({ ...prev, [e]: value }));
  };

  useEffect(() => {
    const { all, service, privacy, marketing, ads } = agreements;
    const allChecked = service && privacy && marketing && ads;

    if (all !== allChecked) {
      setAgreements((prev) => ({ ...prev, all: allChecked }));
    }
  }, [agreements]);



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CheckBox
          size="20px"
          isSelected={agreements.all}
          onClick={handleAllClick}
        />
        <div className={styles.headerTitle}>전체동의</div>
      </div>
      <FormLine />
      <div className={styles.agreementBox}>
        <Agreement
          content="업장회원 이용약관 동의"
          isSelected={agreements.service}
          onClick={() => handleClick("service")}
          isReq={true}
        />
        <Agreement
          content="개인정보 처리방침"
          isSelected={agreements.privacy}
          onClick={() => handleClick("privacy")}
          isReq={true}
        />
        <Agreement
          content="마케팅 정보 수신 동의 - 이메일"
          isSelected={agreements.marketing}
          onClick={() => handleClick("marketing")}
        />
        <Agreement
          content="광고성 정보 수신 동의"
          isSelected={agreements.ads}
          onClick={() => handleClick("ads")}
        />
      </div>
    </div>
  );
}

export default SignupAgreement;
