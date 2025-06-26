import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const getAllUsers = async() => {
  const response = await api.get("/users") 

  return response.data
}

export const getOneUser = async(id: number) => {
    const response = await api.get(`/users/${id}`)

    return response.data
} 

export const getAllProf = async() => {
    const response = await api.get("/professores")

    return response.data
}

export const getOneProf = async(id: number) => {
    const response = await api.get(`/professores/${id}`)

    return response.data
}


export const getAvaliacoesByUser = async (userId: number) => {
  const response = await api.get("/avaliacoes");
  return response.data.filter((avaliacao: any) => avaliacao.userId === userId);
};

export const getAvaliacoesByProf = async (profId: number) => {
  const response = await api.get("/avaliacoes");
  return response.data.filter((avaliacao: any) => avaliacao.profId === profId);
};

export const registerUser = async(nome:string, email:string, senha:string, curso: string, departamento: string) => {
    try{
            const response = await api.post("/users", {
            nome, 
            email,
            senha,
            curso,
            departamento,
            });
            return response.data
            
        }

    catch(error){
        if (axios.isAxiosError(error)){
            console.error(error.response?.data || error.message)
        }
    }
}

export const loginUser = async(email:string, senha:string) => {
    try{
        const response = await api.post("/login", {
            email,
            senha,
        });

        return response.data
    }

    catch(error){
        if (axios.isAxiosError(error)){
            console.error(error.response?.data || error.message)
        }
    }
}

export const deleteAvaliacao = async (id: number) => {
  try {
    const response = await api.delete(`/avaliacoes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    }
  }
};

export const updateAvaliacao = async (id: number, avaliacao: string) => {
  try {
    const response = await api.patch(`/avaliacoes/${id}`, {
      avaliacao,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    }
  }
};