import {
  component$,
  
} from "@builder.io/qwik";



//import { urlFor } from "~/api/fetch-data";

interface EventsItem {
  _id: string;
  title: string;
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  details: string;
  url: String;
  slug: {
    current: string;
  };
}

interface EventsData {
  events: EventsItem[];
}


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
export default component$((post: EventsData) => {



  const youtubeUrl = post.events[0].url;
  const videoId = getYouTubeVideoId(youtubeUrl);
//console.log(post.events[0]);


  return (
    
    <section class="bg-transparent">
  <div class="container mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row items-center mb-6">
      <div class="w-full md:w-1/2 order-2 md:order-2">
        
        <a href={`/events/details/${post.events[0].slug.current}`} class="text-6xl font-bold text-yellow-400 mb-3 hover:underline">
          {post.events[0].title}
        </a>
        <div class="shadow-2xl  text-center mb-8 md:mb-0 md:m-10  rounded-2xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-20  flex flex-col relative undefined">
              <p class="text-xl text-white mb-8 p-4 bg-transparent">
                <span class="relative inline-block">
                {post.events[0].details.length > 100 ? `${post.events[0].details.slice(0, 100)}...` : post.events[0].details}
                </span>
              </p>
              
              <a
                href={`/events/details/${post.events[0].slug.current}`}
                class="text-white bg-sky-700 hover:bg-violet-500 focus:outline-none focus:ring-4 focus:ring-purple-950 font-medium rounded-full text-sm px-2 py-1 py-2.5 text-center mb-2 dark:focus:ring-yellow-900 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
              >
                Leer más
              </a>
            </div>
      </div>
      <div class="w-full md:w-1/2 order-1 md:order-1 rounded-lg overflow-hidden">
        <div class="aspect-w-16 aspect-h-9">
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}?autoplay=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  </div>
</section>



  

  );
});

  