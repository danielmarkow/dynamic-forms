import {useState} from "react";

import {object, string} from "yup";

import DynInput from "./components/DynInput";
import ConfigForm from "./components/ConfigForm";

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
      <ConfigForm onSubmit={onSubmitConfig} onChange={onChangeConfig} config={config} configError={configError}/>
      <hr/>
      <form onSubmit={onSubmit}>
        <DynInput inputFields={inputFields} onChange={onChange}/>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
