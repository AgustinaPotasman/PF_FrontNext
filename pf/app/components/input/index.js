import styles from "./input.module.css";

export default function Input({iType , iPlaceholder , iLabel}) {
    return (<div className={styles.container}>
        <label className={styles.label}>{iLabel}</label>
        <input className={styles.input} type={iType} placeholder={iPlaceholder}></input>
      </div>
    );
  }
  