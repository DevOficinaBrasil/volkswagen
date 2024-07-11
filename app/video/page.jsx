import Link from "next/link";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import VideosPagination from "./components/VideosCategoriaPagination";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default async function Page({ searchParams }) {
  const urlSearchParams = new URLSearchParams();

  if (searchParams?.page) {
    urlSearchParams.append("page", searchParams.page);
  }
  const apiUrl =
    "https://apiob.oficinabrasil.com.br/Backend-jornalOficinaBrasil/server.php/api/video/getByClientId?page=" +
    (urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : "");


  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ClientId: 3 }),
  })

  var videos = await response.json();
  return (
    <div className="container mx-auto px-28 my-5">
      {/* <div className='flex justify-center pt-10 pb-10'>
        <ResponsiveSuperBanner />
      </div> */}
      <div className=" w-full lg:flex block justify-between mb-5">
        <div className="flex flex-col  justify-center lg:block ">
          <div className="text-indigo-900 font-bold text-4xl">VÍDEOS</div>
          <div className="font-thin text-2xl"> </div>
        </div>

        <div className="flex flex-col gap-y-3 justify-center font-semibold text-indigo-900">
          <div> Acompanhe-nos no Youtube!</div>
          <Link
            href={"https://www.youtube.com/@TVOficinaBrasil"}
            target="_blank"
            className="text-center hover:scale-105 hover:text-blue-500 rounded-lg shadow-lg text-xl py-2"
          >
            <YouTubeIcon className="text-red-500" />
            @TVOficinaBrasil
          </Link>
        </div>
      </div>
      <hr />
      <div className="gap-5 grid lg:grid-cols-4 grid-cols-2 my-10">
        {videos?.data?.map((video, key) => (
          <div key={key} className="">
            <Link
              href={"/video/" + video.SlugCategoria + "/" + video.Codigo}
              className="flex flex-col gap-2"
            >
              <div
                className="bg-cover bg-center w-full aspect-video rounded-lg shadow-lg flex justify-center items-center"
                style={{
                  backgroundImage:
                    `url('https://vumbnail.com/${video.Imagem}.jpg`,
                }}
              >
                <PlayArrowRoundedIcon
                  className="text-white shadow-lg"
                  fontSize="large"
                />
              </div>
            </Link>

            <div className="flex gap-3 items-center">

              <div className="flex flex-col gap-2">
                <div className="text-sm line-clamp-2">{video.Titulo}</div>
                <div
                  href={"/video/" + video.SlugCategoria}
                  className=" text-xs text-white bg-blue-950 w-fit rounded-md px-2 py-1 hover:underline hover:underline-offset-1"
                >
                  {video?.Nome}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <VideosPagination />
      </div>
    </div>
  );
}
