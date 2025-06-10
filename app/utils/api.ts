import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const getAllUsers = async() => {
  const response = await api.get("/users") 

  return response.data
}

//lembrar de colocar departamento e demais coisas...
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
