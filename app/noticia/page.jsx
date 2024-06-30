import Link from "next/link";

export default async function Page() {
  // const response = await fetch("http://localhost:8000/api/noticia/getDefault");
  // var noticias = await response.json();

  // const sess = await getServerSession(authOptions)
  // if(!sess){
  //   redirect('/login')
  // } proteção de acesso server side

  return (
    <div>
      {/* {noticias.map((noticia, key) => (
        <div key={key}>
          <h1 className='font-bold'>
            <Link
              href={
                "/noticia/" + noticia.CategoriaID + "/" + noticia.NoticiaID
              }>
              {noticia.Titulo}
            </Link>
          </h1>
          <h3 className='mb-8 '>{noticia.SubTitulo}</h3> <hr />
        </div>
      ))} */}
    </div>
  );
}
