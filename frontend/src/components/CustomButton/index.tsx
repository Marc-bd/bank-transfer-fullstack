

type ButtonProps = {
    title: string;
}

export default function CustomButton({ title }: ButtonProps) {
    return (
        <button className="bg-white hover:bg-sky-700 hover:text-white text-sky-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {title}
        </button>
    )
}