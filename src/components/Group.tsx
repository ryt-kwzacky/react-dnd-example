import { useDrop } from "react-dnd";

import styles from "./Group.module.scss";
import Item from "./Item";
import Draggable from "./Draggable";
import {
  Item as _Item,
  ItemWithIndex,
  GroupType,
  ItemTypes,
  TitleMap,
  MoveHandler,
} from "../data";

const Group: React.FC<{
  items: _Item[];
  groupType: GroupType;
  firstIndex: number;
  onMove: MoveHandler;
}> = ({ items, groupType, firstIndex, onMove }) => {
  // dropイベントだけ発行して、itemの入れ替えだけでなく、グループにdropできるようにしている
  const [, ref] = useDrop({
    accept: ItemTypes,
    hover(dragItem: ItemWithIndex) {
      const dragIndex = dragItem.index;
      if (dragItem.group === groupType) return;
      const targetIndex =
        dragIndex < firstIndex
          ? // forward
            firstIndex + items.length - 1
          : // backward
            firstIndex + items.length;
      onMove(dragIndex, targetIndex, groupType);
      dragItem.index = targetIndex;
      dragItem.group = groupType;
    },
  });

  return (
    <div className={[styles.group, groupType].join(" ")}>
      <h2>
        <span className={styles.count}>{items.length}</span>
        {TitleMap[groupType]}
      </h2>
      <ul className={styles.list} ref={ref}>
        {items.map((item, i) => {
          return (
            <li key={item.id} className={styles.itemWrapper}>
              <Draggable item={item} index={firstIndex + i} onMove={onMove}>
                <Item id={item.id} contents={item.contents} />
              </Draggable>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Group;
