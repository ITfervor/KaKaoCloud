import MyComponent from "./MyComponent";
import StateComponent from "./StateComponent";
import EventPractice from "./EventPractice";
import ValidationSample from "./VaildationSample";
import ScrollBox from "./ScrollBox";

function App() {
  return (
    <>
      <MyComponent name={3}> 태그 안의 내용 </MyComponent>
      <StateComponent />
      <EventPractice />
      <ValidationSample />
      <ScrollBox ref={(ref) => (this.scrollbox = ref)} />
      <button
        onClick={(e) => {
          this.scrollbox.scrollToBottom();
        }}
      >
        맨 아래로
      </button>
    </>
    // 숫자를 넘겨줄때는 중괄호를 해주어야 한다.
  );
}

export default App;
