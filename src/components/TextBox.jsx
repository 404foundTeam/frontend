import styles from "../styles/TextBox.module.css";

function TextBox() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        소상공인을 위한 쉽고 빠른 플랫폼, market BEE
      </h2>
      <p className={styles.content}>
        클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
        관리해보세요
      </p>
    </div>
  );
}

export default TextBox;
