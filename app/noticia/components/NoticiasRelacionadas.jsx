import Link from "next/link";
import Image from "next/image";

const NoticiasRelacionadas = async (CategoriaID) => {
  const data = await fetch("https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/noticia/getByCategoryId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CategoriaID),
  });
  const noticias = await data.json();
  const noticiasRelacionadas = noticias.slice(0, 3);

  return (
    <div className='flex flex-col shadow-xl rounded-lg'>
      <div className='font-bold p-3 bg-blue-950 text-white rounded-t-lg'>
        NOTICIAS RELACIONADAS
      </div>
      <div className='flex flex-col gap-5 py-5 bg-slate-100'>
        {noticiasRelacionadas.map((noticia, key) => (
          <div key={key} className='w-full px-5 bg-slate-100'>
            <Link
              className='shadow-[inset_0_-30px_150px_rgba(0,0,0,0.5)] z-20 h-full'
              href={
                "/noticia/" + noticia.SlugCategoria + "/" + noticia.SlugNoticia
              }>
              <div
                className="relative w-full rounded  flex flex-col justify-end gap-1 px-5 py-5"
                style={{

                  height: "10.5rem",
                }}
              >
                <Image
                  src={`https://oficinabrasil.com.br/api/noticiaImages?img=${noticia.Imagem}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded "
                  alt="Notícia"
                />
                <div className='text-xs text-blue-500 mt-auto shadow-blue-300'>LANÇAMENTO</div>
                <div className='text-md text-black font-bold text-ellipsis overflow-hidden line-clamp-2 text-shadow z-10'>
                  {noticia.Titulo}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticiasRelacionadas;
