import {InputHTMLAttributes} from "react";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
    idName: string;
    label: string;
    placeholder: string;
    errorMessage?: string;

}

export default function CustomInput({ idName, label, placeholder, required, errorMessage, ...props }: CustomInputProps) {
    return (
        <div className="h-24">
            <label
                htmlFor={idName}
                className="block mb-2 text-sm font-semibold text-sky-950"
            >
                {label}
            </label>
            <input
                type="text"
                id={idName}
                className="bg-gray-100 border border-gray-300 text-sky-950 text-sm font-semibold rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                {...props}
            />
            {errorMessage && (
                <span className="text-red-500 text-[0.70rem] font-bold">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}