
export type textFieldTypes = "text" | "email" | "tel" | "date";
export type formKinds = "text" | "dropdown" | "radio" | "textarea" | "multi";
export type formField = TextField | DropDownField | RadioField | TextAreaField | MultiSelectField;
export interface formData {
    id: number;
    title: string;
    formfields: formField[];
}

export type Form = {
    id? : number;
    title: string;
    description? : string;
    is_public? : boolean;
    created_by? : number;
    created_date? : string;
    modified_date? : string;
}

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
    const errors : Error<Form> = {};
    if(form.title.length < 1) errors.title = "There should be a form title.";
    if(form.title.length > 100) errors.title = "The title should be less than 100 characters.";
    return errors;
} 

export type TextField = {
    kind : 'text'; 
    id : number;
    label : string;
    fieldType : textFieldTypes
    value : string
}

export type DropDownField = {
    kind : 'dropdown'; 
    id : number;
    label : string;
    options : string[]
    value : string
}

type RadioField = {
    kind : "radio";
    id: number;
    label: string;
    options : string[];
    value : string;
}

type TextAreaField = {
    kind : 'textarea'; 
    id : number;
    label : string;
    fieldType : 'textarea'
    value : string
}

type MultiSelectField = {
    kind : 'multi'; 
    id : number;
    label : string;
    options : string[];
    value : string;
}