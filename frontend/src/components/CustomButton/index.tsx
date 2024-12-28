import {ButtonHTMLAttributes} from "react";
import Spinner from "@/components/Spinner";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    typeButton?: 'cancel' | 'primary' | 'secondary';
    loading?: boolean;
}

export default function CustomButton({
                                         title,
                                         loading,
                                         typeButton = 'primary',
                                         ...props
                                     }: ButtonProps) {

    function getButtonStyle(style: string): string {
        switch (style) {
            case 'cancel':
                return "bg-red-500 hover:bg-red-800 text-white";
            case 'secondary':
                return "bg-sky-700 text-white hover:bg-sky-800";
            default:
                return "bg-white hover:bg-sky-700 hover:text-white text-sky-800"
        }
    }


    return (
        <button
            className={`${getButtonStyle(typeButton)} " w-full font-semibold py-2 px-4 border-2" +
            " border-gray-500' +
            ' rounded shadow`}
            {...props}
        >
            {loading ? (<Spinner/>) : title}
        </button>
    )
}