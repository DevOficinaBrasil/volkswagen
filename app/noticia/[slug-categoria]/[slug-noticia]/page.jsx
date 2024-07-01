import NoticiasRelacionadas from "../../components/NoticiasRelacionadas";
import "./noticia.css";
// import Script from "next/script";

// export async function generateMetadata(url) {
//   function converterParaFormatoPadrao(data) {
//     const dataObj = new Date(data);

//     if (isNaN(dataObj.getTime())) {
//       console.error("Data inválida");
//       return null;
//     }

//     const ano = dataObj.getFullYear();
//     const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
//     const dia = dataObj.getDate().toString().padStart(2, "0");
//     const horas = "23"; // Definir horas como 23
//     const minutos = "59";
//     const segundos = "59";

//     const formatoPadrao = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
//     return formatoPadrao;
//   }
//   const params = url.params;
//   const data = await fetch(
//     process.env.NEXT_PUBLIC_API_URL + "noticia/getBySlugs",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "force-cache",
//       body: JSON.stringify(params),
//     }
//   );

//   var result = await data.json();
//   if (result.status == 404) {
//     return;
//   }
//   const noticia = result.Noticia;
//   const tags = result.Tags;

//   return {
//     metadataBase: new URL("https://www.oficinabrasil.com.br"),
//     title: noticia.Titulo + " - Jornal Oficina Brasil | " + noticia.Nome,
//     description: noticia.SubTitulo,
//     keywords: tags.map((tag) => tag.Nome),
//     robots: "index, follow",
//     rating: "general",
//     //OG:SITE_NAME : ""
//     openGraph: {
//       title: noticia.Titulo + " - Jornal Oficina Brasil | " + noticia.Nome,
//       url:
//         "https://www.oficinabrasil.com.br/noticia/" +
//         params["slug-categoria"] +
//         "/" +
//         params["slug-noticia"],
//       // type: "article",
//       locale: "pt_BR",
//       site_name: "Jornal Oficina Brasil",
//       description: noticia.SubTitulo,
//       images: [
//         {
//           url: "https://www.oficinabrasil.com.br/img/noticia/" + noticia.Imagem,
//           secure_url:
//             "https://www.oficinabrasil.com.br/img/noticia/" + noticia.Imagem,

//           // 1280 x 720
//         },
//       ],
//     },
//     other: {
//       "article:tag": tags[0]?.Nome,
//       "article:published_time": converterParaFormatoPadrao(
//         noticia.DataCadastro
//       ),
//       "article:modified_time": converterParaFormatoPadrao(
//         noticia.DataAlteracao
//       ), // corrigir o tempo
//       "article:publisher": "https://www.oficinabrasil.com.br",
//       "og:type": "article",
//       "og:site_name": "Jornal Oficina Brasil",
//       "article:section": noticia.Nome,
//       "twitter:card": "summary",
//     },
//     alternates: {
//       canonical:
//         "https://www.oficinabrasil.com.br/noticia/" +
//         params["slug-categoria"] +
//         "/" +
//         params["slug-noticia"],
//       baseUrl: "https://www.oficinabrasil.com.br",
//     },
//   };
// }

export const viewport = {
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1",
};

const Noticia = async (url) => {
  const formatDate = (inputDate) => {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");
    const monthIndex = parseInt(month) - 1;
    const formattedDate = `${day} de ${months[monthIndex]} de ${year}`;

    return formattedDate;
  };

  const params = url.params;

  const data = await fetch(
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getBySlugs",
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  var result = await data.json();

  if (result.status == 404) {
    return (
      <div className="text-3xl text-center p-10">NOTICIA NÃO ENCONTRADA</div>
    );
  }
  const noticia = result.Noticia;
  // await dividirHTML(noticia.Descricao);

  return (
    <div className="mb-10 container mx-auto">
      {/* <Script
        async='async'
        src='https://www.googletagservices.com/tag/js/gpt.js'></Script>
      <Script>
        {`var googletag = googletag || {};
            googletag.cmd = googletag.cmd || []; `}
      </Script> */}
      {noticia.FullBanner ? (
        <div>
          <div
            className="bg-cover bg-center absolute z-0 w-full right-0 lg:h-[35rem] h-[15rem]"
            style={{
              backgroundImage:
                `url('https://oficinabrasil.com.br/img/noticia/` +
                noticia.FullBanner +
                `')`,
              height: "",
            }}
          ></div>
          <div className="container mx-auto relative pt-3 z-10">
            <div className="lg:mt-[400px] mt-[100px] bg-white rounded-md">
              <h1 className="lg:text-5xl text-2xl text-center font-bold mb-8 uppercase pt-3 px-2">
                {noticia.Titulo}
              </h1>
              <hr />
              <h2 className="lg:text-lg text-md text-center italic pt-3">
                {noticia.SubTitulo}
              </h2>
              <h3 className="lg:text-xl text-md text-slate-600 text-center pb-16 pt-5">
                Por: {noticia.Autor} -{" "}
                {noticia.DataPostagem ? formatDate(noticia.DataPostagem) : ""}
              </h3>
              <div className="flex justify-center py-4">
                {/* <ResponsiveSuperBanner /> */}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: noticia.Descricao }}
                className="lg:text-lg text-sm w-full  mb-10 "
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className=" pt-3 z-10 grid grid-cols-4 gap-x-20">
              <div className="col-span-4 lg:mb-5">
                <h1 className="lg:text-5xl text-2xl text-center font-bold mb-8 uppercase pt-3">
                  {noticia.Titulo}
                </h1>
                <hr />
                <h2 className="lg:text-lg text-md text-center italic pt-3">
                  {noticia.SubTitulo}
                </h2>
                <h3 className="lg:text-xl text-md text-slate-600 text-center pb-16 pt-5">
                  Por: {noticia.Autor} -{" "}
                  {noticia.DataPostagem ? formatDate(noticia.DataPostagem) : ""}
                </h3>

                <div className="flex justify-center py-5">
                  {/* <ResponsiveSuperBanner /> */}
                </div>
              </div>

              <div className="lg:col-span-3 col-span-4 ">
                <div
                  dangerouslySetInnerHTML={{ __html: noticia.Descricao }}
                  className="lg:text-lg text-sm w-full  mb-10"
                />
                {/* <div className='lg:hidden flex p-2'>
                  <SquareBanner />
                </div> */}
              </div>

              <div className="lg:col-span-1 col-span-4 flex flex-col lg:flex-col-reverse gap-y-5 justify-end">
                {/* <SquareBanner /> */}

                <NoticiasRelacionadas CategoriaID={noticia.CategoriaID} />

                {/* <DiscussoesRelacionadas CategoriaID={noticia.CategoriaID}/> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noticia;
