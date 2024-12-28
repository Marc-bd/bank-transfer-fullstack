type CustomTextAreaProps={
    title: string;
    data: string
    readOnly: boolean;
}

export default function CustomTextArea({title, data, readOnly=false}: CustomTextAreaProps) {
    return (
        <div>
            <h4 className={"block mb-2 text-sm font-semibold text-sky-950"}>{title}</h4>
            <textarea readOnly={readOnly} value={data}
                      className={" resize-none w-full h-20 bg-gray-50 border" +
                          " border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-sky-950 block  p-2.5"}
            >
                </textarea>
        </div>
    )
}