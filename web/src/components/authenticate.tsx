"use client"

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useRef } from "react";

export function AuthSync() {
  const { getToken, isSignedIn, userId } = useAuth();
  
  // O useRef garante que a gente não fique chamando a API mil vezes sem querer
  const hasSynced = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      // Se não tá logado ou já sincronizou nesta sessão, para tudo.
      if (!isSignedIn || hasSynced.current) return;

      try {
        const token = await getToken();
        
        // Chama o backend silenciosamente
        await axios.post('http://localhost:3333/db/authenticate', {},
          {
            headers: { Authorization: token }
          }
        );

        console.log("✅ Usuário sincronizado com o banco de dados!");
        hasSynced.current = true; // Marca que já foi feito
      } catch (error) {
        console.error("❌ Erro ao sincronizar usuário:", error);
      }
    };

    syncUser();
  }, [isSignedIn, getToken, userId]); // Roda sempre que o status de login mudar

  return null; 
}
