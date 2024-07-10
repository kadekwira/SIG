"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "@/app/components/Logo";
import { NavbarTwoColumns } from "@/app/components/Navbar";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [city, setCity] = useState('Loading...');
  const [weather, setWeather] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const geocodingClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPS_TOKEN });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await geocodingClient.reverseGeocode({
            query: [longitude, latitude],
            limit: 1
          }).send();
          const place = response.body.features[0];
          const locality = place.context.find(c => c.id.includes('neighborhood'));
          const cityName = locality ? locality.text : 'Unknown Location';
          setCity(cityName);

          // Fetch weather data
          if (cityName !== 'Unknown Location') {
            try {
              const weatherResponse = await axios.get(`https://api.collectapi.com/weather/getWeather?data.lang=id&data.city=${cityName}`, {
                headers: {
                  authorization: `apikey 2LAYSVC3lp9gMmOn6ilbCX:7tjNXsXpYRUxxuBtCpsogX`
                }
              });
              const weatherData = weatherResponse.data.result[0];
              setWeather(weatherData);
            } catch (weatherError) {
              console.error('Error fetching weather data', weatherError);
              setWeather(null);
            }
          }
        } catch (error) {
          console.error('Error retrieving location', error);
          setCity(null);
        }
      });
    } else {
      setCity('Geolocation not supported');
    }
  }, []);

  return (
    <div className="flex flex-col md:h-screen h-fit">
      <div className="md:hidden bg-gray-600 p-4 fixed top-0 left-0 right-0 z-50">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="2x" />
        </button>
      </div>
      <div className={`bg-gray-600 w-full md:w-64 p-4 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative fixed top-0 left-0 transition-transform duration-300 ease-in-out z-40 h-screen`}>
        <div className="md:mt-0 mt-16">
          <Logo md/>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex items-center mt-3 gap-4 text-lg ml-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-500 "/> 
            <p className="text-white">{city}</p>
          </div>
          {weather && (
            <div className="flex items-center mt-3 text-white">
                <img
                  src={weather.icon}
                  alt={weather.icon}
                  className="w-10 h-10 mr-2"
                />
              <p> {weather.description} ({weather.degree}°C)</p>
            </div>
          )}
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-col mt-4">
            <a href="/maps?all=true" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Cari Semua Pantai
            </a>
          </div>
          <div className="flex flex-col mt-4">
            <a href="/maps?findNearest=true" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Cari Lokasi Terdekat Anda
            </a>
          </div>
          <div className="flex flex-col mt-4 gap-3">
            <a href="/maps?kecamatan=kuta utara" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Kuta Utara
            </a>
            <a href="/maps?kecamatan=kuta" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Kuta 
            </a>
            <a href="/maps?kecamatan=kuta selatan" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Kuta Selatan
            </a>
            <a href="/maps?kecamatan=mengwi" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Mengwi
            </a>
            <a href="/maps?kecamatan=abiansemal" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Abiansemal
            </a>
            <a href="/maps?kecamatan=petang" className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center">
              Petang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
