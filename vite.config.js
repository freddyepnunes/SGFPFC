// Importa a função defineConfig do Vite, que é usada para configurar o projeto
import { defineConfig } from "vite";
// Importa o plugin do React para o Vite, permitindo suporte a JSX e outros recursos do React
import react from "@vitejs/plugin-react";

// Exporta a configuração do Vite como um objeto
export default defineConfig({
  // Plugins a serem usados no projeto
  plugins: [react()], // Adiciona o plugin do React

  // Configurações do servidor de desenvolvimento
  server: {
    // Configuração do proxy para redirecionar solicitações de API
    proxy: {
      "/api": {
        target: "http://localhost:5000", // URL do seu backend Node.js (onde a API está rodando)
        changeOrigin: true, // Altera a origem da solicitação para a URL de destino
        secure: false, // Permite solicitações a servidores que não têm um certificado SSL válido
      },
    },
  },
});
