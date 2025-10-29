import styles from "../../styles/auth/FormLayout.module.css";

function FormLayout({ children }) {
  return <div className={styles.form}>{children}</div>;
}

export default FormLayout;
