import styles from "../../styles/layout/Footer.module.css";

import logoImg from "../../assets/logo.png";

function Footer() {
  return (
    <footer>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} />
          <p className={styles.logoText}>market BEE</p>
        </div>
        <div className={styles.headerBox}>
          <p>ABOUT</p>
          <p>SEARCH</p>
          <p>RECRUIT</p>
          <p>CONTACT</p>
        </div>
      </div>
      <div className={styles.content}>
        <p>자주 묻는 질문</p>
        <p>개인정보지침</p>
        <p>광고 운영정책</p>
        <div className={styles.contentBox}>
          <div className={styles.aboutContent}>
            <p>메인</p>
            <p>홍보</p>
            <p>지도이용제휴</p>
            <p>카드뉴스생성</p>
            <p>사진촬영가이드</p>
          </div>
          <p className={styles.aboutContent}>업장등록</p>
        </div>
      </div>
      <div className={styles.footer}>
        Copyrignt © 2025 market BEE. All rights reserved. (주)market BEE 대표:
        ooo 주소 : 서울특별시 양천구
        <br /> 사업자 등록 번호 : 192-400565
      </div>
    </footer>
  );
}

export default Footer;
