import MyComponent from "./MyComponent";
import StateComponent from "./StateComponent";
import EventPractice from "./EventPractice";
import ValidationSample from "./VaildationSample";

function App() {
  return (
    <>
      <MyComponent name={3}> 태그 안의 내용 </MyComponent>
      <StateComponent />
      <EventPractice />
      <ValidationSample />
    </>
    // 숫자를 넘겨줄때는 중괄호를 해주어야 한다.
  );
}

export default App;
