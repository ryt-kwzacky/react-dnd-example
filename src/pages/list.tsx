import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from "@/components/List";

const Name: React.FC<{}> = ({}) => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <List></List>
      </DndProvider>
    </>
  );
};

export default Name;
