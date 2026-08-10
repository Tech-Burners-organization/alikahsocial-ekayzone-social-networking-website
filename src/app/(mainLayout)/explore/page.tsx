import React from 'react';

const page = () => {
    return (
        <div className="flex min-h-[300vh] flex-col items-center justify-between p-24 bg-amber-700">
            <div className="h-screen bg-blue-600 w-full"></div>
            <div className="h-screen bg-red-600 w-full"></div>
            <div className="h-screen bg-yellow-600 w-full"></div>
        </div>
    );
};

export default page;