import React from 'react';
import AppContainer from './AppContainer';
import Header from './Header';

const formfields = [
  {id: 1, label: "First Name", type: "text"},
  {id: 2, label: "Last Name", type: "text"},
  {id: 3, label: "Email", type: "email"},
  {id: 4, label: "Date of Birth", type: "date"},
  {id: 5, label: "Phone Number", type: "tel"},
]

function App() {
  return (
  <AppContainer>
    <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
      <Header
      title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
      />
      {formfields.map((field) => (
        <React.Fragment key={field.id}>
          <label>{field.label}</label>
          <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type={field.type}
          />
        </React.Fragment>
      ))}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" type="submit">Submit</button>
    </div>
  </AppContainer>
  );
}

export default App;
