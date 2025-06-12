import React from 'react'

export default function NavBar(){

    return (
    <header>
        <nav className="h-15 bg-[#050036] text-white p-1">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button
                    aria-label="Home"
                    className="p-1 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
                    > <img src="/logo/Logomarca 3.svg" alt="Logo" className="h-12" />
                    </button>
                </div>    
                <ul className="flex space-x-4"> 
                </ul>
            </div>
        </nav>
    </header>
    );
}
