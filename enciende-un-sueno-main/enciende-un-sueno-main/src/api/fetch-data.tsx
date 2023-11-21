import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
export const client = createClient({
    projectId: "q35r1s5t",
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
    token:
      "skAIiClaDN14PTdp13VGyVv2nSajcFHm6DHmxGMZKuk3EN8iIqvzBMqCehAytS5XtB2JMfbZNl27lpAEFZwo0DRDUpXw0OOu6ppXRnbAAasIORb3jowzSERtYFqkgsGKQXXtpsy8Nq2zjNXf3yQybXyRw9bm1ZcF4O83pH3PyMzFA1ElMOmr",
  });

  const builder = ImageUrlBuilder(client);


 
  export const apiServiceNewsHome = async(id?: String)=>{

 
    const endPoint = id? `*[_type == "news" && _id == "${id}"]{_id, title, description, image, date, slug.current}` : '*[_type == "news"][0..2] | order(_createdAt desc)';
    const data = await client.fetch(endPoint);

    return data;
} 
export const apiServiceNews = async(id?: String)=>{

    
    const endPoint = id? `*[_type == "news" && slug.current == "${id}"]` : '*[_type == "news" && !(_id in path("drafts.**"))] | order(_createdAt desc) ';
    const data = await client.fetch(endPoint);

    return data;
}
export const apiServiceHomeEvents = async(id?: String)=>{

    
  const endPoint = id? `*[_type == "events" && slug.current == "${id}"]` : '*[_type == "events"] ';
  const data = await client.fetch(endPoint);

  return data;
}

export const apiServiceNewsDetails = async(slug: String)=>{

    const endPoint = `*[_type == "news" && slug.current == "${slug}"]{_id, title, description, image, date, slug.current}`;
    const data = await client.fetch(endPoint);

    return data;
}

export const apiServiceAboutUs = async()=>{

  const endPoint = '*[_type == "aboutus"][0]';
  const data = await client.fetch(endPoint);

  return data;
}

export const apiServiceConfig = async()=>{

  const endPoint = '*[_type == "config"][0]';
  const data2 = await client.fetch(endPoint);
 //console.log(data2)
  return data2;
}


export async function apiCreateMessage(post: any) {


try {
  // Crear un objeto de mensaje
  const datapost = {
    _type: 'contact',
    name: post.nombre,
    mail: post.correo,
    phone: post.telefono,
    message: post.mensaje,
  };

  // Agregar filas a la hoja existente
  //await sheet.addRow(datapost);

  // Guardar el objeto en la base de datos u otro almacenamiento
  const result = await client.create({
         
    ...datapost,
  });

  return result;
} catch (error) {
  console.error('Error al crear el documento:', error);
  throw error; // Puedes relanzar el error para manejarlo en un nivel superior si es necesario
}
}
  export async function createSurvey(user: any) {
   
    const datapost = {
      _type: 'registerEvents', // Especifica el tipo de documento
    nombreEmpresa: user.nombreEmpresa,
    tipoEmpresa: user.tipoEmpresa,
    localizacionEmpresa: user.localizacionEmpresa,
    direccionEmpresa: user.direccionEmpresa,
    barrio: user.barrio,
    nombreRepresentante: user.nombreRepresentante,
    documentoIdentidad: user.documentoIdentidad,
    telefono: user.telefono,
    correoElectronico: user.correoElectronico,
    gradoEscolaridad: user.gradoEscolaridad,
    tiempoEnMercado: user.tiempoEnMercado,
    constitucionEmpresa: user.constitucionEmpresa,
    productoServicio: user.productoServicio,
    descripcionProducto: user.descripcionProducto,
    nichoMercado: user.nichoMercado,
    marcaLogotipo: user.marcaLogotipo,
    perteneceGremio: user.perteneceGremio,
    nombreGremio: user.nombreGremio,
    mercadoDirigido: user.mercadoDirigido,
    tipoClientes: user.tipoClientes,
    canalesColocacion: user.canalesColocacion,
    mediosPromocion: user.mediosPromocion,
    };
    try {
        //console.log(datapost)
        const result = await client.create({
         
          ...datapost,
        });
        return result;
      } catch (error) {
        console.error('Error al crear el documento:', error);
        throw error; // Puedes relanzar el error para manejarlo en un nivel superior si es necesario
      }
  }

  export  function urlFor(source: SanityImageSource) {
    return builder.image(source);
  }


  export async function apiServiceHome() {
   
    try {
      const endPoint = '*[_type == "banner"]';
      const data = await client.fetch(endPoint);
  
      return data;
      } catch (error) {
        console.error('Error al crear el documento:', error);
        throw error; // Puedes relanzar el error para manejarlo en un nivel superior si es necesario
      }
  }

  
  export async function apiServiceSponsor() {
   
    try {
      const endPoint = '*[_type == "sponsor"]';
      const datas = await client.fetch(endPoint);
  
      return datas;
      } catch (error) {
        console.error('Error al crear el documento:', error);
        throw error; // Puedes relanzar el error para manejarlo en un nivel superior si es necesario
      }
  }