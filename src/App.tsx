import React, {useState} from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import Home from './components/Home';
import Form from './components/Form';
import FormList from './components/FormList';

function App() {
  
  const [state, setState] = useState<string>('HOME');
  const [currentForm, setCurrentForm] = useState<number>(-1);
  const openList = () => {
    setState("FORM");
  }

  const closeList = () => {
    setState("HOME");
  }

  const editForm = (id: number) => {
    setState("EDIT_FORM");
    setCurrentForm(id);
  }

  return (
  <AppContainer>
    <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
      <Header
      title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
      />
      {state === 'HOME' ? (
      <Home openFormCB={openList}/>
      ) : (
        state === 'FORM' ? (<FormList closeListCB={closeList} editFormCB={editForm}/>) : 
        <Form id={currentForm} closeFormCB={openList}/>
      )}
    </div>
  </AppContainer>
  );
}

export default App;
