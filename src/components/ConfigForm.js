function ConfigForm(props) {
  return <form onSubmit={props.onSubmit}>
    <h2>configure and create input field</h2>
    <div>
      <label htmlFor="inputName">name</label>
      <input
          id="inputName"
          type="text"
          onChange={props.onChange}
          value={props.config.inputName}
      />
      <p>{props.configError?.inputName}</p>
    </div>
    <div>
      <label htmlFor="inputType">type</label>
      <select
          id="inputType"
          onChange={props.onChange}
          value={props.config.inputType}
      >
        <option value="text">text</option>
        <option value="email">email</option>
      </select>
      <p>{props.configError?.inputType}</p>
    </div>
    <div>
      <label htmlFor="inputLabel">label</label>
      <input
          id="inputLabel"
          type="text"
          onChange={props.onChange}
          value={props.config.inputLabel}
      />
      <p>{props.configError?.inputLabel}</p>
    </div>
    <div>
      <button type="submit">+ input</button>
    </div>
  </form>;
};

export default ConfigForm;