import React, { Component } from "react";

import "./ValidationSample.css";

class ValidationSample extends Component {
  //ref(다른 DOM객체를 참조할수 있는 속성)생성
  input = React.createRef();

  //state - 클래스 안의 멤버변수나 함수 안의 지역변수와
  //state느 처리시 화면에 반영
  state = {
    password: "",
    clicked: false,
    validated: false,
  };
  //버튼 눌렀을 때 처리
  handleButtonClick = (e) => {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    });

    //input이 참조하는 객체에 focus를 설정
    //createRef 함수로 만든 경우
    // this.input.current.focus();

    this.input.focus();
  };
  //input에 입력값으 변경했을때 처리
  //자신의 name과 동일한 state를 입력한 값으로 변경
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //클래스형 컴포넌트에서 화면에 출력할 내용을 리턴하는 함수
  render() {
    return (
      <div>
        <input
          type="password"
          ref={(ref) => {
            this.input = ref;
          }}
          value={this.state.password}
          name="password"
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
