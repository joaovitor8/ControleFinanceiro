// frontend/src/components/autenticar.tsx (Corrigido)
import { useAuth } from "@clerk/nextjs"; 
import axios from "axios";

export function Autenticar() {
  const { getToken } = useAuth(); 

  async function handleSave() {
    try {
      const token = await getToken(); 

      // CORREÇÃO AQUI:
      await axios.post(
        'http://127.0.0.1:3333/db/autenticar', 
        {}, // <--- 2º argumento: O "Corpo" (Body) vai vazio
        {   // <--- 3º argumento: As Configurações (Headers vão aqui)
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      
      alert("Autenticado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return <button onClick={handleSave}>Sincronizar Conta</button>
}
