import {
  component$,             // Creación de componentes
  useVisibleTask$,        // Tareas relacionadas con la visibilidad
  useSignal,              // Manejo de señales o eventos
  useStylesScoped$,       // Aplicación de estilos aislados
  useResource$,           // Manejo de recursos
  Resource,               // Tipo de recurso
} from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";

import Events from "~/components/starter/donation/events";
import New from "~/components/starter/new/new";
import { routeLoader$ } from "@builder.io/qwik-city";

import {
  apiServiceNewsHome,
  urlFor,
  apiServiceHome,
  apiServiceHomeEvents,
  apiServiceConfig,
  apiServiceSponsor,
} from "../api/fetch-data";
import Sponsor from "~/components/starter/brands/brands";

// Función para cargar datos de la página de inicio
export const useHome = routeLoader$(async () => {
  const res = await apiServiceHome();
  return res[0];
});

// Función para cargar datos de configuración
export const useConf = routeLoader$(async () => {
  const resconf = await apiServiceConfig();
  return resconf;
});

// Componente principal
export default component$(() => {
  const useResouce = useResource$(() => apiServiceNewsHome());
  const useResouceEvents = useResource$(() => apiServiceHomeEvents());
  const useResouceSponsor = useResource$(() => apiServiceSponsor());
  const posts = useHome();
  const resconf = useConf();

  // Señal para manejar animaciones
  const animatedDiv = useSignal(false);

  // Tarea relacionada con la visibilidad
  useVisibleTask$(() => {
    animatedDiv.value = true;
  });

  // Aplicación de estilos aislados
  useStylesScoped$(`
    
  `);

  return (
    <>
      { /*  Se maneja la barra social  */}
      <div class="social font-sans fixed h-800vh flex flex-col justify-center text-right w-80 -translate-x-3/4 z-10 ">
        <a
          href={resconf.value.instagram} target="_blank"
          class="text-sm-20px font-semibold block m-5  py-2 text-white bg-[#500e5366] rounded-full hover:translate-x-20 duration-500 transition-transform"
        >
          {" "} Instagram<i class="instagram"></i>
        </a>
        <a
          href={resconf.value.youtube} target="_blank"
          class="text-sm-20px font-semibold block m-5  py-2 text-white bg-[#f82424bd] rounded-full hover:translate-x-20 duration-500 transition-transform"
        >
          Youtube<i class="youtube"></i>
        </a>
        <a
          href={resconf.value.facebook}  target="_blank"
          class="text-sm-20px font-semibold block m-5 py-2 text-white bg-[#24f828bd] rounded-full hover:translate-x-20 duration-500 transition-transform"
        >
          Whatsapp<i class="facebook"></i>
        </a>
      </div>

      { /*  Se maneja el banner principal de la pagina */}
      <div class="flex banner relative mt-0">
        <img alt="ImagenBanner"
          width={1920}
          height={1080}
          src={urlFor(posts.value.image[0]).url()}
        />
        <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div class="text-center">
            <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">
              {posts.value.largeText}{" "}
              <span class="text-yellow-400">{posts.value.largeText2}</span>
            </h1><br></br>
            <a
              href={posts.value.name}
              class="px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              {posts.value.buttonText}
            </a>
          </div>
        </div>
        { /*  Se maneja el banner secundario de la pagina y texto  */}
      </div>

      <div class="flex flex-col md:flex-row p-20 ">
        <div class="md:w-1/2 p-4  "> 
          <div class={{ animatedDiv: animatedDiv.value }} >
            <h1 class="text-5xl font-bold text-center mb-4">
              <span class="text-yellow-400">{posts.value.titlesection2}</span>
            </h1>
            <div class="shadow-2xl  text-center mb-8 p-15 rounded-2xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 p-4 flex flex-col relative undefined">
              <p class="text-xl text-white italic font-bold mb-8 p-4 bg-transparent">
                <span class="relative inline-block">
                  {posts.value.text1section2}
                </span>
              </p>
              <p class="text-xl text-white italic font-bold  ">
                {posts.value.text2section2}
              </p><br></br>
              <a
                href="aboutus"
                class="text-white bg-sky-700 hover:bg-violet-500 focus:outline-none focus:ring-4 focus:ring-purple-950 font-medium rounded-full text-sm px-2  py-2.5 text-center mb-2 dark:focus:ring-yellow-900 transform hover:-translate-y-1 hover:scale-105 transition duration-300"
              >
                Leer más
              </a>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 p-4">
          <img
            width="600"
            height="600"
            src={urlFor(posts.value.imageseccion).url()}
            alt="Descripción de la imagen"
            class="w-full h-auto"
          />
        </div>
      </div>
      
      <Resource
        value={useResouceEvents}
        onPending={() => <div>Loading...</div>}
        onResolved={(res) => {
          const data = {
            events: res
          };
          return(            
            <Events {...data} />
          );
        }}
      />
      <Resource
        value={useResouce}
        onPending={() => <div>Loading...</div>}
        onResolved={(res) => {
          const data = {
            news: res
          };
          return(            
            <New {...data} />
          );
        }}
      />
      <Resource
        value={useResouceSponsor}
        onPending={() => <div>Loading...</div>}
        onResolved={(res) => {
          const data = {
            sponsors: res
          };
          return(            
            <Sponsor {...data} />
          );
        }}
      />
    </>
  );
});

// Configuración del head del documento
export const head: DocumentHead = {
  title: "Fundacion Enciende un Sueño",
  meta: [
    {
      name: "description",
      content: "Fundacion para el desarrollo de medianas y grandes empresas",
    },
  ],
};
