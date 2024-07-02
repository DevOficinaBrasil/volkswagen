import Link from "next/link";

const NoticiasGrid = async ({ noticias }) => {
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

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 container">
      {noticias.map((noticia, key) => (
        <div className="flex gap-5" key={key}>
          <Link
            href={
              "/noticia/" + noticia.SlugCategoria + "/" + noticia.SlugNoticia
            }
            className="flex flex-col gap-y-1 hover:underline hover:underline-offset-1 w-1/2"
          >
            <img
              // SSLERRO01
              src={`https://www.oficinabrasil.com.br/api/noticiaImages?img=${noticia.Imagem}`}
              className="rounded shadow-lg object-cover w-full h-40"
            />
          </Link>
          <div className="flex flex-col text-ellipsis overflow-hidden gap-y-1 w-1/2">
            <Link href={"/noticia/" + noticia.SlugCategoria}>
              <div className="bg-blue-950 w-fit px-2 text-white text-sm font-bold rounded-tl-lg rounded-br-lg hover:underline hover:underline-offset-1">
                {noticia.Nome}
              </div>
            </Link>
            <Link
              href={
                "/noticia/" + noticia.SlugCategoria + "/" + noticia.SlugNoticia
              }
              className="flex flex-col gap-y-1 hover:underline hover:underline-offset-1"
            >
              <div className="leading-5 lg:text-xl text-lg font-semibold text-gray-600 text-ellipsis line-clamp-3">
                {noticia.Titulo}
              </div>
              <div className="text-xs font-semibold text-gray-400">
                {noticia.Autor} -{" "}
                {noticia.DataPostagem ? (
                  formatDate(noticia.DataPostagem)
                ) : (
                  <></>
                )}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasGrid;
