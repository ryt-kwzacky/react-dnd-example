import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Item, ItemWithIndex, ItemTypes, MoveHandler } from "../data";

const Draggable: React.FC<{
  item: Item;
  index: number;
  onMove: MoveHandler;
}> = ({ item, index, onMove, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes,
    hover(dragItem: ItemWithIndex, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      if (item.group === dragItem.group) {
        // 同グループ内でhoverしたときに以下の処理

        // グループ内での並び替えの場合は
        // 1. 入れ替え方向
        // 2. hover位置
        // に応じて入れ替えるかを確定

        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
        // 入れ替え処理をしない場合 returnで抜ける
      }

      // 入れ替え処理（同グループ、異なるグループ両方について）
      onMove(dragIndex, hoverIndex, item.group);
      dragItem.index = hoverIndex;
      dragItem.group = item.group;
    },
  });

  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { ...item, index },
    // ここのisDraggingで条件判定方法を変更する
    isDragging: (monitor) => monitor.getItem().id === item.id,
    collect: (monitor) => ({
      // 変更したisDraggingを使用している
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  drag(drop(ref));

  return (
    <div>
      <p>{index}</p>
      <p>{String(isDragging)}</p>
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0.4 : 1,
          cursor: canDrag ? "move" : "default",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Draggable;
