// handlers.js

export const handleSearchDocument = async (event, setValue) => {
  if (event.target.value.length >= 14) {
    const data = "cpf=" + encodeURIComponent(event.target.value);

    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getByCpf`,
        {
          cache: "no-store",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "no-Cors",
          },
        }
      );

      if (!request.ok) {
        throw new Error("Network response was not ok");
      }

      const response = await request.json();

      setValue("name", response.Nome);
      setValue("phone", response.Celular);
      setValue("born_at", response.Nascimento);
      setValue("email", response.Email);
    } catch (error) {
      setValue("name", "");
      setValue("phone", "");
      setValue("born_at", "");
      setValue("email", "");
    }
  } else {
    setValue("name", "");
    setValue("phone", "");
    setValue("born_at", "");
    setValue("email", "");
  }
};

export const handleSearchCep = async (event, setAlert) => {
  if (event.target.value.length === 9) {
    const cep = event.target.value.replace(/-/g, "");

    try {
      const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        cache: "no-store",
        method: "GET",
      });

      const response = await request.json();

      if (response.erro) {
        throw new Error("CEP não encontrado");
      }

      setAlert(null);
      console.log(response);
      return response;
    } catch (error) {
      setAlert(error.message);
    }
  } else {
    setAlert(null);
  }
};

export const handleCheckboxChange = (event, setIsChecked, setValue) => {
  setIsChecked(event.target.checked);
  setValue("check", event.target.checked);
};

export const handleCNPJVerify = async (
  event,
  setformRender,
  setautoRepairInfo
) => {
  if (event.target.value.length >= 18) {
    const data = "cnpj=" + encodeURIComponent(event.target.value);

    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getByCNPJ`,
        {
          cache: "no-store",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "no-Cors",
          },
        }
      );

      const response = await request.json();

      if (!response) {
        throw new Error();
      }

      setautoRepairInfo(response);
    } catch {
      setformRender(1);
    }
  } else {
    setformRender(0);
  }
};
