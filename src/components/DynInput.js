function DynInput({inputFields, onChange}) {
  return (
    <>
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
    </>
  );
}

export default DynInput;