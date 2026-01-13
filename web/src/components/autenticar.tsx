// Arquivo: /web/components/AddTransaction.tsx
import { useAuth } from "@clerk/nextjs"; // Importa o hook do Clerk
import axios from "axios";

export function AddTransaction() {
  const { getToken } = useAuth(); // 1. Pega a função para gerar o token

  async function handleSave() {
    // 2. Gera o "Crachá" (Token JWT) atual do usuário logado
    const token = await getToken(); 

    // 3. Faz a "ligação" para o Backend
    try {
      await axios.post('http://127.0.0.1:3333/db/transactions', {
        // O corpo da mensagem (o pedido)
        title: "Salário",
        amount: 5000,
        type: "INCOME"
      }, {
        // 4. Envia o Crachá no Cabeçalho (Header) da carta
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      alert("Salvo com sucesso!");
    } catch (error) {
      console.error("O backend rejeitou ou deu erro", error);
    }
  }

  return <button onClick={handleSave}>Salvar</button>
}
