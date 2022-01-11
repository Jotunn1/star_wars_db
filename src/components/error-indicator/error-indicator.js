import React from 'react';
import "./error-indicator.css";
import deathStar from './death-star.png'

const ErrorIndicator = () => {
    return (
        <div className='error-indicator'>
            <img src={deathStar} alt='Death Star' />
            <span className='boom'>BOOM!</span>
            <span >
                something went wrong
            </span>
            <span >
                but we already sent droids to fix this
            </span>
        </div>
    )
}

export default ErrorIndicator;