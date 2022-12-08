import React from "react";
import "./ToDoInsert.scss";
import { useState, useCallback } from "react";

//react-icons의 MaterialDesign의 MdAdd라는 아이콘 사용
import { MdAdd } from "react-icons/md";

const ToDoInsert = ({ onInsert }) => {
  //입력된 데이터를 저장하기 위한 state
  const [value, setValue] = useState("");

  //입력내용이 변경될때 호출될 함수
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //form에서 submit이벤트가 발생하면 호출될 함수
  //form 안에서 submit버튼을 눌러도 submit 이벤트가 발생하지만
  //form 안에서 enter를 눌러도 submit이벤트 발생한다.
  const onSubmit = useCallback(
    (e) => {
      const result = window.confirm(`추가할 내용: ${value}`);
      if (result === false) {
        e.preventDefault();
        return;
      }
      //데이터 삽입
      onInsert(value);
      //input 초기화
      setValue("");
      //제공되는 기본 이벤트 처리 코드를 수행하지않음
      //form의 submit이나 a태그는
      // 화면전체를 갱신하기 때문에 이전내용을 모두 잃어버림
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className="ToDoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하시오"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default ToDoInsert;
