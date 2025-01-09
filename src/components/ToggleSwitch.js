import React from "react";
import Switch from "react-switch";

function ToggleSwitch({trackProgress, handleToggle}) {

    return (
        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
            <Switch height={20} width={40} checked={trackProgress} onChange={handleToggle} checkedIcon={false} uncheckedIcon={false} onColor={'#4696FF'} />
            <span style={{fontSize: '0.9rem'}}> Track progress </span>
        </label>
    )
}

export default ToggleSwitch