"use client";

import UserContext from "@/src/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function useRedirectPage() {
  const { verify, userData } = useContext(UserContext);
  const [subscribedTrainings, setSubscribedTrainingss] = useState([]);
  const [subscribedTraining, setSubscribedTraining] = useState([]);
  const [verifySubscribed, setVerifySubscribed] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getTrainings = async () => {
      const request = await fetch("/api/subscribedTrainings", {
        method: "GET",
        cache: "no-cache",
      });

      const response = await request.json();

      if (request.ok) {
        response.map((trainingData) => {
          console.log(trainingData);
          if (trainingData.active == "1") {
            setSubscribedTraining(trainingData);
            if (trainingData.on_live == 1 && trainingData.Inscrito == 1) {
              router.push("/treinamento-ao-vivo");
            } else {
              router.push("/users/sucesso");
            }
          }
        });
        setSubscribedTrainingss(response);
        setVerifySubscribed(true);
      } else {
        setSubscribedTrainingss(response);
        setVerifySubscribed(false);
      }
    };

    getTrainings();
  }, [trigger]);

  const redirectPage = () => {
    setTrigger(1);
    verify();
    // console.log(subscribedTraining);
    if (subscribedTraining.on_live == 1 && subscribedTraining.Inscrito == 1) {
      router.push("/treinamento-ao-vivo");
    } else {
      router.push("/users/sucesso");
    }
  };

  const generalRedirectPage = () => {
    verify();

    router.push("/concessionaria");
  };
  
  const redirectPresent = (id) => {
    verify();

    router.push(`/users/ficha/${id}?present=true`);
  };

  return { redirectPage, generalRedirectPage, redirectPresent };
}
