import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSpinner);

export function Spinner() {
    return (
        <div className="spinner">
            <FontAwesomeIcon icon="spinner" spin size="3x" />
        </div>
    );
}
