"use client";

import React, { ReactNode, MouseEventHandler } from 'react';
import { listaexplos } from './data'; 
import { BiBorderRadius } from 'react-icons/bi';

interface BarraPesProps{
   
    type: 'search'
}



const BarraPes: React.FC<BarraPesProps> = ({ type}) => {
    const [search, SetSearch] =  React.useState("");

    const searchLowercase = search.toLowerCase()
    const exem = listaexplos.filter(item => item.nome.toLowerCase().includes(searchLowercase));



    
        return(

        <div  className="w-full max-w-md px-4 py-5 text-left">
        
     

        



        <input  type = "search" value={search} onChange={(e) => SetSearch(e.target.value)} 
            placeholder= 'Buscar professor(a)'
            className= "w-full border-2 border-black-600 pl-12 pr-4 py-3 rounded-xl p-4 mt-1 bg-white-10 text-black placeholder-gray-400 text -center"
            

    
        />

        <ul style={{
                listStyle: 'none',
                padding: 0,
                marginTop: '10px',
                
            }} >
        {exem.map((item)=> (
            <li key= {item.nome} style={{
                padding: '8px',
                borderBottom: '1px solid #eee'
            }}>
                 <p style={{ margin: 0, fontWeight: 'bold' }}>{item.nome}</p>
                 <p style={{ margin: 0, color: '#666' }}>{item.descriçao}</p>
            </li>
        ))}
        </ul>


        </div>
    );



}

export default BarraPes;
