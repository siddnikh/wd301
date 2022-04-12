import { Link } from 'raviger';
import React, { useEffect, useState, useRef } from 'react';

interface formField {
    id: number;
    label: string;
    type: string;
    value: string;
}

interface formData {
    id: number;
    title: string;
    formfields: formField[];
}

export default function Form(props: {id : number}){

    const saveLocalForms : (localForms: formData[]) => void = (localForms) => {
        localStorage.setItem("savedForms", JSON.stringify(localForms));
    }

    const getLocalForms: () => formData[] = () => {
        const savedFormsJSON = localStorage.getItem("savedForms");
        const persistentFormData = savedFormsJSON ? 
        JSON.parse(savedFormsJSON) : [];

        return persistentFormData;
    }

    const getCurrentForm : () => formData = () => {
        const localForms = getLocalForms()

        return (localForms.filter((form) => form.id === props.id)[0])
    }

    const [formState, setFormState] = useState(() => getCurrentForm()); 
    const [newFieldState, setNewField] = useState("");
    const [fieldType, setFieldType] = useState("text");
    const titleRef = useRef<HTMLInputElement>(null);

    const addFormField = () => {
        setFormState({
            ...formState,
            formfields: [
                ...formState.formfields,
                {
                    id: Number(new Date()),
                    label: newFieldState,
                    type: fieldType,
                    value: "",
                },
            ]
        });
        setNewField("");
    };

    const updateField = (label: string, id: number) => {
        setFormState({
            ...formState,
            formfields: 
            formState.formfields.map((field) => {
                if(field.id === id) return {...field, label: label};
                return field;
            }),
        });
    }


    const removeFormField = (id: number) => {
        setFormState({
            ...formState,
            formfields: formState.formfields.filter((field) => field.id !== id)
        });
    }
    
    const saveFormData = (currentState: formData) => {
        const localForms = getLocalForms();
        if(localForms.length === 0){
            saveLocalForms([currentState]);
            return;
        }
        const updatedLocalForms = localForms.map((form) => form.id === currentState.id ? 
        currentState : form
        );
        saveLocalForms(updatedLocalForms);
    }

    useEffect(() => {
        titleRef.current?.focus();
        document.title = "Form Editor";
        return () => {document.title = "Forms";};
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {saveFormData(formState)}, 1000);
        return () => {
            clearTimeout(timeout);
        }
    });

    return(
        <div>
            <div>
                <input //this is immutable without the titleRef
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={formState.title}
                ref={titleRef}
                onChange={(e) => {
                    setFormState({...formState, title: e.target.value})
                }}
                />
            </div>
        {formState.formfields.map((field) => (
            <div className="flex" key={field.id}>
                <div className="flex-1">
                    <input
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type={field.type}
                    value={field.label}
                    onChange={(e) => {
                        updateField(e.target.value, field.id);
                    }}
                    />
                </div>
                <div>
                    <button 
                    className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
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
            <select 
            onChange={(e) => setFieldType(e.target.value)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded">
                <option value="text">Text</option>
                <option value="tel">Phone Number</option>
                <option value="email">Email</option>
            </select>
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
          <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          href="/forms"
          >Close Form</Link>
          </div>
        );
}