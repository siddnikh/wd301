import { navigate } from 'raviger';
import React, { useState } from 'react';
import { formData, TextField, DropDownField } from '../types/formTypes';

export default function Preview(props: {id : number}) {

    const getForm : () => formData = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];
        const currentForm = savedForms.filter((form: formData) => form.id === props.id)[0];
        return currentForm;
    }

    const [formState, setFormState] = useState(() => getForm());
    const [inputNumber, setInputNumber] = useState(0);

    const updateField = (value: any, id: number) => {
        setFormState({
            ...formState,
            formfields: 
            formState.formfields.map((field) => {
                if(field.id === id) return {...field, value: value};
                return field;
            }),
        });
    }

    const saveFormData : () => void = () => {
        const localForms = localStorage.getItem("savedForms");
        const localFormsJSON = localForms ? JSON.parse(localForms) : {};

        const updatedForms = localFormsJSON.map((form : formData) => form.id === formState.id ? formState : form);
        localStorage.setItem("savedForms", JSON.stringify(updatedForms));
        navigate('/');
    }

    const renderFormField = () => {
        let currentFormField = formState.formfields[inputNumber]
        if(currentFormField.kind === 'text' || currentFormField.kind === 'textarea'){
            return(<div>
                <label>{formState.formfields[inputNumber].label}</label>
                <input
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type={currentFormField.fieldType}
                    value={currentFormField.value}
                    onChange={(e) => {
                        updateField(e.target.value, currentFormField.id);
                    }}
                    />
                 </div>);
        }
        return ( //radio or multi-select or dropdown
        <div></div>);
    }

    return(
        <div>
            <div className="flex justify-center items-center">
                <p className='text-center font-black text-blue-600 text-xl'>{formState.title}</p>
            </div>
            {renderFormField()}
            <div className='w-full flex justify-between'>
                <button 
                className='text-xl text-blue-600'
                onClick={() => {
                    if(inputNumber !== 0) setInputNumber(inputNumber - 1);
                }}
                >&#x2190;</button>
                {(inputNumber === formState.formfields.length - 1) ? 
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                onClick={() => saveFormData()}
                >Save</button>
                :
                <button
                className='text-xl text-blue-600'
                onClick={() => {
                    if(inputNumber !== formState.formfields.length - 1) setInputNumber(inputNumber + 1);
                }}
                >&#x2192;</button>
            }
        </div>
    </div>
    )
}