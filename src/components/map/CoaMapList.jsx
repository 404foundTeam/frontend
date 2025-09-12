import styles from "../../styles/map/CoaMapList.module.css";

function CoaMapList({ name, addr }) {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.addr}>{addr}</p>
      </div>
    </>
  );
}

export default CoaMapList;
