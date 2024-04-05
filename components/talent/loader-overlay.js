import React from 'react'

export default function LoaderOverlay() {
    return (

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex items-center">
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4c0-6.627-5.373-12-12-12v4zm0-4a7.963 7.963 0 013.938 1.063l-3 1.647A7.962 7.962 0 0112 4z"
                    ></path>
                </svg>
                <span className="text-white">Loading...</span>
            </div>
        </div>

    )
}
