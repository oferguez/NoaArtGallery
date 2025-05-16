/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';


const Artwork = ({ item, onClick }) => {
    return (
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-200" onKeyDown={onClick} onClick={onClick}>
            <img src={item.url} alt={item.title} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title text-center font-bold">{item.title}</h5>
            </div>
        </div>
    );
};

Artwork.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};


export default Artwork;