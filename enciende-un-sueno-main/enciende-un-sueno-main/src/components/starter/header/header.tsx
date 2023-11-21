import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const Header = component$(() => {
  //console.log(dadJokeSignal.value.largeText1)

  //console.log(dadJokeValue)
  useStylesScoped$(`
 
 
 
`);
  return (
    <header class="bg-transparent">

      <nav class="shadow">
        <div class="container mx-auto px-6 py-3">
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex justify-between items-center">
              <a href="/" class="text-white text-xl font-bold hover:text-white md:text-2xl flex items-center">
                <img
                  width="100"
                  height="100"
                  src="https://cdn.sanity.io/images/q35r1s5t/production/1f794da41ab5dc937eebd190eca67a8bb9ab79e1-1941x1813.png"
                  alt="EnciendeunsueñoLogo"
                  class="logo-image"
                />
                <div class="hidden md:block ml-4"> {/*Oculto en pantallas medianas y movibles*/}
                  <div class="text-sm font-bold">Fundación</div>
                  <div class="text-2xl font-semibold">Enciende un Sueño</div>
                </div>
              </a>
            </div>

            <div class="flex justify-center items-center">
              <a
                href="/"
                class="relative block p-4 text-center text-sm text-white capitalize group"
              >
                Inicio
                <span class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 hidden group-hover:block animate-slide-in"></span>
              </a>
              <a
                href="/aboutus"
                class="relative block p-4 text-center text-sm text-white capitalize group"
              >
                Acerca de Nosotros
                <span class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 hidden group-hover:block animate-slide-in"></span>
              </a>
              <a
                href="/events"
                class="relative block p-4 text-center text-sm text-white capitalize group"
              >
                Eventos
                <span class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 hidden group-hover:block animate-slide-in"></span>
              </a>

              <a
                href="/contact"
                class="relative block p-4 text-center text-sm text-white capitalize group"
              >
                Contactanos
                <span class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 hidden group-hover:block animate-slide-in  "></span>
              </a>
            </div>


          </div>
        </div>
      </nav>
    </header>
  );
});
