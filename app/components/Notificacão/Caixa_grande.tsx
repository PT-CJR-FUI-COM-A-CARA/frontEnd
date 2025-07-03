import react, {useState} from 'react';
import { NotificacaoBalao } from '../notificacao_balao/notificação_b';


export const Notificacao_G = () => {
    return(
        <div className='max-h-96 overflow-y-auto w-[360px] rounded-md p-4 bg-[#FFFFFF]'>
            <NotificacaoBalao></NotificacaoBalao>
            <NotificacaoBalao></NotificacaoBalao>
            <NotificacaoBalao></NotificacaoBalao>


        </div>

    )



}