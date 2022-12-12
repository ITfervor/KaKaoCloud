import React, { useRef, useCallback, useState } from "react";

import produce from "immer";

function App() {
  //컴포넌트 안에서 사용할 변수 생성
  const nextId = useRef(1);
  //state(수정하면 리랜더링을 수행)를 생성하고 setter함수를 설정
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  //input에 입력받는 경우 입력하는 데이터가 변경될때
  //state를 수정해주는 함수
  /*   const onChange = useCallback(
    (e) => {
      setForm({
        ...form,
        [e.target.name]: [e.target.value],
      });
    },
    [form]
  );
 */
  const onChange = useCallback((e) => {
    setForm(
      //draft가 form의 복제본이 되고
      //draft를 수정하면 immer가 알아서
      //form에 데이터를 전송한다
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  }, []);

  //입력받은 데이터를 등록하는 함수
  //form에서 submit이벤트가 발생할때 호출
  //컴포넌트안에서 함수를 만들때는 특별한 경우가 아니면
  // useCallback안에 만드는 것이 좋다.
  // useeCallback으ㅏㄹ 이용하면 두번째 매개변수로 대입된 deps배열안의
  // 데이터가 변경되는경우만 새로 만들어진다.
  // useCallback을 사용하지않으면 리랜더링 될때마다 함수가 다시만들어짐

  /* const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //기본적으로 제공되는 이벤트를 수행하지 않도록 함
      // a태그를 이용한 이동이나 form 의 submit이나 reset이벤트는
      // 화면전체를 새로생성한다.
      // 이전에 가지고 있던 내용을 모두 삭제한다.
      //react,vue,angular는 SPAframework라서 화면전체를
      // 다시랜더링하면 기본틀이 무너진다.
      // 화면에 출력된 내용과 가상 DOM을 비교해서 변경된 부분만 리랜더링 수행
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData({
        ...data,
        array: data.array.concat(info),
      });

      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [data, form.name, form.username]
  );
 */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      //data를 draft에 깊은 복사를 하고
      // draft에 작업을 수행한후 다시 data에 복제
      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [form.name, form.username]
  );

  //항목을 삭제하는 함수
  /* const onRemove = useCallback(
    (e) => {
      setData({
        ...data,
        array: data.array.filter((info) => info.id !== e),
      });
    },
    [data]
  ); */

  const onRemove = useCallback(
    (e) => {
      setData(
        produce((draft) =>
          draft.array.splice(
            draft.array.findIndex((info) => info.id !== e),
            1
          )
        )
      );
    },
    [data]
  );
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디를 입력하세요"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
