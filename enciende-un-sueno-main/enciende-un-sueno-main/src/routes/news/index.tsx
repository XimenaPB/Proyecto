import {
  component$,
  useResource$,
  Resource
} from "@builder.io/qwik";
//import { useDadJoke } from "../../../routes/layout";

import { apiServiceNews,urlFor } from "../../api/fetch-data";


export default component$(() => {
  const useResouce = useResource$(() => apiServiceNews());

 



  return (
    <Resource
        value={useResouce}
        onPending={() => <div>Loading...</div>}
        onResolved={(res) => {
         
        console.log(res);
          return(            
           

<section class="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
<h1 class="text-6xl font-bold mb-8 text-center text-white">Noticias</h1><br></br>
  <div class="container mx-auto">
 
    <div class="-mx-4 flex flex-wrap">
    {res.map((item: any) => (
      <div class="w-full px-4 md:w-1/2 lg:w-1/3">
        <div class="mx-auto mb-10 max-w-[370px]">
          <div class="mb-8 overflow-hidden rounded">
            <img width={300} height={300}
              src={urlFor(item.image[0]).url()}
              alt={item.title}
              class=" w-100 h-100"
            />
          </div>
          <div>
            
            <h3>
              <a
                href={`/news/details/${item.slug.current}`}
                class="text-white hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {item.title}
              </a>
            </h3>
            <p class="text-white text-base">
            {item.details}
            </p>
          </div>
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
