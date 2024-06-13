import React from 'react';
import Link from 'next/link';
import { Section } from '../Section';

const Banner = () => (
  <Section>
    <div className="relative flex items-center justify-center h-96 bg-cover bg-center" style={{ backgroundImage: 'url(background.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Discover the Best Beaches</h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">Explore stunning beaches with our interactive maps</p>
        <Link href="https://creativedesignsguru.com/category/nextjs/" className='inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300'>
          Get Started
        </Link>
      </div>
    </div>
  </Section>
);

export { Banner };
