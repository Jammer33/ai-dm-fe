import React from 'react';
import './InputField.css';
import Typography from '../text/Typography';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';

interface Props {
  type: string;
  header?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

const InputField: React.FC<Props> = ({ type, header = '', required = false, onChange, error = false, placeholder = '', className = "", name = ""}) => {
  return (
    <div className={`input-container ${className}`}>
        <div>
            {!!header && <Typography weight="bold" color={Colors.WHITE} size={TypographySizes.MEDIUM} lineHeight={10}>{header}</Typography>}
            {required ? <span className="required"> *</span> : ''}
        </div>
        {/* input with input-field classname but error classname optional  */}
        <input name={name} placeholder={placeholder} className={`${!!error ? 'error' : ''} input-field`} type={type} onChange={onChange}/>
        {!!error && <Typography color={Colors.ERROR} alignment="center" weight="bold">{error}</Typography>}
    </div>

  );
}

export default InputField;
