import {ReactNode} from "react";

type ModalProps = {
    children: ReactNode
}

export default function Modal(
    { children }: ModalProps
) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {children}
        </div>
    )
}