import React, {useState} from 'react';

export const LonelinessForm = () => {

  const handleSubmit = (evt) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    evt.preventDefault();
  };


  return(<form name="clubaudaxadistance" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
<p>
  <label>Your Name: <input type="text" name="name"/></label>
</p>
<p>
  <label>Your Email: <input type="email" name="email"/></label>
</p>
<p>
  <label>Message: <textarea name="message"></textarea></label>
</p>
<p>
  <button type="submit">Send</button>
</p>
</form>)};