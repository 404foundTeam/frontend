import styles from "../../styles/TextBox.module.css";

function TextBox({ title, content }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default TextBox;
