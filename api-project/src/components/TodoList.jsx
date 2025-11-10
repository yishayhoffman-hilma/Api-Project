function TodoList(props) {
  return (
    <>
      {props.data.map((value, index) => {
        return (
          <>
            <p key={index + 1}>
              {value.id}
              {".\t"}
              {value.title}
            </p>
            <input key={index + 2} type="checkbox"></input>
          </>
        );
      })}
    </>
  );
}

export default TodoList;
