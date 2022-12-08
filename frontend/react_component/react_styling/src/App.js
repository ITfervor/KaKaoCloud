// import CSSModule from "./CSSModule";
// import styles from "./App.scss";
// import classNames from "classnames/bind";
// import "./App.css";
// import Button from "./components/Button";
import StyledComponent from "./components/StyledComponent";

import axios from "axios";

function App() {
  return (
    <div>
      <button
        onClick={(e) => {
          /* let request = new XMLHttpRequest();
          //GET 방식으로 요청
          request.open("GET", "https://jsonplaceholder.typicode.com/users");
          //POST방식일떄는 send파라미터를 대입
          request.send("");
          request.addEventListener("load", () => {
            let data = JSON.parse(request.responseText);
            //데이터를 가져오는데 성공
            console.log(data);
          });
          request.addEventListener("error", (error) => {
            //데이터 가져오는데 실패했을때 처리
            console.log(error);
          }); */
          /*  fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message)); */
          /* axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error)); */
        }}
      >
        다운로드
      </button>
    </div>
  );
}

export default App;
