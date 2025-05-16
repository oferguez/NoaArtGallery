/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';

const Collection = ({ item, onClick }) => {
  return (
    <div className="card shadow-lg hover:shadow-xl transition-shadow duration-200" onClick={onClick} onKeyDown={onClick}>
      <img src="/folder-icon.svg" alt={item.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title text-center font-bold">{item.name}</h5>
      </div>
    </div>
  );
};

Collection.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Collection;