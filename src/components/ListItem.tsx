const ListItem: React.FC<{
  id: number;
  item: number;
}> = ({ id, item }) => {
  return (
    <>
      <p>id: {id}</p>
      <p>item: {item}</p>
    </>
  );
};

export default ListItem;
