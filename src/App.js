import {useState} from "react";
import DynInput from "./components/DynInput";

function App() {
  const [inputFields, setInputFields] = useState({
    username : {
      name : "username",
      type: "text",
      label: "User Name",
      value : "",            
    },
    useremail : {
      name : "useremail",
      type: "email",
      label : "User Email",
      value: "",
    }
  });

  const onChange = (event) => {
    setInputFields(
      {
        ...inputFields, 
        [event.target.id]: {...inputFields[event.target.id], value: event.target.value}
      }
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(inputFields);
  }

  return (
    <>
      <hr />
      <form onSubmit={onSubmit}>
        <DynInput inputFields={inputFields} onChange={onChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
