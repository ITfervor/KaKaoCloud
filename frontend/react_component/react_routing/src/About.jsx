import { useLocation } from "react-router-dom";
import qs from "qs";

const About = () => {
  //quert string을 읽을수 있는 HOOK
  const location = useLocation();
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(queryString);
  return (
    <div>
      <h1>React Router실습</h1>
      <p>Query String:{location.search}</p>
    </div>
  );
};
export default About;
