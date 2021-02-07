import { useDrop } from "react-dnd";

const DragTest: React.FC<{}> = () => {
  // ここで、dropを定義している
  // useDragメソッドには、ドロップの設定をオブジェクト型の引数で渡している
  // accept: dragTypeとして指定したものと一致した場合dropできる
  // drop: 受入可能な項目がドロップされると指定した関数が発火される
  // 定義したdropはdrag同様DOMと結びつける（connector）
  // ドラッグ対象かつドロップ対象にしたいときは drag(drop(ref));
  const [, drop] = useDrop({
    accept: "test",
    hover: (_, monitor) => {
      console.log("hoverd!!!");
      console.log(monitor.getClientOffset());
    }, // ドロップエリアに入ったときに発火される。
    drop: () => console.log("droped!!!"),
  });

  return (
    <div ref={drop}>
      <p>drop area</p>
    </div>
  );
};

export default DragTest;
