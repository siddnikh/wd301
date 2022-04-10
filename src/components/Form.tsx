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
    const titleRef = useRef<HTMLInputElement>(null);

    const addFormField = () => {
        setFormState({
            ...formState,
            formfields: [
                ...formState.formfields,
                {
                    id: Number(new Date()),
                    label: newFieldState,
                    type: "text",
                    value: "",
                },
            ]
        });
        setNewField("");
    };

    const updateField = (value: string, id: number) => {
        setFormState({
            ...formState,
            formfields: 
            formState.formfields.map((field) => {
                if(field.id === id) return {...field, value: value};
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

    const clearFormData = () => {
        setFormState({
            ...formState,
            formfields: formState.formfields.map((field) => {
                return {...field, value: ""}
            })
        });
    }

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
          <a 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          href="/forms"
          >Close Form</a>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          onClick={() => clearFormData()}
          >Clear Form</button>
          </div>
        );
}