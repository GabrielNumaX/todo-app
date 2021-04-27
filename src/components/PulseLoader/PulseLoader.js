import React from 'react';

import css from './PulseLoader.module.css'

const PulseLoader = () => {
    return ( 
        <div class={css.stage}>
            <div class={css.dotPulse}></div>
        </div>
     );
}
 
export default PulseLoader;