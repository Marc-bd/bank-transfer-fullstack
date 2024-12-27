import {ButtonHTMLAttributes} from "react";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    typeButton?: 'cancel' | 'standart'
}

export default function CustomButton({ title, typeButton = 'standart',...props }: ButtonProps) {
    return (
        <button
            className={`${typeButton === "standart" ? "bg-white hover:bg-sky-700" +
                " hover:text-white text-sky-800" : "bg-red-500 hover:bg-red-800 text-white" } " font-semibold py-2 px-4 border-2" +
            " border-gray-500' +
            ' rounded shadow`}
            {...props}
        >
            {title}
        </button>
    )
}