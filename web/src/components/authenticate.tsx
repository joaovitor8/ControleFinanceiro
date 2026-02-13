"use client"

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useRef } from "react";

export function AuthSync() {
  const { getToken, isSignedIn, userId } = useAuth();
  
  // O useRef serve para impedir que o código rode 2x (comum no React Strict Mode)
  const hasSynced = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      // 1. Verificações de Segurança:
      // Se não tá logado, se não tem ID ou se já rodou, para aqui.
      if (!isSignedIn || !userId || hasSynced.current) return;

      try {
        // 2. Marca como rodado imediatamente
        hasSynced.current = true;

        // 3. Pega o Token do Clerk
        const token = await getToken();

        if (!token) {
            console.log("⚠️ AuthSync: Token ainda não gerado.");
            hasSynced.current = false; // Permite tentar de novo se falhar
            return;
        }

        // 4. Chamada para o Backend
        // ATENÇÃO: O Axios.post recebe 3 argumentos: (URL, BODY, CONFIG)
        await axios.post(
          'http://localhost:3333/db/authenticate', 
          {}, // O Body vai vazio (pois os dados estão no Token)
          {
            headers: {
              // AQUI ESTAVA O ERRO: Precisa ter a palavra "Bearer " antes
              Authorization: `Bearer ${token}` 
            }
          }
        );

        console.log("✅ AuthSync: Usuário sincronizado com sucesso!");

      } catch (error) {
        console.error("❌ AuthSync Erro:", error);
        // Se der erro de conexão, permitimos tentar de novo recarregando a página
      }
    };

    syncUser();
  }, [isSignedIn, getToken, userId]);

  return null; // Componente invisível
}
