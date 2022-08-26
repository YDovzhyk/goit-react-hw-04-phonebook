import React from 'react';
import PropTypes from 'prop-types';

import s from "./filter.module.css"

const Filter = ({value, onChange}) => (
        <label>
            Find by Name
            <input className={s.contactInput} type="text" value={value} onChange={onChange} />
        </label>
    
);

export default Filter;

Filter.defaultProps = {}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    }