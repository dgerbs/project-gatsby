import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer Name, singular lower-case
  name: 'storeSettings',
  // Visible Title
  title: 'Settings',
  type: 'document',
  icon, // field name and variable name condensed! Otherwise: icon: () => 'icon_name'
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      // array of ->
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices Available in the Case',
      // array of ->
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
