import { useState } from 'react';

// custom hook
export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    //  check if number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value of that change
      [e.target.name]: value,
    });
  }

  return { values, updateValues };
}
