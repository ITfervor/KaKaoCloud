import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <ul>
      <li>
        <Link to="/articles/1">
          손으로 코딩하고 뇌로컴파일하며 눈으로 디버깅한다
        </Link>
      </li>
      <li>
        <Link to="/articles/2">
          나쁜 프로그램을 만드는걸 막아준는 프로그래밍 언어는없다
        </Link>
      </li>
    </ul>
  );
};

export default Articles;
