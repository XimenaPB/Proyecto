import {
    component$,
    
  } from "@builder.io/qwik";



  import { urlFor } from "~/api/fetch-data";

  interface NewsItem {
    _id: string;
    title: string;
    _updatedAt: string;
    _createdAt: string;
    _rev: string;
    _type: string;
    details: string;
  }
  
  interface NewsData {
    news: NewsItem[];
  }
 
  
  
  export default component$((post: NewsData) => {
  


 


  
    return (
      <section class="bg-transparent m-14">
  <div class="container">
    <h1 class="text-6xl font-bold mb-20 text-center text-yellow-400">Noticias y Actualidad</h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 mx-12">
      {post.news.map((item: any) => (
        <div class=" bg-white  bg-opacity-20 p-4 flex flex-col relative undefined  max-w-sm  shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition duration-300 rounded-2xl">
          <a href={`/news/details/${item.slug.current}`}>
            <div class="w-full h-48 overflow-hidden">
              <img class="object-cover w-full h-full" src={urlFor(item.image[0]).url()} alt="" width={300}
          height={300} />
            </div>
          </a>
          <div class="p-5">
            <a href={`/news/details/${item.slug.current}`}>
              <h5 class="mb-2 text-xl font-bold tracking-tight text-white">
                {item.title}
              </h5>
            </a>
            <p class="mb-3 text-white dark:text-gray-400 text-lg">
              {item.details.length > 100 ? `${item.details.slice(0, 100)}...` : item.details}
            </p>
           
          </div>
        </div>
      ))}
    </div>
    <div class="flex justify-center mt-8">
      <a href="/news" class="text-white bg-sky-700 hover:bg-violet-500 focus:outline-none focus:ring-4 focus:ring-purple-950 font-medium rounded-full text-sm px-2 py-1 py-2.5 text-center mb-2 dark:focus:ring-yellow-900 transform hover:-translate-y-1 hover:scale-105 transition duration-300">
        Ver noticias
      </a>
    </div>
  </div>
</section>


    
  
    );
  });
  