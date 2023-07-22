import React, { useState } from "react";
import "./styles.css";

const index = React.memo(({ label, id, errorText, ...rest }) => {
  const [validationMessage, setValidationMessage] = useState("");
  const onInvalid = (e) => {
    setValidationMessage(e.target.validationMessage);
  };
  // for rechecking validation Message after onBlur => when removing the focuse of input field
  const onBlur = (e) => {
    const target = e.target;
    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };
  return (
    <div className="inputfield-container">
      <div>
        {label && (
          <div className="label">
            <label htmlFor={id}>{label}</label>
          </div>
        )}
      </div>
      <div className="input-field">
        <input id={id} onInvalid={onInvalid} onBlur={onBlur} {...rest} />
      </div>
      {validationMessage && (
        <div className="error">{errorText || validationMessage}</div>
      )}
    </div>
  );
});

export default index;
