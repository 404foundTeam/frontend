import styles from "../../styles/camera/CameraButton.module.css";

function CameraButton({ children, label, onClick }) {
  return (
    <button className={`${styles.button} ${styles[label]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default CameraButton;
