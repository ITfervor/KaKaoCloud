import React from "react";

import styles from "./CSSModule.module.scss";

import classNames from "classnames/bind";

//cx안에서는 styles생략하는 것이 가능
const cx = classNames.bind(styles);
const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      처음사용해보는
      <span className="something">CSS Module</span>
    </div>
  );
};

export default CSSModule;
