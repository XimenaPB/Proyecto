import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Form, routeAction$, useLocation } from "@builder.io/qwik-city";


import { apiServiceHomeEvents, createSurvey, urlFor } from "~/api/fetch-data";

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

export const useAddUser = routeAction$(async (user) => {
  try {
    console.log('Usuario recibido:', user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await createSurvey(user);
    return { success: true };


  } catch (error) {
    console.error('Error al agregar el usuario:', error);
  }
});

export default component$(() => {
  useStylesScoped$(`
        
        .containersurvey {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
        }
        
        .event-card2 {
          background-color: ;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }
        
        .event-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .event-date {
          font-size: 16px;
          color: #666;
          margin-bottom: 5px;
        }
        
        .event-description {
          font-size: 14px;
          color: #444;
        }
        #popup {
          max-height: 100vh;
                overflow-y: scroll;
      }
      
      `);

  useVisibleTask$(() => {
    const btnPopup = document.getElementById("btnPopup");
    const popup = document.getElementById("popup");

    if (btnPopup && popup) {
      btnPopup.addEventListener("click", () => {
        popup.classList.toggle("hidden");
      });
    }
    const cerrarPopupBtn = document.getElementById("cerrarPopup");

    if (cerrarPopupBtn && popup) {
      cerrarPopupBtn.addEventListener("click", () => {
        popup.classList.toggle("hidden");
      });
    }
  });

  const location = useLocation();
  const id = location.params.id;

  const useResouce = useResource$(() => apiServiceHomeEvents(id));

  const action = useAddUser();
  const ref = useSignal<HTMLFormElement>();
  useTask$(({ track }) => {
    const success = track(() => action.value?.success);
    if (success) {
      if (ref.value) {
        ref.value.reset();
      }
    }
  });
  return (

    <Resource
      value={useResouce}
      onPending={() => <p>Cargando Evento...</p>}
      onResolved={(item) => {
        // console.log(item);

        if (item[0].url == null) {
          return (
            <>
              <section class="bg-transparent">
                <div class="container mx-auto">
                  <h1 class="text-2xl font-bold mb-4">{item[0].title}</h1>
                  <p class="text-gray-600 mb-4">{item[0].details}</p>
                  <div class="grid grid-cols-2 gap-2">
                    {item[0].image.map((img: any) => (
                      // eslint-disable-next-line qwik/jsx-key
                      <div class="da relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
                        <div class="absolute inset-0 bg-center dark:bg-black"></div>
                        <div class="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                          <div class="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                            <img
                              width={600}
                              height={600}
                              src={urlFor(img).url()}
                              class="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                              alt=""
                            />
                          </div>
                          <div class="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                            <h1 class="font-serif text-2xl font-bold text-white shadow-xl">
                              {item[0].title}
                            </h1>
                            <h1 class="text-sm font-light text-gray-200 shadow-xl">
                              { }{" "}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          );
        } else {
          const youtubeUrl = item[0].url;
          const videoId = getYouTubeVideoId(youtubeUrl);
          //console.log(item[0].url);
          return (
            <section class=" rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-20">
              <div class="container mx-auto">
                <h1 class="font-bold mb-4 text-6xl items-center text-yellow-500">{item[0].title}</h1>
                {
                  action.value?.success === true && <>
                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                      Gracias por inscribirte , el formulario se ha enviado correctamente.
                    </div>
                  </>
                }
                <div class="shadow-2xl text-center mb-8 md:mb-0 md:m-10 rounded-2xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 flex flex-col relative undefined">
                  <p class="text-xl text-white mb-8 p-4 bg-transparent">
                    <span class="relative inline-block">
                      {item[0].details}
                    </span>
                  </p>
                  <div class="youtube-wrapper">
                    <iframe
                      class="youtube-frame w-full h-64 md:h-96"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                      allowFullScreen
                    />
                  </div>
                </div>



                {item[0].slug.current === "expo-carare" && (
                  <div class="flex flex-col md:flex-row p-20">
                    <div class="container mx-auto p-4">
                      <div class="shadow-xl p-4 rounded-2xl bg-white  bg-opacity-20 ">
                        <button
                          id="btnPopup"
                          class="bg-blue-500 hover:bg-lime-600 text-white py-2 px-4 rounded mt-4 mx-auto flex flex-col items-center"
                        >
                          Inscribirme a Expocarare
                        </button>

                        <div
                          id="popup"
                          class="hidden fixed inset-0  items-center justify-center bg-black bg-opacity-50"
                        >
                          <div class="containersurvey bg-white p-6 rounded shadow-md max-w-md mx-auto">
                            <h1 class="space-y-2 bg-lime-200 ">
                              FERIA AGROEMPRESARIAL EXPO CARARE
                            </h1>
                            <Form action={action}>
                              <div class="space-y-2">
                                <label
                                  for="nombreEmpresa"
                                  class="block font-medium"
                                >
                                  Nombre de la empresa:
                                </label>
                                <input
                                  type="text"
                                  id="nombreEmpresa"
                                  name="nombreEmpresa"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label class="block font-medium">
                                  Tipo de Empresa:
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="radio"
                                      name="tipoEmpresa"
                                      value="pequeña"
                                      required
                                    />{" "}
                                    Pequeña
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="tipoEmpresa"
                                      value="mediana"
                                    />{" "}
                                    Mediana
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="tipoEmpresa"
                                      value="grande"
                                    />{" "}
                                    Grande
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2">
                                <label class="block font-medium">
                                  Localización de la Empresa:
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="radio"
                                      name="localizacionEmpresa"
                                      value="urbano"
                                      required
                                    />{" "}
                                    Urbano
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="localizacionEmpresa"
                                      value="rural"
                                    />{" "}
                                    Rural
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2">
                                <label
                                  for="direccionEmpresa"
                                  class="block font-medium"
                                >
                                  Dirección de la Empresa:
                                </label>
                                <input
                                  type="text"
                                  id="direccionEmpresa"
                                  name="direccionEmpresa"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label for="barrio" class="block font-medium">
                                  Barrio:
                                </label>
                                <input
                                  type="text"
                                  id="barrio"
                                  name="barrio"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label
                                  for="nombreRepresentante"
                                  class="block font-medium"
                                >
                                  Nombre del Representante:
                                </label>
                                <input
                                  type="text"
                                  id="nombreRepresentante"
                                  name="nombreRepresentante"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label
                                  for="documentoIdentidad"
                                  class="block font-medium"
                                >
                                  Documento de identidad:
                                </label>
                                <input
                                  type="text"
                                  id="documentoIdentidad"
                                  name="documentoIdentidad"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label
                                  for="telefono"
                                  class="block font-medium"
                                >
                                  Teléfono:
                                </label>
                                <input
                                  type="tel"
                                  id="telefono"
                                  name="telefono"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label
                                  for="correoElectronico"
                                  class="block font-medium"
                                >
                                  Correo Electrónico:
                                </label>
                                <input
                                  type="email"
                                  id="correoElectronico"
                                  name="correoElectronico"
                                  required
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2">
                                <label class="block font-medium">
                                  Grado de escolaridad:
                                </label>
                                <select
                                  id="gradoEscolaridad"
                                  name="gradoEscolaridad"
                                  class="w-full border rounded p-2"
                                >
                                  <option value="Primaria">Primaria</option>
                                  <option value="Bachiller">Bachiller</option>
                                  <option value="Técnico">Técnico</option>
                                  <option value="Tecnólogo">Tecnólogo</option>
                                  <option value="Profesional">
                                    Profesional
                                  </option>
                                  <option value="Posgrado">Posgrado</option>
                                  <option value="Ninguno">Ninguno</option>
                                </select>
                              </div>
                              <div class="space-y-2 col-span-2">
                                <label
                                  for="tiempoEnMercado"
                                  class="block font-medium"
                                >
                                  Cuánto tiempo lleva en el mercado la empresa
                                  o emprendimiento:
                                </label>
                                <input
                                  type="text"
                                  id="tiempoEnMercado"
                                  name="tiempoEnMercado"
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  La Empresa está constituida como:
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="radio"
                                      name="constitucionEmpresa"
                                      value="Persona Natural"
                                    />{" "}
                                    Persona Natural
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="constitucionEmpresa"
                                      value="Organización jurídica"
                                    />{" "}
                                    Organización jurídica
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="constitucionEmpresa"
                                      value="Es informal"
                                    />{" "}
                                    Es informal
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label
                                  for="productoServicio"
                                  class="block font-medium"
                                >
                                  Cuál es el producto o servicio que ofrece:
                                </label>
                                <input
                                  type="text"
                                  id="productoServicio"
                                  name="productoServicio"
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label
                                  for="descripcionProducto"
                                  class="block font-medium"
                                >
                                  Describa su Producto o servicio:
                                </label>
                                <textarea
                                  id="descripcionProducto"
                                  name="descripcionProducto"
                                  class="w-full border rounded p-2"
                                ></textarea>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label
                                  for="nichoMercado"
                                  class="block font-medium"
                                >
                                  Cuál es el nicho de Mercado:
                                </label>
                                <input
                                  type="text"
                                  id="nichoMercado"
                                  name="nichoMercado"
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  Su producción es:
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Diario"
                                    />{" "}
                                    Diario
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Semanal"
                                    />{" "}
                                    Semanal
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Quincenal"
                                    />{" "}
                                    Quincenal
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Mensual"
                                    />{" "}
                                    Mensual
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Semestral"
                                    />{" "}
                                    Semestral
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="produccion"
                                      value="Anual"
                                    />{" "}
                                    Anual
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label
                                  for="marcaLogotipo"
                                  class="block font-medium"
                                >
                                  Tiene marca o logotipo:
                                </label>
                                <input
                                  type="text"
                                  id="marcaLogotipo"
                                  name="marcaLogotipo"
                                  class="w-full border rounded p-2"
                                />
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  Su empresa pertenece a gremios o
                                  asociaciones empresariales:
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="radio"
                                      name="perteneceGremio"
                                      value="Si"
                                    />{" "}
                                    Si
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="perteneceGremio"
                                      value="No"
                                    />{" "}
                                    No
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label
                                  for="nombreGremio"
                                  class="block font-medium"
                                >
                                  Si su respuesta es sí, a cuál y cuánto
                                  tiempo lleva vinculada:
                                </label>
                                <textarea
                                  id="nombreGremio"
                                  name="nombreGremio"
                                  class="w-full border rounded p-2"
                                ></textarea>
                              </div>
                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  ¿Mercado al que está dirigido sus productos
                                  o servicios que desarrolla su empresa?
                                  (Seleccione una o más opciones).
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mercadoDirigido[]"
                                      value="Local"
                                    />{" "}
                                    Local
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mercadoDirigido[]"
                                      value="Departamental"
                                    />{" "}
                                    Departamental
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mercadoDirigido[]"
                                      value="Nacional"
                                    />{" "}
                                    Nacional
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mercadoDirigido[]"
                                      value="Internacional"
                                    />{" "}
                                    Internacional
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  ¿Qué tipo de clientes contratan sus
                                  servicios o adquieren sus productos con
                                  mayor frecuencia? (Seleccione una o más
                                  opciones).
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="tipoClientes[]"
                                      value="Consumidor final"
                                    />{" "}
                                    Consumidor final
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="tipoClientes[]"
                                      value="Intermediarios mayoristas o minoristas"
                                    />{" "}
                                    Intermediarios mayoristas o minoristas
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="tipoClientes[]"
                                      value="Empresas Manufactureras"
                                    />{" "}
                                    Empresas Manufactureras
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="tipoClientes[]"
                                      value="Empresa de servicio"
                                    />{" "}
                                    Empresa de servicio
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="tipoClientes[]"
                                      value="Otro"
                                    />{" "}
                                    Otro
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  Los canales más frecuentes que utiliza para
                                  colocar sus productos en el mercado son:
                                  (Seleccione los que utiliza).
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Puntos de Venta"
                                    />{" "}
                                    Puntos de Venta
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Grandes superficies"
                                    />{" "}
                                    Grandes superficies
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Cadenas especializadas"
                                    />{" "}
                                    Cadenas especializadas
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Distribuidores"
                                    />{" "}
                                    Distribuidores
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Mayoristas"
                                    />{" "}
                                    Mayoristas
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Venta Directa"
                                    />{" "}
                                    Venta Directa
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="canalesColocacion[]"
                                      value="Venta por Internet"
                                    />{" "}
                                    Venta por Internet
                                  </label>
                                </div>
                              </div>

                              <div class="space-y-2 col-span-2">
                                <label class="block font-medium">
                                  Los medios de comunicación más frecuentes
                                  que utiliza para promocionar sus productos o
                                  servicios son: (Seleccione los que utiliza).
                                </label>
                                <div class="flex space-x-4">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Pagina web"
                                    />{" "}
                                    Página web
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Redes Sociales"
                                    />{" "}
                                    Redes Sociales
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Radio"
                                    />{" "}
                                    Radio
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Voz a Voz"
                                    />{" "}
                                    Voz a Voz
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Periódico/Revista"
                                    />{" "}
                                    Periódico/Revista
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Ruedas de Negocios"
                                    />{" "}
                                    Ruedas de Negocios
                                  </label>
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="mediosPromocion[]"
                                      value="Mercados Locales"
                                    />{" "}
                                    Mercados Locales
                                  </label>
                                </div>
                              </div>

                              <div class="col-span-2">
                                <button
                                  type="submit"
                                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Enviar
                                </button>
                              </div>
                            </Form>
                            <button
                              id="cerrarPopup"
                              class="mt-4 text-gray-500 hover:text-gray-700"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }
      }}
    />

  );
});
