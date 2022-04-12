import { Link } from 'raviger';
import React, { useEffect, useState, useRef } from 'react';
import { textFieldTypes, formField, formKinds, formData, TextField } from '../types/formTypes';

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
    const [formKind, setFormKind] = useState("dropdown" as formKinds);
    const [fieldType, setFieldType] = useState("text" as textFieldTypes);
    const [fieldOptions, setFieldOptions] = useState([] as string[])
    const titleRef = useRef<HTMLInputElement>(null);

    const addFormField = () => {
        let newFormField : {
            kind : formKinds;
            id : number;
            label : string;
            fieldType? : textFieldTypes;
            options? : string[];
            value : string
        };

        switch(formKind){
            case "text":
                case "textarea":
                    newFormField = {
                        kind : formKind,
                        id: Number(new Date()),
                        label: newFieldState,
                        fieldType: fieldType,
                        value: "",
                    }
                    break;
            case "dropdown":
                case "radio":
                    case "multi":
                        newFormField = {
                        kind : formKind,
                        id: Number(new Date()),
                        label: newFieldState,
                        options : fieldOptions,
                        value: "",
                    }
                        break;
        }

        setFormState({
            ...formState,
            formfields: [
                ...formState.formfields,
                newFormField as formField,
            ]
        });
        setNewField("");
    };

    const updateOptions = (options : string, id : number) => { // for already existing form field: so we update formState
        let x = options.split(",");
        setFormState({
            ...formState,
            formfields: 
            formState.formfields.map((field) => {
                if(field.id === id) return {...field, options : x};
                return field;
            })
        })
    }

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
    
    const saveFormData = () => {
        const localForms = getLocalForms();
        if(localForms.length === 0){
            saveLocalForms([formState]);
            return;
        }
        const updatedLocalForms = localForms.map((form) => form.id === formState.id ? 
        formState : form
        );
        saveLocalForms(updatedLocalForms);
    }

    useEffect(() => {
        titleRef.current?.focus();
        document.title = "Form Editor";
        return () => {document.title = "Forms";};
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {saveFormData()}, 1000);
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
            <div className="flex">
                {field.kind === 'text' || field.kind === 'textarea' ? 
                <div className="flex-1" key={field.id}>
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type={(field as TextField).fieldType}
                value={field.label}
                onChange={(e) => {
                    updateField(e.target.value, field.id);
                }}
                />
                </div> 
                :
                <div className="flex-1" key={field.id}>
                    <input
                    placeholder='Label/Title/Question'
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type="text"
                    value={field.label}
                    onChange={(e) => {
                    updateField(e.target.value, field.id);
                }}
                />
                <label >Options for above field:</label>
                <input
                    placeholder='Options to give: separate with comma and no spaces.'
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type="text"
                    value={field.options}
                    onChange={(e) => {
                    updateOptions(e.target.value, field.id);
                }}
                />
                </div>
                }
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
                placeholder='Label/Title/Question'
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={newFieldState}
                onChange={(e) => {
                    setNewField(e.target.value);
                }}
                />
                {formKind !== 'text' && formKind !== 'textarea' ? 
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                placeholder="Options to give: separate with comma and no spaces."
                value={fieldOptions}
                onChange={(e) => {
                    setFieldOptions(e.target.value.split(','));
                }}
                /> : []}
            </div>
            <div>
            <select 
            onChange={(e) => setFormKind(e.target.value as formKinds)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded">
                <option value="dropdown">Dropdown</option>
                <option value="radio">Radio</option>
                <option value="multi">Multi-select</option>
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
            </select>
            {formKind === 'text' ? 
            <select 
            onChange={(e) => setFieldType(e.target.value as textFieldTypes)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded">
                <option value="text">Text</option>
                <option value="tel">Phone Number</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
            </select>
            :
            []}
            
            </div>
            <div key="100">
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded"
                onClick={() => addFormField()}
                >Add Field</button>
            </div>
            </div>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={() => saveFormData()}
          >Save</button>
          <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          href="/forms"
          >Close Form</Link>
          </div>
        );
}