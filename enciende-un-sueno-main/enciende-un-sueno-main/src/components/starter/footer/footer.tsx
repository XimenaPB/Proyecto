import { component$ } from '@builder.io/qwik';


export default component$(() => {
  
  return (
    
<footer class="bg-black backdrop-filter backdrop-blur-lg bg-opacity-20  rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a class="flex items-center mb-4 sm:mb-0">
                <img width={30} height={30} src="https://cdn.sanity.io/images/q35r1s5t/production/1f794da41ab5dc937eebd190eca67a8bb9ab79e1-1941x1813.png" class="h-8 mr-3" alt="Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FundacionEnciendeunSueño</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                <li>
                    <a href="/aboutus" class="mr-4 hover:underline md:mr-6 ">Acerca de Nosotros</a>
                </li>
                <li>
                    <a href="/events" class="mr-4 hover:underline md:mr-6">Eventos</a>
                </li>
               
                <li>
                    <a href="/contact" class="hover:underline">Contactanos</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023-2024 <a href="https://ximerivasagency" class="hover:underline">XimeRivasAgency™</a>. All Rights Reserved.</span>
    </div>
</footer>


  );
});
