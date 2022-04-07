import React, { useState } from 'react';

interface formField {
    id: number,
    label: string,
    type: string,
    value: string
}

const initialformfields = [
    {id: 1, label: "First Name", type: "text", value: ""},
    {id: 2, label: "Last Name", type: "text", value: ""},
    {id: 3, label: "Email", type: "email", value: ""},
    {id: 4, label: "Date of Birth", type: "date", value: ""},
    {id: 5, label: "Phone Number", type: "tel", value: ""},
  ]  

export default function Form(props: {closeFormCB : () => void}){

    const initialState : () => formField[] = () => {
        const formFieldsJSON = localStorage.getItem("formFields");
        const formFieldsString = formFieldsJSON ? 
        JSON.parse(formFieldsJSON) :
        initialformfields;

        return formFieldsString;
    }

    const [formState, setFormState] = useState(initialState()); //the initial state is the formfields
    const [newFieldState, setNewField] = useState("");

    const addFormField = () => {
        setFormState([
            ...formState,
            {
                id: Number(new Date()),
                label: newFieldState,
                type: "text",
                value: "",

            },
        ]);
        setNewField("");
    };

    const updateField = (value: string, id: number) => {
        setFormState(
            formState.map((field) => {
                if(field.id === id) {
                    return {...field, value: value};
                }
                return field;
            })
        );
        console.log(formState);
    };

    const removeFormField = (id: number) => {
        setFormState(formState.filter((field) => field.id !== id));
    }
    
    const saveFormData = (currentState: formField[]) => {
        localStorage.setItem("formFields", JSON.stringify(currentState));
    }

    const clearFormData = () => {
        setFormState(
            formState.map((field) => {return {...field, value:""}})
        )
    }

    return(
        <div>
        {formState.map((field) => (
            <div className="flex">
                <div className="flex-1" key={field.id}>
                    <label>{field.label}</label>
                    <input
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type={field.type}
                    value={field.value}
                    onChange={(e) => {
                        updateField(e.target.value, field.id);
                    }}
                    />
                </div>
                <div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-9 rounded"
                    onClick={() => removeFormField(field.id)}
                    >Remove</button>
                </div>
            </div>
          ))}
          <div className='flex'>
            <div className="flex-1">
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={newFieldState}
                onChange={(e) => {
                    setNewField(e.target.value);
                }}
                />
            </div>
            <div>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded"
                onClick={() => addFormField()}
                >Add Field</button>
            </div>
            </div>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={() => saveFormData(formState)}
          >Save</button>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          onClick={props.closeFormCB}
          >Close Form</button>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          onClick={() => clearFormData()}
          >Clear Form</button>
          </div>
        );
}