import React from 'react';

import css from './PulseLoader.module.css'

const PulseLoader = () => {
    return ( 
        <div className={css.stage}>
            <div className={css.dotPulse}></div>
        </div>
     );
}
 
export default PulseLoader;