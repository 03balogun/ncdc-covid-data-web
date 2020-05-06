import React, { forwardRef } from 'react';
import Input from "@chakra-ui/core/dist/Input";

const CustomInput = ({ value, onClick, label, id }, ref) => (
    <Input id={id} placeholder={label} isReadOnly value={value} onFocus={onClick} />
);

export default forwardRef(CustomInput);
