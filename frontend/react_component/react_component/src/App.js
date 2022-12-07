/* import Iteration from "./Iteration";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Iteration />
      </ErrorBoundary>
    </div>
  );
}

export default App;
 */
/* 
import React, { Component, useState } from "react";
import InputSample from "./InputSample";
class ClassState extends Component { */
/* 
  //생성자를 만들지 않고 이렇게 state를 초기화해도 된다.
  state = {
    count:0
  }
   */
/* constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <p>클릭을 {this.state.count} 번 수행</p>
        <button onClick={(e) => this.setState({ count: this.state.count + 1 })}>
          +1
        </button>
      </div>
    );
  }
}

//함수형 컴포넌트에서 state 사용

const FunctionState = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>클릭을 {count} 번 수행</p>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <ClassState />
      <FunctionState />
      <InputSample />
    </div>
  );
}

export default App;
 */

/* import React, { Component } from "react";

class ClassEffect extends Component {
  //생성자
  constructor(props) {
    super(props);
    console.log("생성자 - 가장먼저 호출되는 메서드");
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log("마운트 된 후 호출되는 메서드");
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    console.log("업데이트 된 후 호출되는 메서드");
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={(e) => this.setState({ count: this.state.count + 1 })}>
          {" "}
          +1{" "}
        </button>
      </div>
    );
  }
}

const App = () => {
  return (
    <div>
      <ClassEffect />
    </div>
  );
};
export default App; */

/* import React, { useState, useEffect } from "react";

const ClassEffect = () => {
  //생성자 작성
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("마운트와 업데이트가 끝나면 호출");
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ClassEffect />
    </div>
  );
};
export default App;
 */

import React from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import { useState, useRef, useMemo } from "react";
import Average from "./Average1";

//active 가 true인 데이터 개수
const countActiveUser = (users) => {
  console.log("사용자 수를 세기");
  return users.filter((user) => user.active).length;
};

const App = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const [users, setUsers] = useState([
    { id: 1, username: "adam", email: "itstudy@kakao.com", active: false },
    { id: 2, username: " 군계", email: "ggangpae@gmail.com", active: true },
  ]);

  const nextId = useRef(3);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    //users에 user를 추가
    setUsers([...users, user]);

    //입력요소 초기화
    setInputs({
      username: "",
      email: "",
    });

    //다음 id를 위해서 id를 1증가
    nextId.current += 1;
  };

  const onRemove = (id) => {
    //users state에서 id가 id인 데이터 삭제
    //id가 일치하지않는 데이터만 삭제
    //실제로는 id가 일치하지않는 데이터만 가지고 배열을 만들어서 수정
    setUsers(users.filter((user) => user.id !== id));
  };

  //수정하는 메서드
  //id에 해당하는 데이터의 active속성의 값을 반전
  const onToggle = (id) =>
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, acticve: !user.acticve } : user
      )
    );
  //활성화된 user개수를 세는 함수 호출
  //users에 변화가 생긴 경우에만 함수를 호출하도록 하고
  //그 이외에 경우네는 결과를 복사하도록 수정
  const count = useMemo(() => countActiveUser(users), [users]);

  return (
    <div>
      <Average />
      <UserList users={users} />
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성화 된 유저수 : {count}</div>
    </div>
  );
};

export default App;
