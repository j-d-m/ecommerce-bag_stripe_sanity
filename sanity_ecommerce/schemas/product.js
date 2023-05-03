//**setting the schema for products within sanity management system - the schema is an object*/

//** The schema must have a name, a title and a type. the most important thing is the schema is are the fields - in this case we are using an array of objects*/

//**Schema/field Types are the attributes or schema types available to add to a form to create a document type */

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      //hotspot enables the user interface for selecting what areas of an image should always be cropped - the data is stored on the image field itself not the image asset. - the boolean makes it possible to responsively adapt images to different aspect ratios at display time. the default is false.
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    // A schema type for slugs, is typically used to create unique urls - a normalized version of title or other representative strings
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
