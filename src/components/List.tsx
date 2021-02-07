import { useState } from "react";
import ListItem from "./ListItem";
import ListItemDndContainer, { MoveHandler } from "./ListItemDndContainer";

import styles from "./List.module.scss";

const List: React.FC<{}> = ({}) => {
  const initialItems = [1, 2, 3, 4];
  const [items, useItems] = useState(initialItems);

  const moveItem: MoveHandler = (dragIndex, targetIndex) => {
    const item = items[dragIndex];
    const newItems = items.filter((_, idx) => idx !== dragIndex);
    newItems.splice(targetIndex, 0, item);
    useItems(newItems);
  };
  return (
    <>
      {items.map((item, i) => {
        return (
          <div className={styles.margin}>
            <ListItemDndContainer key={i} index={i} onMove={moveItem}>
              <ListItem id={i} item={item}></ListItem>
            </ListItemDndContainer>
          </div>
        );
      })}
    </>
  );
};

export default List;
