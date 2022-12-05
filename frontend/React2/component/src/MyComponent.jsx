/* import React from "react";


//함수형 컴포넌트
import PropTypes from "prop-types";

const MyComponent = ({ name, children, year }) => {
  return (
    <>
      <div>나의 컴포넌트 이름은 {name} 입니다. </div>
      <p>{children}</p>
      <p>나는 {year}년에 태어났습니다.</p>
    </>
  );
};

MyComponent.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number.isRequired,
};

MyComponent.defaultProps = {
  name: "기본값",
};
export default MyComponent;
 */

// 클래스형 컴포넌트
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  render() {
    const { name, year, children } = this.props;

    return (
      <>
        <div>안녕하세요 제이름은 {name}입니다.</div>
        <p>children 값은 {children}입니다.</p>
        <p>제가 태어난 해는 {year}입니다. </p>
      </>
    );
  }
}

MyComponent.defaultProps = {
  name: "기본이름",
};
MyComponent.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number.isRequired,
};

export default MyComponent;
