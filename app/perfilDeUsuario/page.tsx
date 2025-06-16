import React from 'react';
import NavBar from '../components/navbar/NavBar'; 
import { FaBuilding, FaEnvelope, FaArrowLeft } from 'react-icons/fa'; 
import PostCard from '../components/post_card/PostCard'; // Importe o componente PostCard, ajuste o caminho se necessário

const PerfilDeUsuario = ({ isLoggedIn = false }) => {
    // Dados de exemplo para as publicações
    const posts = [
        {
            id: 1,
            userName: "Johnn Salles",
            userImage: "https://avatars.githubusercontent.com/u/169405654?v=4", // Imagem do avatar para o post
            postDate: "17/04/2024, às 21:42",
            nomeProfessor: "João Moreira",
            materia: "Viagem do Fecho",
            postContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin",
            commentCount: 2,
        },
        {
            id: 2,
            userName: "Johnn Salles",
            userImage: "https://avatars.githubusercontent.com/u/169405654?v=4", // Imagem do avatar para o post
            postDate: "15/04/2024, às 21:42",
            nomeProfessor: "John Lennon",
            materia: "Orientação à Objetos",
            postContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
            commentCount: 5,
        },
        // Adicione mais posts conforme necessário
    ];

    return (
        <>
            {/* Componente da barra de navegação */}
            <NavBar /> 

            {/* Container principal da página */}
            <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10">
                {/* Container para o conteúdo principal do perfil e publicações */}
                <div className="w-full max-w-2xl mx-auto relative"> 
                    {/* Botão de Voltar (Seta) */}
                    <button className="absolute top-16 left-[-60px] w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md cursor-pointer">
                        <FaArrowLeft className="text-gray-700 text-xl" /> 
                    </button>

                    <div className="relative">
                        {/* Seção de fundo amarelo na parte superior do card */}
                        <div className="bg-yellow-100 h-32 rounded-t-lg"></div>

                        {/* Card branco do perfil */}
                        <div className="bg-white rounded-b-lg shadow-md px-6 py-6 relative">
                            {/* Imagem do Avatar*/}
                            <img
                                src="https://avatars.githubusercontent.com/u/169405654?v=4" 
                                alt="Profile Avatar"
                                className="absolute top-0 left-6 transform -translate-y-1/2 
                                        w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                            />

                            {/* Botões de Ação no Perfil (Editar e Excluir Perfil) */}
                            {isLoggedIn && ( // Renderiza os botões apenas se isLoggedIn for true
                                <div className="absolute top-6 right-6 flex space-x-2">
                                    <button className="bg-[#222E50] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#1A253E] transition-colors duration-200">
                                        Editar Perfil
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-600 transition-colors duration-200">
                                        Excluir Perfil
                                    </button>
                                </div>
                            )}

                            {/* Este div 'pl-2' agora engloba todo o conteúdo abaixo do avatar para
                                garantir o alinhamento consistente com o Figma. */}
                            <div className="pl-2"> 
                                {/* Conteúdo de texto do perfil */}
                                <div className="pt-15"> {/* Removido 'pl-2' daqui, pois o div pai já o aplica */}
                                    {/* Nome do usuário */}
                                    <h2 className="text-2xl font-semibold text-[#222E50] mb-2">Johnn Salles</h2>
                                    
                                    {/* Detalhes do departamento */}
                                    <p className="text-[#222E50] mb-1 flex items-center text-[14px]">
                                        <FaBuilding className="mr-2 text-lg" /> 
                                        Engenharia de Software / Dept. FCTE
                                    </p>
                                    
                                    {/* Detalhes do email */}
                                    <p className="text-[#222E50] flex items-center text-[14px]">
                                        <FaEnvelope className="mr-2 text-lg" /> 
                                        sanches.johnnatands@gmail.com
                                    </p>
                                </div>

                                {/* Linha divisória: Adicionada entre as informações do perfil e as publicações */}
                                <hr className="my-6 border-[#595652]" /> {/* 'my-6' para margem vertical, 'border-gray-200' para uma linha sutil */}

                                {/* Seção de Publicações (AGORA DENTRO do card branco) */}
                                <div className="pb-2"> {/* Padding inferior para dar espaço dentro do card */}
                                    {/* Título "Publicações": Alinhado automaticamente pelo 'pl-2' do div pai */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Publicações</h3>
                                    
                                    <div className="flex flex-col gap-4"> {/* Espaçamento entre os PostCards */}
                                        {posts.map(post => (
                                            <PostCard
                                                key={post.id}
                                                userName={post.userName}
                                                userImage={post.userImage}
                                                postDate={post.postDate}
                                                nomeProfessor={post.nomeProfessor}
                                                materia={post.materia}
                                                postContent={post.postContent}
                                                commentCount={post.commentCount}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PerfilDeUsuario;