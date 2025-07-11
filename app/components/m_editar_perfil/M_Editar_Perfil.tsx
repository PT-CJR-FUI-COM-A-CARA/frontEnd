import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaTimes, FaCamera } from 'react-icons/fa';
import { updateUser, changePassword } from '../../utils/api'; 
import { GiKey } from "react-icons/gi";

const validarSenhaSegura = (senha: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
};
const validarNome = (nome: string) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return regex.test(nome.trim());
};
const validarEmail = (email: string) => {
  const regexFormato = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexFormato.test(email.trim());
};


interface ModalEditarPerfilProps {
  usuario: any;
  onClose: () => void;
  onSave: () => void;
}

const ModalEditarPerfil: React.FC<ModalEditarPerfilProps> = ({ usuario, onClose, onSave }) => {
  const [view, setView] = useState<'profile' | 'password'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    curso: usuario?.curso || '',
    departamento: usuario?.departamento || '',
  });
  const [fotoPreview, setFotoPreview] = useState<string | null>(usuario?.fotosrc || null);

  const [passwordData, setPasswordData] = useState({
    senhaAntiga: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    setProfileData({
      nome: usuario?.nome || '',
      email: usuario?.email || '',
      curso: usuario?.curso || '',
      departamento: usuario?.departamento || '',
    });
    setFotoPreview(usuario?.fotosrc || null);
  }, [usuario]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          // NOTA: A lógica de upload do arquivo para um servidor (ex: S3) não está aqui.
          // Estamos apenas mostrando uma pré-visualização.
          // Em um app real, você faria o upload e obteria uma URL para salvar em 'fotosrc'.
          setFotoPreview(URL.createObjectURL(file));
      }
  };

  const handleSalvarPerfil = async () => {
    setError(null);
    if (!profileData.nome || !profileData.email || !profileData.curso || !profileData.departamento) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }
    if (!validarNome(profileData.nome)) {
      setError("Nome inválido. Use apenas letras e espaços.");
      return;
    }
    if (!validarEmail(profileData.email)) {
      setError("Formato de e-mail inválido.");
      return;
    }

    setIsLoading(true);
    try {
      await updateUser(usuario.id, {
        ...profileData,
        // Se você tivesse a lógica de upload, passaria a nova URL da foto aqui
        // fotosrc: novaUrlDaFoto, 
      });
      onSave(); // Atualiza os dados na página de perfil
      onClose(); // Fecha o modal
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar o perfil.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSalvarSenha = async () => {
    setError(null);
    const { senhaAntiga, novaSenha, confirmarSenha } = passwordData;

    if (!senhaAntiga || !novaSenha || !confirmarSenha) {
      setError("Todos os campos de senha devem ser preenchidos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setError("A nova senha e a confirmação não correspondem.");
      return;
    }
    if (!validarSenhaSegura(novaSenha)) {
      setError("A nova senha não é segura. Use 8+ caracteres, com maiúsculas, minúsculas, números e símbolos (@$!%*?&).");
      return;
    }

    setIsLoading(true);
    try {
        await changePassword(usuario.id, senhaAntiga, novaSenha);
        onSave();
        onClose();
    } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao alterar a senha.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FaTimes size={20} />
        </button>
        {view === 'password' && (
          <button onClick={() => { setView('profile'); setError(null); }} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
            <FaArrowLeft size={20} />
          </button>
        )}
        <div className="p-8">
          {view === 'profile' ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                    <img
                        src={fotoPreview || "/profileSemFoto/profileSemFoto.jpg"}
                        alt="Foto de perfil"
                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900 transition-colors"
                        title="Alterar foto"
                    >
                        <FaCamera />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFotoChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                
                <div className="w-full space-y-4">
                  <input type="text" name="nome" placeholder="Nome" value={profileData.nome} onChange={handleProfileChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                  <input type="email" name="email" placeholder="Email" value={profileData.email} onChange={handleProfileChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                  <input type="text" name="curso" placeholder="Curso" value={profileData.curso} onChange={handleProfileChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                  <input type="text" name="departamento" placeholder="Departamento" value={profileData.departamento} onChange={handleProfileChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
              <div className="space-y-3">
                <button onClick={() => { setView('password'); setError(null); }} className="w-full text-[#050036] font-semibold py-3 px-4 rounded-lg border-2 border-[#050036] hover:scale-103 duration-200 cursor-pointer">
                  Alterar senha
                </button>
                <button className="w-full bg-[#050036] text-white font-semibold py-3 px-4 rounded-lg border-2 hover:scale-103 duration-200 cursor-pointer" onClick={handleSalvarPerfil}>Salvar</button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="mb-4 p-4 rounded-full">
                    <GiKey size={60} className="text-[#050036]" />
                </div>
                <div className="w-full space-y-4">
                  <input type="password" name="senhaAntiga" placeholder="Senha Antiga" value={passwordData.senhaAntiga} onChange={handlePasswordChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                  <input type="password" name="novaSenha" placeholder="Nova Senha" value={passwordData.novaSenha} onChange={handlePasswordChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                  <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={passwordData.confirmarSenha} onChange={handlePasswordChange} className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#050036]" />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
              <button className="w-full bg-[#050036] text-white font-semibold py-3 px-4 rounded-lg border-2 hover:scale-103 duration-200 cursor-pointer" onClick={handleSalvarSenha}>Salvar Senha</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalEditarPerfil;