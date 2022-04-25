import { Link } from 'raviger';
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { FormField, fieldKind } from '../types/formTypes';
import { FormActions } from '../types/formActions';
import { getFormFields, createFormField, updateField, removeField } from '../utils/apiUtils';

//this file is a fuckall and will have to change everything to integrate API :')
export default function Form(props: {id : number}){ //here id is the form_pk

    const getCurrentFormFields = async () => {
        try{
            const data = await getFormFields(props.id);
            return data.results;
        } catch(error) {
            console.error(error);
        }
    };

    //action reducer pattern
    const formReducer: (state: FormField[], action: FormActions) => FormField[] = (state, action) => {
        switch(action.type){
            //Add a field to formstate
            case "add_field": 
                let newFormField : FormField = {
                    id: Number(new Date()),
                    label: newFieldState,
                    kind : formKind,
                    value: "",
                }
                switch(formKind){
                    case "DROPDOWN":
                        case "RADIO":
                            newFormField = {
                            kind : formKind,
                            id: Number(new Date()),
                            label: newFieldState,
                            options : fieldOptions,
                            value: "",
                        }
                        break;
                }
                let newState: FormField[] = [...state,
                                            newFormField];
                setNewField("");
                setFieldOptions([]);
                try{
                createFormField(props.id, newFormField);} catch(error){console.log(error);} //sends POST request
                return(newState);

                //Update an existing field in formstate
                case "update_field":
                    let field: FormField = state.filter((field) => field.id === action.id)[0];
                    field.label = action.value;
                    updateField(props.id, action.id, field);
                    return state.map((f) => field.id === action.id ? field : f);
        
                //Updating options of a field in formstate
                case "update_options":
                    let x = action.options.split(",");
                    let newField = state.filter((field) => field.id === action.id)[0];
                    newField.options = x;
                    updateField(props.id, action.id, newField);
                    return state.map((field) => field.id === action.id ? {...field, options: x} : field);
                //Removing a field
                case "remove_field":
                    removeField(props.id, action.id);
                    return state.filter((field) => field.id !== action.id);
                case "set_fields":
                    return action.value;
                default:
                    return state;
        }
    }

    //state variables
    const [newFieldState, setNewField] = useState("");
    const [formKind, setFormKind] = useState("dropdown" as fieldKind);
    const [fieldOptions, setFieldOptions] = useState([] as string[])
    const [formState, formDispatch] = useReducer(formReducer, []);
    const [update, setUpdate] = useState<any>({});

    //background operations
    useEffect(() => {
        document.title = "Form Editor";
        getCurrentFormFields().then(fields => formDispatch({type:'set_fields', value: fields}));
        return () => {document.title = "Forms";};
    }, [])


    return(
        <div>
        {formState.map((field) => (
            <div className="flex" key={field.id}>
                {field.kind === 'TEXT' ? 
                <div className="flex-1">
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type='text'
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
                {formKind !== 'TEXT' ? 
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                placeholder="Options to give: separate with comma and no spaces."
                value={fieldOptions}
                onChange={(e) => {
                    setFieldOptions(e.target.value.split(','));
                }}
                /> : null}
            </div>
            <div>
            <select 
            onChange={(e) => setFormKind(e.target.value as fieldKind)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 mt-3 rounded">
                <option value="DROPDOWN">Dropdown</option>
                <option value="RADIO">Radio</option>
                <option value="TEXT">Text</option>
            </select>
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
          onClick={() => console.log(getCurrentFormFields().then(_=>{return _;}))}
          >Save</button>
          <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" 
          href="/forms"
          >Close Form</Link>
          </div>
        );
}