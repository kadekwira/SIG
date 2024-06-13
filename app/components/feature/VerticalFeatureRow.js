import React from 'react';
import classNames from 'classnames';

const VerticalFeatureRow = (props) => {
  const verticalFeatureClass = classNames(
    'mt-20',
    'flex',
    'flex-wrap',
    'items-center',
    {
      'flex-row-reverse': props.reverse,
    },
  );

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">{props.title}</h3>
        <div className="mt-6 text-xl leading-9 text-gray-400">{props.description}</div>
      </div>

      <div className="w-full p-6 sm:w-1/2">
        <img src={props.image} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
