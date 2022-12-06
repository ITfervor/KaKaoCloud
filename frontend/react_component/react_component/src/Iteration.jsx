import React, { Component } from "react";

class Iteration extends Component {
  state = {
    names: ["javascript", "고양이"],
    name: "",
  };
  //input에 입력하면 name state의 값을 변경하는 이벤트 처리함수
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  // name의 값을 names에 추가하는 함수
  //push 대신에 concat을 쓴 이유는 원본은 변경하기때문에
  handleInsert = (e) => {
    this.setState({
      names: this.state.names.concat(this.state.name),
    });
  };

  //데이터 삭제함수
  //INDEX를 매개변수로 받아서 삭제
  handleRemove = (index) => {
    let result = window.confirm("정말로삭제");
    if (result === false) {
      return;
    }
    const { names } = this.state; //중괄호하는 것은 뒤에 객체에서 중괄호를 찾아올거야
    //const names = this.state.names = 앞에 names 변경가능

    //slice : 매개변수 2개 받아서 배열들 잘라내서 복제해서 리턴하는 함수
    //매개변수는 시작위치와 마지막 위치를 대입

    /*  this.setState({
      names: [names.slice(0, index), names.slice(index + 1, names.length)],
    }); */

    //넘어온 index와 배열의 인덱스가 다른 것 만 추출
    this.setState({
      names: names.filter((item, e) => e !== index),
    });
  };
  render() {
    const nameList = this.state.names.map((data, index) => (
      <li key={index} onDoubleClick={(e) => this.handleRemove(index)}>
        {data}
        <button onClick={(e) => this.handleRemove(index)}>삭제</button>
      </li>
    ));
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.name} />
        <button onClick={this.handleInsert}>추가</button>
        <ul>{nameList}</ul>;
      </div>
    );
  }
}

export default Iteration;
