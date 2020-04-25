export interface IValidFieldProps {
    label: string;
    includeCheckMark: boolean;
    helperText: string;
    filter: (userInput: string) => string;
    parse: (userInput: string) => string;
    prettify: (parsedInput: string) => string;
    isValid: (parsedInput: string) => boolean;
}

export interface IValidatedChange {
    prettyInput: string;
    valid: boolean;
}

export interface IValidFieldEvents {
    onValidatedChange: (change: IValidatedChange) => void;
}