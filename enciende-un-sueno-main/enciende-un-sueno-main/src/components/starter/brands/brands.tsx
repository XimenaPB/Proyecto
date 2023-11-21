import {
    component$,
    useVisibleTask$,
    useSignal,
    useStylesScoped$,
  } from "@builder.io/qwik";
  
  import { urlFor } from "~/api/fetch-data";
  export default component$((posts:any ) => {
    useStylesScoped$(`
    
      
  
    `);
    const animatedDiv = useSignal(false);
  
    useVisibleTask$(() => {
      animatedDiv.value = true;
    });
    
  
    return (
      <>
        <section class="bg-transparent">
        <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-6xl font-bold text-yellow-400 mb-3">
    <slot/>Con el apoyo de:
</h1><br></br>
            
        </div>
        <div class="flex justify-center flex-wrap gap-4">
  <div class="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
    <img src={urlFor(posts.sponsors[0].image).url()} width={300} height={291} alt={posts.sponsors[0].name} class="h-14 sm:h-20 w-auto ease-linear duration-300  group-hover:scale-105"/>
  </div>
  <div class="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
    <img src={urlFor(posts.sponsors[1].image).url()} width={300} height={291} alt={posts.sponsors[1].name} class="h-14 sm:h-20 w-auto ease-linear duration-300 group-hover:scale-105"/>
  </div>
  <div class="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
    <img src={urlFor(posts.sponsors[2].image).url()} width={300} height={291} alt={posts.sponsors[2].name} class="h-14 sm:h-20 w-auto ease-linear duration-300  group-hover:scale-105"/>
  </div>
</div>

</section>




      </>
    );
  });
  