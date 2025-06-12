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
                    <li> 
                       <button
                    arial-label = "mais"
                    className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                    > <img src="/icones-nav/Mais_Icon.png" alt = "Mais" className = "h-8" />
                    </button>  
                          </li>

                    <li>   
                     <button
                    arial-label = "notificações"
                    className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                    > <img src="/icones-nav/Noti_Icon.png" alt = "notificações" className = "h-8" />
                    </button>

                    </li>

                    <li>   
                     <button
                    arial-label = "Icon"
                    className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                    > <img src="/icones-nav/PH_Icon.png" alt = "Icon" className = "h-8" />
                    </button>

                    </li>

                    <li>   
                          <button
                    arial-label = "Sair"
                    className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                    > <img src="/icones-nav/Saida_Icon.png" alt = "saida" className = "h-8" />
                    </button>

                    </li>
                </ul>
            </div>
        </nav>
    </header>
    );
}
