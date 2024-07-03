import Link from "next/link";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const VideosRelacionados = async () => {
  const responseVideos = await fetch(
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/video/getByClientId?page=1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ClientId: 3 }),
      next: {
        revalidate: 3600,
      },
    }
  );
  const videos = await responseVideos.json();

  const videosRelacionados = videos.data.slice(0, 6);
  // console.log(videos);

  return (
    <div className="flex flex-col gap-5">
      <div className="font-bold text-2xl">VIDEOS RELACIONADOS</div>

      <div className="grid grid-cols-12 gap-5">
        {videosRelacionados.map((video, key) => (
          <div key={key} className="col-span-6">
            <Link
              href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
              className="flex flex-col gap-2"
            >
              <div
                className="bg-cover bg-center w-full h-32 rounded-lg shadow-lg flex justify-center items-center"
                style={{
                  backgroundImage:
                    `url('https://img.youtube.com/vi/` +
                    video.Codigo +
                    `/sddefault.jpg')`,
                }}
              >
                <PlayArrowRoundedIcon
                  className="text-white shadow-lg"
                  fontSize="large"
                />
              </div>
              <div className="flex gap-3 items-center">
                {/* <img
                  className="rounded-full shadow-sm h-10"
                  src="/logo_yt.png"
                ></img> */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm line-clamp-2">{video.Titulo}</div>
                  <div className=" text-xs text-white bg-blue-950 w-fit rounded-md px-2 py-1 hover:underline hover:underline-offset-1">
                    {video.Nome}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosRelacionados;
