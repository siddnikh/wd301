import { navigate } from "raviger";
import React, {useState} from "react";
import { Form, Error, validateForm } from '../types/formTypes'
import { createForm } from "../utils/apiUtils";

export default function CreateForm(){

    const newForm : Form = {
        title: "",
        description: "",
        is_public: false
    }

    const [formState, setFormState] = useState<Form>(newForm);
    const [errors, setErrors] = useState<Error<Form>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validateErrors = validateForm(formState);
        setErrors(validateErrors);
        if(Object.keys(errors).length === 0){
            
            try{
                const data = await createForm(formState);
                navigate(`/forms/${data.id}`);
            } catch(error) {
                console.log(error);
            }
        }
    };

    return(
        <div>
            <div className='flex'>
                <p className="text-lg mb-4">Create a New Form</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="m-2">
                <label>Title</label>
                {errors.title ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errors.title}</span>
                </div> : []}
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={formState.title}
                onChange={(e) => {setFormState({...formState, title: e.target.value})}}
                />
            </div>
            <div className="m-2">
                <label>Description</label>
                <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={formState.description}
                onChange={(e) => {setFormState({...formState, description: e.target.value})}}
                />
            </div>
            <div className="m-2">
                <label>Is Public?</label>
                <input
                className="ml-5"
                type="checkbox"
                name = "is_public"
                value = {formState.is_public ? "true" : "false"}
                onChange={(e) => {
                    setFormState({...formState, is_public: e.target.checked})
                }}
                />
            </div>
            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit" value="Submit"/>
            </form>
        </div>
    )
}