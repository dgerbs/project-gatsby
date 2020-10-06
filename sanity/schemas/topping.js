import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // Computer Name, singular lower-case
  name: 'topping',
  // Visible Title
  title: 'Toppings',
  type: 'document',
  icon, // field name and variable name condensed! Otherwise: icon: () => 'icon_name'
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      options: {
        layout: 'switch',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      // fields, fields.name, fields.vegetarian
      title: `${name} ${vegetarian ? '' : ''}`,
    }),
  },
};
