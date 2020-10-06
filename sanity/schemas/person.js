import { MdPerson as icon } from 'react-icons/md';

export default {
  // Computer Name, singular lower-case
  name: 'person',
  // Visible Title
  title: 'Slicemasters',
  type: 'document',
  icon, // field name and variable name condensed! Otherwise: icon: () => 'icon_name'
  fields: [
    {
      name: 'name',
      title: ' Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a little bit about them.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
