import React, { useEffect, useState } from 'react';
import { NotificacaoBalao } from '../Notificacão/Notificacao_balao';
import { getAllNotificacoes } from '../../utils/api';

export const Notificacao_G = () => {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const data = await getAllNotificacoes();
        setNotificacoes(data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  return (
    <div className="max-h-96 overflow-y-auto w-[360px] rounded-md p-4 bg-[#FFFFFF]">
      {loading && <p className="text-gray-500">Carregando...</p>}

      {!loading && notificacoes.length === 0 && (
        <p className="text-gray-500">Nenhuma notificação encontrada.</p>
      )}

      {notificacoes.map((notificacao) => (
        <NotificacaoBalao
          key={notificacao.id}
          texto={notificacao.texto}
          tipo={notificacao.tipo}
          link={notificacao.link}
        />
      ))}
    </div>
  );
};