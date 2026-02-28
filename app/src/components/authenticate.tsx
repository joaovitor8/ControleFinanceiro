// Arquivo responsável por sincronizar o estado de autenticação do Clerk com o backend.

"use client"

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";


export function AuthSync() {
  const { getToken, isSignedIn, userId } = useAuth();
  
  const hasSynced = useRef(false); // O useRef serve para impedir que o código rode 2x (comum no React Strict Mode)

  useEffect(() => {
    const syncUser = async () => { // Verificações de Segurança

      // Se não tá logado, se não tem ID ou se já rodou, para aqui.
      if (!isSignedIn || !userId || hasSynced.current) return;

      try {
        // Marca como rodado imediatamente
        hasSynced.current = true;

        // Pega o Token do Clerk
        const token = await getToken();

        if (!token) {
          console.log("⚠️ AuthSync: Token ainda não gerado.");
          hasSynced.current = false; // Permite tentar de novo se falhar
          return;
        }

        //Chamada para o Backend
        await axios.post(
          '/api/db/authenticate', 
          {}, // O Body vai vazio (pois os dados estão no Token)
          {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        );

        console.log("✅ Usuário sincronizado com sucesso!");

      } catch (error) {
        console.error("❌ Erro ao sincronizar usuário:", error);
      }
    };

    syncUser();
  }, [isSignedIn, getToken, userId]);

  return null; // Componente invisível
}
