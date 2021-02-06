import React, { useCallback, ChangeEventHandler } from "react";
import { LogoGithubIcon } from "@primer/octicons-react";

import styles from "./Header.module.css";

const Header: React.FC<{
  isHorizontal: boolean;
  onChangeIsHorizontal: (isHorizontal: boolean) => void;
}> = ({ isHorizontal, onChangeIsHorizontal }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChangeIsHorizontal(e.target.checked);
    },
    [onChangeIsHorizontal]
  );

  return (
    <header className={styles.header}>
      <h1>かんばん(Sansanのカタチ) with React DnD</h1>
      <label className={styles.checkbox}>
        <input type="checkbox" onChange={handleChange} checked={isHorizontal} />
        Horizontal?
      </label>
      <a
        href="https://github.com/MtBlue81/react-dnd-sandbox"
        className={styles.githubLink}
      >
        <LogoGithubIcon className={styles.githubIcon} />
      </a>
    </header>
  );
};

export default React.memo(Header);
