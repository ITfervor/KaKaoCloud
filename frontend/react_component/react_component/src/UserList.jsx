import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  //마운트 될때, state변경될떄 모두 호출
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    console.log(user);
    //함수를 리턴하면 컴포넌트가 사라질때 호출
    return () => {
      console.log("컴포넌트가 사라짐");
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        onClick={(e) => onToggle(user.id)}
        style={{
          cursor: "pointer",
          color: user.active ? "red" : "blue",
        }}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button onClick={(e) => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
export default UserList;
