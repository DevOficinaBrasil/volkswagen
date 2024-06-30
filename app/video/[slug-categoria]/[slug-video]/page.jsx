import VideosRelacionados from "../../components/VideosRelacionados";

export default async function Page(url) {
  const params = url.params;
  const data = await fetch(
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/video/getBySlugs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  const video = await data.json();

  return (
    <div className="container mx-auto my-5">
      <div className="grid grid-cols-12 mb-10 gap-10">
        <div className="lg:col-span-8 col-span-12 flex flex-col gap-5">
          <div className="font-bold text-2xl">TV NOTÍCIAS DA OFICINA VW</div>

          {video.TipoVideo == "y" ? (
            <div className="h-[32.5rem] w-full">

              <iframe
                class="iFrameVideo"
                className="rounded-lg shadow-lg"
                width="100%"
                height="100%"
                src={
                  "//www.youtube.com/embed/" +
                  video?.Codigo +
                  // 'MK6Kx0ED_KM' +
                  "?autoplay=1;wmode=transparent"
                }
                frameborder="0"
                allowfullscreen=""
              ></iframe>
            </div>
          ) : (
            <div className="h-[32.5rem] w-full">
              {video.Descricao}
            </div>
          )}


          <div className="flex gap-3">
            {/* <img
              className="rounded-full shadow-sm h-20"
              src="/logo_yt.png"
            ></img> */}
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-4xl">{video?.Titulo}</div>
              <div className=" text-white bg-blue-950 w-fit rounded-md px-5 py-1 hover:underline hover:underline-offset-1">
                {video?.Nome}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-10">
            <VideosRelacionados CategoriaID={video.CategoriaID} />
          </div>
        </div>
      </div>
    </div>
  );
}
