import NoticiasGrid from "../components/NoticiasGrid";
import NoticiaCategoryPagination from "../components/NoticiaCategoryPagination";

const Page = async (url) => {
  const params = url.params;

  const apiUrl =
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getByCategorySlug" +
    (url.searchParams.page?.toString()
      ? `?page=${url.searchParams.page?.toString()}`
      : "");

  const data = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ "slug-categoria": "volkswagen" }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  var result = await data.json();
  var noticias = result.data;

  return (
    < div className="container mx-auto">
      <div className="pb-10">
        <div className="font-bold text-4xl uppercase text-blue-900 text-shadow-sm mt-2">
          Notícias
        </div>
        <div className="text-xl uppercase text-blue-900">
          {noticias[0]?.Nome}
        </div>
      </div>

      <div className="bg-slate-100 rounded shadow-md shadow-slate-400 lg:px-10 px-3 pt-5 pb-3">
        <NoticiasGrid noticias={noticias} />
      </div>
      <div className="py-2">
        <NoticiaCategoryPagination totalPages={result?.last_page} />
      </div>
    </div>
  );
};

export default Page;
