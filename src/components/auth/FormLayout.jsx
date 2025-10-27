import styles from "../../styles/auth/FormLayout.module.css";

function FormLayout({ children }) {
  return <form className={styles.form}>{children}</form>;
}

export default FormLayout;
