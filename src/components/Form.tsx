import React, { useState } from 'react';

const formfields = [
    {id: 1, label: "First Name", type: "text"},
    {id: 2, label: "Last Name", type: "text"},
    {id: 3, label: "Email", type: "email"},
    {id: 4, label: "Date of Birth", type: "date"},
    {id: 5, label: "Phone Number", type: "tel"},
  ]

export default function Form(props: {closeFormCB : () => void}){
    
    const [formState, setFormState] = useState(formfields); //the initial state is the formfields
    const [fieldState, setFieldState] = useState("");

    const addFormField = () => {
        setFormState([
            ...formState,
            {
                id: Number(new Date()),
                label: fieldState,
                type: "text"

            },
        ]);
    };

    const removeFormField = (id: number) => {
        setFormState(formState.filter((field) => field.id !== id));
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
                onChange={(e) => {
                    setFieldState(e.target.value);
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" type="submit">Submit</button>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          onClick={props.closeFormCB}
          >Close Form</button>
          </div>
        );
}