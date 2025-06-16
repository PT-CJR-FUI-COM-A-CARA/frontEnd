import React from 'react';
import NavBar from '../components/navbar/NavBar'; 
import { FaBuilding, FaEnvelope, FaArrowLeft, FaBook } from 'react-icons/fa'; // Importando FaBook para o ícone de matéria
import PostCard from '../components/post_card/PostCard'; // Importe o componente PostCard, ajuste o caminho se necessário

const PerfilDeProfessor = () => { // Componente renomeado para PerfilDeProfessor
    // Dados de exemplo para as publicações (ou avaliações neste contexto)
    const posts = [
        {
            id: 1,
            userName: "Johnn Salles", // Nome do aluno que fez a avaliação
            userImage: "https://avatars.githubusercontent.com/u/169405654?v=4", // Imagem do avatar do aluno (ajuste para uma URL real do Morty)
            postDate: "15/04/2024, às 21:42",
            nomeProfessor: "João Moreira", // O professor avaliado, que é o dono do perfil
            materia: "Viagem do Fecho", // Matéria avaliada
            postContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin",
            commentCount: 5,
        },
        {
            id: 2,
            userName: "Pedro Ian", // Outro aluno
            userImage: "https://avatars.githubusercontent.com/u/161513513?v=4", // Imagem do avatar do aluno (ajuste para uma URL real do El Barto)
            postDate: "10/04/2024, às 11:12",
            nomeProfessor: "João Moreira", // O professor avaliado
            materia: "Estrutura de Avisa", // Outra matéria avaliada
            postContent: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin",
            commentCount: 3,
        },
        // Adicione mais avaliações conforme necessário
    ];

    return (
        <>
            {/* Componente da barra de navegação */}
            <NavBar /> 

            {/* Container principal da página */}
            <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10">
                {/* Container para o conteúdo principal do perfil e avaliações */}
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
                                src="https://avatars.githubusercontent.com/u/144493751?v=4" 
                                alt="Profile Avatar"
                                className="absolute top-0 left-6 transform -translate-y-1/2 
                                           w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                            />

                            {/* Este div 'pl-2' agora engloba todo o conteúdo abaixo do avatar para
                                garantir o alinhamento consistente. */}
                            <div className="pl-2"> 
                                {/* Conteúdo de texto do perfil do professor */}
                                <div className="pt-24"> {/* Ajustado para pt-24 para espaçamento consistente */}
                                    {/* Nome do Professor */}
                                    <h2 className="text-2xl font-semibold text-[#222E50] mb-2">João Moreira</h2>
                                    
                                    {/* Detalhes do departamento/curso */}
                                    <p className="text-[#222E50] mb-1 flex items-center text-[14px]">
                                        <FaBuilding className="mr-2 text-lg" /> 
                                        Dept. Lacração
                                    </p>
                                    
                                    {/* Detalhes das matérias/áreas de especialidade */}
                                    <p className="text-[#222E50] flex items-center text-[14px]">
                                        <FaBook className="mr-2 text-lg" /> {/* Ícone de livro para matérias */}
                                        Mico Computacional, Estrutura de Avisa, Viagem do Fecho
                                    </p>
                                </div>

                                {/* Linha divisória */}
                                <hr className="my-6 border-[#595652]" />

                                {/* Seção de Avaliações */}
                                <div className="pb-2"> {/* Padding inferior para dar espaço dentro do card */}
                                    {/* Título "Avaliações" */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Avaliações</h3>
                                    
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
                                                // onDeleteClick={onDeleteClick} // Removido ou ajustado se for apenas para o perfil do professor
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

export default PerfilDeProfessor;