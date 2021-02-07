import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import styles from "./ListItemDndContainer.module.scss";

export type MoveHandler = (dragIndex: number, targetIndex: number) => void;

const ListItemDndContainer: React.FC<{
  index: number;
  onMove: MoveHandler;
}> = ({ index, onMove, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  type ItemWithIndex = {
    type: "listItem";
    index: number;
  };

  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { type: "listItem", index },
    // ここのisDraggingで条件判定方法を変更する
    // 無条件でtrueを返すようにするとdiv内のロジックで全部スタイルが変更される
    // isDragging: () => {
    //   console.log("dragging!!!");
    //   return true;
    // },
    collect: (monitor) => ({
      // 変更したisDraggingを使用している
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  const [, drop] = useDrop({
    accept: "listItem",
    hover: (dragItem: ItemWithIndex, monitor) => {
      // itemsを持っている親でidを配列内の順序を変更する処理を渡し、ここで引数に対象とするidを入れて発火する
      console.log("hoverd!!!");

      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    }, // ドロップエリアに入ったときに発火される。
    drop: () => console.log("droped!!!"),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: canDrag ? "move" : "default",
      }}
      className={styles.container}
    >
      {children}
    </div>
  );
};

export default ListItemDndContainer;
