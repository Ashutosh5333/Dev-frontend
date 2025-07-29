// components/FormInput.jsx
import React from 'react';

const FormInput = ({ name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded border ${
        error ? 'border-red-500' : 'border-gray-300'
      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormInput;
