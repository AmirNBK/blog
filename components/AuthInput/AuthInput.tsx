import Image, { StaticImageData } from 'next/image';
import React from 'react';

const AuthInput = ({ icon, placeholder, type, onChange, value, name, borderColor }: {
    icon: StaticImageData, placeholder: string, type: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string; name: string; borderColor?: string
}) => {
    return (
        <div className='AuthInput relative w-full '>
            <input placeholder={placeholder} type={type}
                onChange={onChange}
                value={value}
                name={name}
                className={`w-8/12 py-3 pl-6 rounded-[20px] focus:outline-none text-black border border-${borderColor}`} />
        </div>
    );
};

export default AuthInput;