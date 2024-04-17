import React from 'react';
import './OptionsIcons.css';
interface Props {
    IconName: string;
}

const OptionsIcons: React.FC<{ icons: Props[] }> = ({ icons }) => {
    return (
        <div className='icon-container i'> 
            {icons.map((icon) => (
                    <i className={icon.IconName}></i>
            ))}
        </div>
    );
};

export default OptionsIcons;
