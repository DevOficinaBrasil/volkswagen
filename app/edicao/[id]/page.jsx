import React from "react";

const page = async (url) => {
  const data = await fetch(
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/edicao/" +
      url.params.id,
    {
      cache: "no-store",
    }
  );
  var result = await data.json();
  const edicao = result;
  console.log(edicao.url);
  if (result.status == 404) {
    return (
      <div className="text-3xl text-center p-10">EDIÇÃO NÃO ENCONTRADA</div>
    );
  }

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: edicao.url,
        }}
      ></div>
    </div>
  );
};

export default page;
