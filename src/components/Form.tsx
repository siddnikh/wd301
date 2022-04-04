import React from 'react';

export default function Form(props: {closeFormCB : () => void, formFields : any[]}){
    return(
        <div>
        {props.formFields.map((field) => (
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
          onClick={props.closeFormCB}
          >Close Form</button>
          </div>
        );
}