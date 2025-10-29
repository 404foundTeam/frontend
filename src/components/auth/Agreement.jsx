import styles from "../../styles/auth/Agreement.module.css";
import CheckBox from "./CheckBox";

function Agreement({ content, isSelected, onClick, isReq }) {
  return (
    <div className={styles.agreement}>
      <CheckBox isSelected={isSelected} onClick={onClick} />
      <p className={styles.content}>
        {content}
        {isReq ? (
          <span className={styles.required}>(필수)</span>
        ) : (
          <span className={styles.selection}>(선택)</span>
        )}
      </p>
    </div>
  );
}

export default Agreement;
