import { Link } from 'raviger';
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { textFieldTypes, formField, formKinds, formData, TextField } from '../types/formTypes';
import { FormActions } from '../types/formActions';

export default function Form(props: {id : number}){

    //functions
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

    const saveFormData = (formState: formData) => {
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

    //action reducer pattern
    const formReducer: (state: formData, action: FormActions) => formData = (state, action) => {
        switch(action.type){
            //Add a field to formstate
            case "add_field": 
                let newFormField : formField;
                switch(formKind){
                    case "text":
                        newFormField = {
                            kind : formKind,
                            id: Number(new Date()),
                            label: newFieldState,
                            fieldType: fieldType,
                            value: "",
                        }
                        break;
                    case "textarea":
                        newFormField = {
                            kind : formKind,
                            id: Number(new Date()),
                            label: newFieldState,
                            fieldType: "textarea",
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
                let newState: formData = {...state,
                                        formfields: [...state.formfields, 
                                            newFormField as formField]}
                setNewField("");
                setFieldOptions([]);
                return(newState);

                //Update an existing field in formstate
                case "update_field":
                    return({
                        ...state,
                        formfields: state.formfields.map((field) => field.id === action.id ? {...field, label: action.value} : field)
                    });
                
                //Updating options of a field in formstate
                case "update_options":
                    let x = action.options.split(",");
                    return({
                        ...state,
                        formfields:
                        state.formfields.map((field) => field.id === action.id ? {...field, options: x} : field)
                    });
                //Removing a field
                case "remove_field":
                    return({...state,
                    formfields: state.formfields.filter((field) => field.id !== action.id)});
                
                //Changing the title of form
                case "change_title":
                    return({...state, title: action.value});
        }
    }

    //state variables
    const [newFieldState, setNewField] = useState("");
    const [formKind, setFormKind] = useState("dropdown" as formKinds);
    const [fieldType, setFieldType] = useState("text" as textFieldTypes);
    const [fieldOptions, setFieldOptions] = useState([] as string[])
    const titleRef = useRef<HTMLInputElement>(null);
    const [formState, formDispatch] = useReducer(formReducer, getCurrentForm())

    //background operations
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
                    formDispatch({type: "change_title", value: e.target.value});
                }}
                />
            </div>
        {formState.formfields.map((field) => (
            <div className="flex" key={field.id}>
                {field.kind === 'text' || field.kind === 'textarea' ? 
                <div className="flex-1">
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type={(field as TextField).fieldType}
                value={field.label}
                onChange={(e) => {
                    formDispatch({type: "update_field", value: e.target.value, id: field.id});
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
                        formDispatch({type: "update_field", value: e.target.value, id: field.id});
                }}
                />
                <label >Options for above field:</label>
                <input
                    placeholder='Options to give: separate with comma and no spaces.'
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type="text"
                    value={field.options}
                    onChange={(e) => {
                        formDispatch({type: "update_options", options: e.target.value, id: field.id});
                }}
                />
                </div>
                }
                <div>
                    <button 
                    className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    onClick={() => formDispatch({type: "remove_field", id: field.id})}
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
                onClick={() => formDispatch({type: "add_field"})}
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