import { IToDo, toDoState, Categories } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const setLocalStorage = (toDos: IToDo[]) => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newArr = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),];
      setLocalStorage(newArr);
      return newArr;
    });
  };
  const deleteFn = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newArr = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),];
      setLocalStorage(newArr);
      return newArr;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteFn}>Delete</button>
    </li>
  );
}

export default ToDo;