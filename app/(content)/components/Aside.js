"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "@/app/components/Logo";
import { NavbarTwoColumns } from "@/app/components/Navbar";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [city, setCity] = useState('Loading...');
  const [weather, setWeather] = useState(null);
  const geocodingClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPS_TOKEN });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await geocodingClient.reverseGeocode({
            query: [115.170536, -8.624836],
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
    <div className="bg-gray-600 w-64 h-screen p-4 flex flex-col">
      <div>
        <NavbarTwoColumns logo={<Logo xl />}/>
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
      <div className="mt-auto">
      </div>
    </div>
  );
};

export default Sidebar;
