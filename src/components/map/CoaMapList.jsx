import styles from "../../styles/map/CoaMapList.module.css";

function CoaMapList({ key, name, addr }) {
  return (
    <>
      <div className={styles.container} key={key}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.addr}>{addr}</p>
      </div>
    </>
  );
}

export default CoaMapList;
