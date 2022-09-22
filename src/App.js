import {useState} from "react";

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
        {Object.keys(inputFields).map((k) => 
          <div key={k}>
            <label htmlFor={k}>{inputFields[k].label}</label>
            <input  
              id={k} 
              name={inputFields[k].name}
              type={inputFields[k].type}
              value={inputFields[k].value}
              onChange={onChange}
            /> 
          </div>
        )}
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
