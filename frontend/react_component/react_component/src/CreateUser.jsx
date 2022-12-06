import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={onChange}
        placeholder="이름을 입력하시오"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        placeholder="이메일을 입력하시오"
      />
      <button onClick={onCreate}>추가</button>
    </div>
  );
}
export default CreateUser;
