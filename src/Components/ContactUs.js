import { useState } from "react";
import Input from "./Inputs.js";

import { isPhno, isEmail, isNotEmpty } from "../util/validation.js"

export default function ContactUs() {
  

  const [enteredValues, setEnteredValues] = useState({
    name: '',
    phno: '',
    email: '',
    message: '',
  });
  const [didEdit, setDidEdit] = useState({
    name: false,
    phno: false,
    email: false,
    message: false
  });
  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email)&& 
    !isNotEmpty(enteredValues.email);
  const messageIsInvalid =
    didEdit.message && !isNotEmpty(enteredValues.message);
  const nameIsInvalid =
    didEdit.name && !isNotEmpty(enteredValues.name);
  const phnoIsInvalid =
    didEdit.phno && !isPhno(enteredValues.phno);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
    sendEmail(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: value

    }))
  }
  function handleInputBlur(identifier) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }));
  }

  const sendEmail = async (e) => {

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        ...formData
      })
    })
    // console.log(res)
  }
  let formData={
    message:enteredValues.message
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Your Details</h2>
      <Input label="name" id="name" type="name" name="name"
        onChange={(event) => handleInputChange('name', event.target.value)} value={enteredValues.name}
        onBlur={() => handleInputBlur('name')}
        error={nameIsInvalid && 'Please Enter a valid Name.'}
      />
      <Input label="Phone Number" id="phno" type="phno" name="phno"
        onChange={(event) => handleInputChange('phno', event.target.value)} value={enteredValues.phno}
        onBlur={() => handleInputBlur('phno')}
        error={phnoIsInvalid && 'Please Enter a valid Phone Number.'}
      />
      <Input label="email" id="email" type="email" name="email"
        onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email}
        onBlur={() => handleInputBlur('email')}
        error={emailIsInvalid && 'Please Enter a valid Email.'}
      />
      <div className="message">
        <Input label="message" id="message" type="message" name="message"
          onChange={(event) => handleInputChange('message', event.target.value)}
          // style="height:200px"
          value={enteredValues.message}
          error={messageIsInvalid && 'Please Enter a valid message.'}
          onBlur={() => handleInputBlur('message')}
        />
      </div>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button type='button' className="button" onClick={handleSubmit}>Submit</button>
      </p>
    </form>
  );
}
