export type Form = {
    id? : number;
    title: string;
    description? : string;
    is_public? : boolean;
    created_by? : number;
    created_date? : string;
    modified_date? : string;
};

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
    const errors : Error<Form> = {};
    if(form.title.length < 1) errors.title = "There should be a form title.";
    if(form.title.length > 100) errors.title = "The title should be less than 100 characters.";
    return errors;
};

export type fieldKind = 'TEXT' | 'DROPDOWN' | 'RADIO' | 'GENERIC';

export type FormField = {
    id: number;
    label: string;
    kind: fieldKind;
    options? : string[];
    value? : string;
};

export const validateField = (field: FormField) => {
    const errors : Error<FormField> = {};
    if(field.label.length > 100) errors.label = "The label should be less than 100 characters.";
    if(field.label.length < 1) errors.label = "There should be a field label.";
    return errors;
}