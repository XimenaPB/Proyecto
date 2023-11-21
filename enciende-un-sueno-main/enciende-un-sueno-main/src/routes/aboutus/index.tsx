import {
    component$,
    useVisibleTask$,
    useSignal,
    useStylesScoped$,
  } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
  
import { urlFor } from "~/api/fetch-data"; 
import { apiServiceAboutUs } from "~/api/fetch-data";

export const aboutus = routeLoader$(async () => {
   
    const aboutus = await apiServiceAboutUs();
    return aboutus;
  

});
 
function blockContentToHtml(blockContent:any) {
  if (!blockContent || !Array.isArray(blockContent)) {
    return '';
  }

  let html = '';

  blockContent.forEach((block) => {
    if (block._type === 'block') {
      if (block.style === 'h1') {
   
        html += `<h1 class="text-white text-xl font-medium mb-2 mt-4">${processChildren(block.children)}</h1>`;
        
      } 
      if (block.style === 'h5') {
        
        html += `<h1 class="text-white text-xl font-medium mb-2 mt-4">${processChildren(block.children)}</h1>`;

        
      }
      
      else if (block.style === 'normal') {
        html += `<p>${processChildren(block.children)}</p>`;
      } else if (block.style === 'number') {
        //console.log(block.children)
        html += `<ol><li class="list-decimal ml-8">${processChildren(block.children)}</li></ol>`;
      }
    } else {
      // Otros tipos de bloques (puedes agregar más casos según sea necesario)
      html += `<p>${processChildren(block.children)}</p>`;
    }
  });

  return html;
}

function processChildren(children: any) {
  if (!children || !Array.isArray(children)) {
    return '';
  }

  let html = '';

  children.forEach((child) => {
    if (child._type === 'span') {
      html += child.text;
    } else {
      // Manejar otros tipos de elementos (por ejemplo, marcas)
      html += processChildren(child.children);
    }
  });

  return html;
}



  export default component$(() => {
    useStylesScoped$(`
    
    }
  `);
    const animatedDiv = useSignal(false);
  
    useVisibleTask$(() => {
      animatedDiv.value = true;
    });
    
    const posts = aboutus();
    
    const rawDetails = posts.value.details; // Accede a la propiedad _rawdetails en tus datos de Sanity
const htmlContent = blockContentToHtml(rawDetails); // Convierte el contenido enriquecido a HTML//
//console.log(rawDetails);
const rawMision = posts.value.mision; 
const htmlContentMision = blockContentToHtml(rawMision);
const rawVision = posts.value.vision; 
const htmlContentVision = blockContentToHtml(rawVision);
    return (
      
      <div class="container mx-auto mt-8 p-8  rounded-lg shadow-lg items-center">
        <img
      width="32"
      height="32"
      src={urlFor(posts.value.image[0]).url()} // Ruta de la imagen desde sanity
        alt="Descripción de la imagen"
        class="w-full rounded-t-lg shadow-lg"
      />
      
    
      <div class="p-4 flex flex-col lg:flex-row bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6">
       
    
        <div class="text-white font-normal text-lg text-justify " dangerouslySetInnerHTML={htmlContent }></div>
    
        <section class="mb-8 m-9">
          
          <div class="text-white font-normal text-lg italic" dangerouslySetInnerHTML={htmlContentMision }></div>
        </section>
    
        <section class="mb-8 m-9">
       
          <div class="text-white font-normal text-lg italic " dangerouslySetInnerHTML={htmlContentVision }></div>
        </section>
      </div>
    </div>
    



    

    );
  });
  




