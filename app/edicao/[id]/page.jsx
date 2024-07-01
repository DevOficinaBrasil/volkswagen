import React from "react";
import MoreEditions from "../../components/MoreEditions";
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
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-10  mt-10">
        <div className="lg:col-span-10 col-span-12">
          <div className="font-semibold text-volks-blue-800 text-3xl " >{edicao.Name}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: edicao.url,
            }}
          ></div>
        </div>

        <div className="lg:col-span-2 col-span-12">
          <MoreEditions />
        </div>
      </div>

    </div>
  );
};

export default page;
