import React from "react";

type CustomSelectProps = {
    options: Array<{ value: string; label: string }>;
    idName: string;
    errorMessage?: string;
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
};

export default function CustomSelect({
                                         options,
                                         idName,
                                         errorMessage,
                                         label,
                                         value,
                                         onChange,
                                         onBlur,
                                     }: CustomSelectProps) {
    return (
        <div className="h-24">
            <label
                htmlFor={idName}
                className="block mb-2 text-sm font-semibold text-sky-950"
            >
                {label}
            </label>
            <select
                id={idName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-sky-950 block w-full p-2.5"
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={onBlur}
            >
                <option value="" disabled>
                    Selecione uma opção
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <span className="text-red-500 text-[0.70rem] font-bold">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
