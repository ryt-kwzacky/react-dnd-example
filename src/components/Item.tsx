import { NoteIcon } from "@primer/octicons-react";

import styles from "./Item.module.scss";
import type { Contents } from "../data";

const Item: React.FC<{
  id: number;
  contents: Contents;
}> = ({ contents }) => (
  <div className={styles.item}>
    <NoteIcon className={styles.icon} />
    <div className={styles.contents}>
      <p className={styles.title}>{contents.title}</p>
      <p className={styles.memo}>{contents.memo}</p>
    </div>
  </div>
);

export default Item;
