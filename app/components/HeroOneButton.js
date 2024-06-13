import React from 'react';

const HeroOneButton = (props) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-white">
      {props.title}
    </h1>
    <div className="mb-16 mt-4 text-2xl text-white">{props.description}</div>

    {props.button}
  </header>
);

export { HeroOneButton };
