import { useDrag } from "react-dnd";

const DragTest: React.FC<{}> = () => {
  // ここで、isDragging, canDrag, dragの3つを定義している
  // useDragメソッドには、ドラッグの設定をオブジェクト型の引数で渡している
  // item: ドラッグするデータを表すオブジェクト
  // collect: コンポーネントに注入されるドラッグプロパティのオブジェクトを返す関数。
  // これを const { isDragging, canDrag } で受け取っている
  // dragできる要素を ref={drag} で指定
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { type: "test" },
    isDragging: () => {
      console.log("dragging!!!");
      return true;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: canDrag ? "move" : "default",
      }}
    >
      <p>{String(isDragging)}</p>
      <p>{String(canDrag)}</p>
    </div>
  );
};

export default DragTest;
