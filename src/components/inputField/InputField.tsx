import React from 'react';
import './InputField.css';
import Typography from '../text/Typography';
import { Colors } from '../../colors';
import TypographySizes from '../../TypographySizes';

interface Props {
  type: string;
  header: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({ type, header, required = false, onChange }) => {
  return (
    <div className="input-container">
        <div>
            <Typography color={Colors.WHITE} size={TypographySizes.MEDIUM} lineHeight={10}>{header}</Typography>
            {required ? <span className="required"> *</span> : ''}
        </div>
        <input className="input-field" type={type} onChange={onChange}/>
    </div>

  );
}

export default InputField;
