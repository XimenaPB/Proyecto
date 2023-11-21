import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
/**import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'tlkyxlzu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

export const getBanner = () => {
  return new Promise((resolve, reject) => {
    const bQuery = '*[_type == "banner"]';
    client
      .fetch(bQuery)
      .then((banner) => {
        resolve({ banner });
      })
      .catch((error) => {
        reject(error);
      });
  });
};




 // const builder = imageUrlBuilder(client);

 // export const urlFor = (source) => builder.image(source);

 
 export async function fetchData() {
  try {
    const response = await fetch('https://young-moon-cd1a.tatanjer2.workers.dev/');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
    // Procesa los datos de la respuesta de la API según sea necesario
    //console.log(data);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
  }
}

fetchData();

*/
