import {
    component$,
    useVisibleTask$,
    useSignal,
    useResource$,
    Resource,
    
  } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
  import { apiServiceHomeEvents } from "~/api/fetch-data";
  
  export default component$(() => {
    const location = useLocation();
  const id = location.params.id;

  const useResouce = useResource$(() => apiServiceHomeEvents(id));
    const animatedDiv = useSignal(false);
  
    useVisibleTask$(() => {
      animatedDiv.value = true;
    });
  
    return (
        <Resource 
        value={useResouce}
        onPending={() => <p>Cargando Evento...</p>}
        onResolved={(res) => {
          return(            
           
            <section class="bg-transparent">
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center text-white">Eventos</h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 mx-12">
      {res.map((item: any) => (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transform hover:-translate-y-1 hover:scale-105 transition duration-300">
         {/*} <a href={`/events/details/${item.slug.current}`}>
            <img class="rounded-t-lg" src="https://cdn.sanity.io/images/tlkyxlzu/production/08c9493f23408a598e87ea04c30887c224549ef5-1890x760.webp" alt="" />
      </a>*/ }
          <div class="p-5">
          <a href={`/events/details/${item.slug.current}`}>
              <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </a>
            <p class="mb-3 text-gray-700 dark:text-gray-400">
              {item.details}
            </p>
            <a href={`/events/details/${item.slug.current}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
           Leer más
              <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
    
  </div>
</section>
           
          );
        }}
        />

      
    );
  });
  