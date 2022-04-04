import React, {useState} from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import Home from './components/home'

const formfields = [
  {id: 1, label: "First Name", type: "text"},
  {id: 2, label: "Last Name", type: "text"},
  {id: 3, label: "Email", type: "email"},
  {id: 4, label: "Date of Birth", type: "date"},
  {id: 5, label: "Phone Number", type: "tel"},
]

function App() {
  
  const [state, setState] = useState<string>('HOME');

  return (
  <AppContainer>
    <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
      <Header
      title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
      />
      {state === 'HOME' ? (
        <>
      <Home/>
      <button 
      className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 m-2 rounded" 
      onClick={() => {
        setState("FORM");
      }}
      >Open Form</button>
      </> 
      ) : (
        <div>
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
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
        onClick={() => {
          setState("HOME");
        }}
        >Close Form</button>
        </div>
      )}
    </div>
  </AppContainer>
  );
}

export default App;
