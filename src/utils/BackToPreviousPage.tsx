"use client";

import { IoChevronBackOutline } from "react-icons/io5";

interface BackToPreviousPageProps {
    className?: string;
}

const BackToPreviousPage = ({
    className = "",
}: BackToPreviousPageProps) => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className={`flex items-center gap-2 text-sm font-semibold text-foreground cursor-pointer ${className} p-2 bg-secondary-color rounded-full`}
        >
            <IoChevronBackOutline className="h-4 w-4 text-primary-color" />
        </button>
    );
};

export default BackToPreviousPage;