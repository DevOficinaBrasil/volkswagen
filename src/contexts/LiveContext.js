"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LiveContext = createContext();

export const LiveProvider = ({ children }) => {
  const [onLive, setOnLive] = useState();
  const [didOpen, setDidOpen] = useState(0);
  const [trainings, setTrainings] = useState([]);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/trainings", {
        method: "GET",
      });

      const response = await request.json();
      setTrainings(response);

      if (request.ok) {
        response.map((training, index) => {
          if (training.active == 1) {
            setOnLive(training.on_live);
            setTraining(training);
          }
        });
      } else {
        setTrainings(response);
      }
    };

    getTrainings();
  }, []);
  return (
    <LiveContext.Provider value={{ onLive, setOnLive, didOpen, setDidOpen }}>
      {children}
    </LiveContext.Provider>
  );
};

export default LiveContext;
