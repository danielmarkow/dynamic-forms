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

  const [config, setConfig] = useState({
    inputType : "text",
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
  };

  const onChangeConfig = (event) => {
    console.log(event.target.id);
    setConfig({...config, [event.target.id]: event.target.value});
  };

  const onChangeSubmit = (event) => {
    event.preventDefault();
    setInputFields({...inputFields, [config.inputName] : {
      name : config.inputName,
      type : config.inputType,
      label : config.inputLabel,
      value : "",
    }})
  };

  return (
    <>
      <form onSubmit={onChangeSubmit}>
        <h2>configure and create input field</h2>
        <div>
          <label htmlFor="inputName">name</label>
          <input id="inputName" type="text" onChange={onChangeConfig} />
        </div>
        <div>
          <label htmlFor="inputType">type</label>
          <select 
            id="inputType" 
            defaultValue={"text"} 
            onChange={onChangeConfig}
          >
            <option value="text">text</option>
            <option value="email">email</option>
          </select>
        </div>
        <div>
          <label htmlFor="inputLabel">label</label>
          <input id="inputLabel" type="text" onChange={onChangeConfig} />
        </div>
        <div>
          <button type="submit">+ input</button>
        </div>
      </form>
      <hr />
      <form onSubmit={onSubmit}>
        <DynInput inputFields={inputFields} onChange={onChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
