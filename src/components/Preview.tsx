import { navigate } from 'raviger';
import React, { useState } from 'react';
import { formData } from '../types/formTypes';
import { MultiSelect } from "react-multi-select-component";

export default function Preview(props: {id : number}) {

    const getForm : () => formData = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];
        const currentForm = savedForms.filter((form: formData) => form.id === props.id)[0];
        return currentForm;
    }

    const [formState] = useState(() => getForm());
    const [inputNumber, setInputNumber] = useState(0);
    const [selected, setSelected] = useState([]);
    const [answers, setAnswers] = useState<string[]>([]);

    const updateAnswer = (value: string, index : number) => {
        const newArray = answers.slice();
        newArray[index] = value;
        setAnswers(
           newArray
        );
    }


    const renderFormField = () => {
        if(formState.formfields.length === 0)
        return(<div></div>);
        let currentFormField = formState.formfields[inputNumber]
        if(currentFormField.kind === 'text' || currentFormField.kind === 'textarea'){
            return(<div>
                <label>{currentFormField.label}</label>
                <input
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type={currentFormField.fieldType}
                    value={answers[inputNumber]}
                    onChange={(e) => {
                        updateAnswer(e.target.value, inputNumber);
                    }}
                    />
                 </div>);
        }
        else if(currentFormField.kind === 'dropdown'){
        return(
            <div>
                <label>{currentFormField.label}</label>
                <select
                autoFocus
                value={answers[inputNumber]}
                onChange={(e) => {
                    updateAnswer(e.target.value, inputNumber);
                }}
                className="border-5 border-blue-600 rounded-lg p-2 m-2 w-full">
                    {React.Children.toArray(currentFormField.options.map((option) => {
                        return(<option value={option}>{option}</option>);
                    }))}
                </select>
            </div>
        );}
        else if(currentFormField.kind === 'radio'){
            return(
                <div className='flex'>
                    <label>{currentFormField.label}</label>
                    <div className="mt-10">
                        {React.Children.toArray(currentFormField.options.map((option) => {
                            return(
                                <>
                                <input
                                onChange={(e) => {
                                    updateAnswer(e.target.value, inputNumber);
                                }}
                               className="rounded-full h-4 w-4 border border-gray-300  checked:bg-blue-600 mt-1 mr-1 cursor-pointer"
                                type="radio"
                                name="radioInput" 
                                value={option}/>
                                <label className="mr-5 inline-block text-gray-800">{option}</label>
                                </>
                            );
                        }))}
                        </div>
                </div>
            )
        }
        else{
            const opts = currentFormField.options.map((option) => {return({label: option, value: option})});
            return(
                <div>
                    <MultiSelect
                        options={opts}
                        value={selected}
                        labelledBy="Select"
                        onChange={setSelected}
                    />
                </div>
            );
        }
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
                {(inputNumber === formState.formfields.length - 1 || formState.formfields.length === 0) ? 
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                onClick={() => navigate('/')}
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