import "./App.css";
import Button from "./components/elements/Button";

function App() {
  const onClick = () => {
    console.log("test");
  };

  return (
    <>
      <Button border="black" children="로그인" className="" />
      <br />

      <div className="flex mb-2">
        <Button
          size="small"
          fontSize="small"
          onClick={onClick}
          children="로그인"
          className="mr-2 font-normal"
        />
        <Button
          size="medium"
          fontSize="medium"
          onClick={onClick}
          children="로그인"
          className="mr-2"
        />
        <Button
          size="large"
          fontSize="large"
          onClick={onClick}
          children="로그인"
        />
      </div>
    </>
  );
}

export default App;
