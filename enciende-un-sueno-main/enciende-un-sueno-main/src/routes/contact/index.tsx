import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";

import { apiCreateMessage } from "../../api/fetch-data";




export const sendMessage = routeAction$(async (post) => {

  try {

     await apiCreateMessage(post);
    return { success: true };

  } catch (error) {
    console.error("Error al agregar los datos", error);
  }
 
});

export default component$(() => {

  const ref = useSignal<HTMLFormElement>();

  const action = sendMessage();
  useTask$(({ track }) => {
    const success = track(() => action.value?.success);
    if (success) {
      console.log('Success!!!');
      if (ref.value) {
        ref.value.reset();
      }
    }
  });

  return (
    <div class="container mx-auto mt-10">
      <div class="flex flex-col-reverse sm:flex-row">
        <div class="max-w-lg mx-auto bg-white p-5 rounded-md shadow-md w-full sm:w-1/2">
          <h1 class="text-2xl font-semibold text-gray-700 mb-5">
            Formulario de Contacto
          </h1>
          {
            action.value?.success === true && <>
              <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                Gracias por escribirnos ,  <span class="font-medium">tu mensaje ha sido enviado correctamente</span>.
              </div>
            </>
          }
          <Form action={action} ref={ref}>

            <div class="mb-4">


              <label class="block text-gray-600">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500" required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-600">Correo Electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-600">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-600">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500" required
              />
            </div>
            <div class="mt-6">
              <button

                type="submit"
                class="px-4 py-2 text-white bg-indigo-500 rounded-md hover-bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Enviar Mensaje
              </button>
            </div>
          </Form>
        </div>
        <img
          src="https://i.postimg.cc/PrcBRvnz/istockphoto-1313901506-1024x1024-1.png"
          height={300}
          width={300}
          alt="Contactanos"
          class="w-full max-h-50 rounded-md sm:w-2/3"
        />
      </div>
    </div>





  );
});
