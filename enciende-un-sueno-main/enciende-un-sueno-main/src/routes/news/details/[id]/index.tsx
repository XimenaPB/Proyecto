import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
//import { useDadJoke } from "../../../routes/layout";

import { apiServiceNews, urlFor } from "~/api/fetch-data";

function getYouTubeVideoId(url: any) {
  // Expresión regular para buscar el ID del video en una URL de YouTube
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;

  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    // Si no se encuentra un ID de video válido, puedes manejarlo según tus necesidades
    return null;
  }
}
export default component$(() => {
  const location = useLocation();
  const id = location.params.id;

  const useResouce = useResource$(() => apiServiceNews(id));
  //console.log(videoId);

  return (
    <Resource
      value={useResouce}
      onPending={() => <p>Cargando Noticia...</p>}
      onResolved={(item) => {
        console.log(item);
        if (item[0].url == null) {
          return (
            <section class="bg-transparent">
              <div class="container mx-auto">
                <h1 class="text-6xl font-bold mb-4 text-center text-white">{item[0].title}</h1>
                <p class="h-48 mt-4 text-lg justify-center text-center text-white mb-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden  shadow-lg">{item[0].details}</p>
                <div class="flex justify-center mt-4">
                  <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-3 px-5 rounded-lg bg-opacity-20  text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" target="_blank" rel="noopener" href={`https://facebook.com/sharer/sharer.php?u=https://enciende-un-sueno.pages.dev/news/details/${item[0].slug.current}&t=${item[0].title}`} aria-label="Share on Facebook" >
                    <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6">
                      <title>Facebook</title>
                      <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z">
                      </path>
                    </svg>
                    <span class="ml-2">Compartir en Facebook</span>
                  </a>
                  <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-3 px-5 rounded-lg text-white bg-opacity-20  border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700" target="_blank" rel="noopener" href={`https://api.whatsapp.com/send?text=${encodeURIComponent('¡Echa un vistazo a este artículo: https://enciende-un-sueno.pages.dev/news/details/' + item[0].slug.current + ' - ' + item[0].title)}`}
                    aria-label="Compartir en WhatsApp">
                    <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6">
                      <title>Whatsapp</title>
                      <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z">
                      </path>
                    </svg>
                    <span class="ml-2">Compartir en Whatsapp</span>
                  </a>

                </div>
                <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
                  <div class="-m-1 flex flex-wrap md:-m-2">
                    {item[0].image.map((img: any) => (
                      <div class="w-full md:w-1/2 p-1 md:p-2">
                        <img width={300} height={300}
                          alt="gallery"
                          class="block h-full w-full rounded-lg object-cover object-center"
                          src={urlFor(img).url()}
                        />
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </section>
          );
        } else {
          const youtubeUrl = item[0].url;
          const videoId = getYouTubeVideoId(youtubeUrl);
          //console.log(item[0].url);
          return (
            <section class="bg-transparent">
              <div class="container mx-auto flex flex-col items-center justify-center h-screen">
                <h1 class="text-6xl font-bold mb-4 text-center text-white">{item[0].title}</h1>
                <p class="text-lg text-center text-white mb-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden shadow-lg h-48 w-full md:w-1/2">
                  {item[0].details}
                </p>
                <div class="w-full md:w-1/2 order-1 md:order-1 rounded-lg overflow-hidden">
                  <div class="aspect-w-16 aspect-h-9">
                    <iframe
                      width="660"
                      height="415"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

          );
        }
      }}
    />
  );
});
