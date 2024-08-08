import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './contact.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("xdknzarw");

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div className='pagecontact'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
        />
        <ValidationError
          prefix="First Name"
          field="firstName"
          errors={state.errors}
        />

        <label htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
        />
        <ValidationError
          prefix="Last Name"
          field="lastName"
          errors={state.errors}
        />

        <label htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />

        <label htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
        />
        <ValidationError
          prefix="Phone"
          field="phone"
          errors={state.errors}
        />

        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Contact Form</h1>
      <ContactForm />
    </div>
  );
}

export default App;
