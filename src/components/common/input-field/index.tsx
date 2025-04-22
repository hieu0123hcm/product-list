import { debounce } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import './input-field.css';

const DEBOUNCE_DELAY = 500;

interface InputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ onChange, placeholder, type = 'text', id, name, label }) => {
  const debouncedOnChange = useMemo(() => debounce(onChange, DEBOUNCE_DELAY), [onChange]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} name={name} onChange={handleChange} placeholder={placeholder} className="input" />
    </div>
  );
};

export default Input;
