import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
//**!To connect to sanity to you create a folder in the root called lib(library) in that folder you must create a file called client.js*/

//**creating the sanity client - you must use the createClient function add an object containing the information of your project inside the function parameters */

export const client = createClient({
  //**to retrieve this information you must in the terminal/command line run "sanity manage" command this will open a browser window or you can do this directly from the sanity website. The projectId is found on the overview, the dataset value is the title of the dataset, the apiVersion value is the date the project was started, CDN, the token we give a name and in this case we will give it Editor value - be sure to create a .env file for security reasons with the token*/
  projectId: "3whlq268",
  dataset: "production",
  apiVersion: "2023-04-06",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

//**this helper will by default respect any crops/hotspots specified in the Sanity content provided to it- the typical use case is for this is to give it a sanity image a hight and width - example syntax <img src={urlFor(author.image).width(200).url()} /> - NOTE! url() must be final on in the order to output the image url as a string*/
const builder = new imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
