import {
    component$,
    useVisibleTask$,
    useSignal,
    useStylesScoped$,
  } from "@builder.io/qwik";
  
  
  export default component$(() => {
    useStylesScoped$(`
    @property --num {
      syntax: "<integer>";
      initial-value: 0;
      inherits: false;
    }
    
    #country {
      transition: --num 5s;
      counter-set: num var(--num);
      font-size: 2.25rem/* 36px */;
      
      font-weight: 700;
      
    }
    #country::after {
      content: counter(num);
    }
    .animatedDiv {
      --num: 100;
      --tw-text-opacity: 1;
        color: rgb(59 130 246 / var(--tw-text-opacity));
    
    }
    
    
  
  `);
    const animatedDiv = useSignal(false);
  
    useVisibleTask$(() => {
      animatedDiv.value = true;
    });
  //<div class={{ animatedDiv: animatedDiv.value }}>
            
    //      </div>
    return (
      
     
      <section class="bg-transparent py-12">
      <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Alcance del Proyecto</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <div class="text-4xl font-bold text-blue-500">3000</div>
            <p class="text-gray-700 text-center mt-2">Clientes Satisfechos</p>
          </div>
          <div class="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <div class="text-4xl font-bold text-blue-500">200</div>
            <p class="text-gray-700 text-center mt-2">Horas de Trabajo</p>
          </div>
          <div class="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <div class="text-4xl font-bold text-blue-500">200</div>
            <p class="text-gray-700 text-center mt-2">Entregables</p>
          </div>
          <div  class="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <div class={{ animatedDiv: animatedDiv.value }}  id="country"></div>
            <p class="text-gray-700 text-center mt-2">Países Alcanzados</p>
          </div>
        </div>
        <p class="text-gray-600 text-center mt-8">El proyecto tiene como objetivo lograr un impacto significativo en múltiples áreas y superar las expectativas de los clientes. Nuestro equipo de profesionales está dedicado a brindar resultados excepcionales y asegurar la satisfacción de todos los involucrados.</p>
      </div>
    </section>
    
          
          
    );
  });
  