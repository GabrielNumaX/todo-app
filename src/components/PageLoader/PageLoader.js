import React from 'react';

import css from './PageLoader.module.css';

const PageLoader = (props) => {

    return (
        props.visible ?

            <div className={css.loaderContainer}>

                <div className={css.stage}>
                    <div className={css.dotSpin}></div>
                </div>

            </div>
            :
            props.children
    )
}

export default PageLoader;