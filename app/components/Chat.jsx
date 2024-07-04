"use client";
import React, { useContext, useState, useEffect } from "react";
import UserContext from "@/src/contexts/UserContext";

function Chat() {
  const { userData } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const data = {
      Nome: userData.name,
      NomeOficina: "testeopficina",
      Mensagem: message,
    };

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Mensagem enviada com sucesso
      } else {
        console.error("Error sending message:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1); // Atualiza a key para forçar a recarga do iframe
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <iframe
        key={key}
        src="https://chatpro.oficinabrasil.com.br/chat.php"
        className="w-full h-full"
      ></iframe>
      <form onSubmit={handleSubmit} className="mt-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sua mensagem"
          className="border p-2 rounded-l mb-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r mb-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
