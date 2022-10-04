import {useState} from "react";

import {object, string} from "yup";

import DynInput from "./components/DynInput";
import ConfigForm from "./components/ConfigForm";

// --- Schema of dynamic Fields ---

let dynSchemaConfig = {}
let dynSchema = object(dynSchemaConfig);

// ---

function App() {
  // inputFields data structure
  // username : {
  //   name : "username",
  //       type: "text",
  //       label: "User Name",
  //       value : "",
  // },
  // useremail : {
  //   name : "useremail",
  //       type: "email",
  //       label : "User Email",
  //       value: "",
  // }

  const [inputFields, setInputFields] = useState({});

  const configSchema = object({
    inputName: string().min(5).required(),
    inputType: string().required(),
    inputLabel: string().min(5).required(),
  });

  const configDefaultValue = {
    inputName: "",
    inputType : "text",
    inputLabel : "",
  };

  const configErrorDefaultValue = {
    inputName: "",
    inputType: "",
    inputLabel: "",
  };

  // tracks ConfigForm values and validation errors
  const [config, setConfig] = useState(configDefaultValue);
  const [configError, setConfigError] = useState(configErrorDefaultValue);
 
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

    // generate value object for easier validation of
    // dynamic form components
    let formValues = {};
    Object.entries(inputFields).forEach((entr) => formValues = {...formValues, [entr[0]]: entr[1].value});

    dynSchema.validate(formValues, {abortEarly: false}).then(() => {
      console.log("valid");
    }).catch((err) => {
      console.log(err);
    });
    console.log(JSON.stringify(formValues));
  };

  const onChangeConfig = (event) => {
    setConfig({...config, [event.target.id]: event.target.value});
  };

  const onSubmitConfig = (event) => {
    event.preventDefault();

    configSchema.validate(config, {abortEarly: false}).then(() => {
      setConfigError(configErrorDefaultValue);
      setInputFields({...inputFields, [config.inputName] : {
          name : config.inputName,
          type : config.inputType,
          label : config.inputLabel,
          value : "",
        }});

      // TODO replace example schema with actual
      dynSchemaConfig = {...dynSchemaConfig, [config.inputName]: string().min(5).required()};
      dynSchema = object(dynSchemaConfig);

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
