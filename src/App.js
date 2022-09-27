import {useState} from "react";
import DynInput from "./components/DynInput";
import {object, string} from "yup";

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

  const configSchema = object({
    inputName: string().min(5).required(),
    inputType: string().required(),
    inputLabel: string().min(5).required(),
  })

  const configDefaultValue = {
    inputName: "",
    inputType : "text",
    inputLabel : "",
  };

  const [config, setConfig] = useState(configDefaultValue);
  const [configError, setConfigError] = useState({
    inputName: "",
    inputType: "",
    inputLabel: "",
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
    setConfig({...config, [event.target.id]: event.target.value});
  };

  const onSubmitConfig = (event) => {
    event.preventDefault();

    configSchema.validate(config, {abortEarly: false}).then(() => {
      setInputFields({...inputFields, [config.inputName] : {
          name : config.inputName,
          type : config.inputType,
          label : config.inputLabel,
          value : "",
        }});

      setConfig(configDefaultValue);
    }).catch((err) => {
      let errLength = err.inner.length;
      let newConfigErrorState = {};
      for (let i = 0; i < errLength; i++) {
        newConfigErrorState = {...newConfigErrorState, [err.inner[i].path]: err.inner[i].message};
      }
      setConfigError(newConfigErrorState);
    });
  };

  return (
    <>
      <form onSubmit={onSubmitConfig}>
        <h2>configure and create input field</h2>
        <div>
          <label htmlFor="inputName">name</label>
          <input 
            id="inputName" 
            type="text" 
            onChange={onChangeConfig} 
            value={config.inputName}
          />
          <p>{configError?.inputName}</p>
        </div>
        <div>
          <label htmlFor="inputType">type</label>
          <select 
            id="inputType" 
            onChange={onChangeConfig}
            value={config.inputType}
          >
            <option value="text">text</option>
            <option value="email">email</option>
          </select>
          <p>{configError?.inputType}</p>
        </div>
        <div>
          <label htmlFor="inputLabel">label</label>
          <input 
            id="inputLabel" 
            type="text" 
            onChange={onChangeConfig} 
            value={config.inputLabel}
          />
          <p>{configError?.inputLabel}</p>
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
