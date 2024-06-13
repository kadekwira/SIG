"use client"
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import customData from '../data/pantai';
import RouteCard from '../../components/card/RouteCard';
import '../../direction.css'; // Stylesheet for direction icons

const MapsPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState([115.168640, -8.719266]);
  const [route, setRoute] = useState(null); 
  const [directions, setDirections] = useState(null);
  const destinationMarkerRef = useRef(null); 

  const handleOnClose = () => {
    setSelectedPlace(null);
    setRoute(null); 
  };

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPS_TOKEN;

    const map = new mapboxgl.Map({
      accessToken: token,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 10,
      center: userLocation,
      attributionControl: false,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true
    });

    const navigation = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true
    });

    const localGeocoder1 = (query) => {
      const matchingFeatures = [];
      for (const feature of customData.features) {
        if (feature.properties && feature.properties.name.toLowerCase().includes(query.toLowerCase())) {
          matchingFeatures.push({
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              name: feature.properties.name,
              image: feature.properties.image,
              rating: feature.properties.rating,
              kecamatan: feature.properties.kecamatan,
              location: feature.properties.location
            },
            place_name: feature.properties.name,
            center: feature.geometry.coordinates,
            place_type: ['beach']
          });
        }
      }
      return matchingFeatures;
    };

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      localGeocoder: localGeocoder1,
      zoom: 14,
      placeholder: 'Masukkan pencarian, contoh: Pantai',
      mapboxgl: mapboxgl,
      language: 'id',
      trackProximity: false
    });

    geocoder.on('result', (event) => {
      const feature = event.result;
      if (feature.properties && feature.properties.name) {
        setSelectedPlace(feature);

        // Remove previous destination marker if exists
        if (destinationMarkerRef.current) {
          destinationMarkerRef.current.remove();
        }

        // Create a new marker for the selected destination
        const destinationMarker = new mapboxgl.Marker({
          color: '#FF0000' // Red color for destination marker
        })
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

        destinationMarkerRef.current = destinationMarker; // Save marker to ref

        // Set directions if available
        if (userLocation && directions) {
          directions.setOrigin(userLocation);
          directions.setDestination(feature.geometry.coordinates);
        }
      } else {
        setSelectedPlace(null);
      }
    });

    map.addControl(geocoder, 'top-right');
    map.addControl(geolocate, 'bottom-right');
    map.addControl(navigation, 'bottom-right');

    const directionsInstance = new MapboxDirections({
      accessToken: token,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: true, // Enable inputs for origin and destination
        instructions: true,
        profileSwitcher: true // Enable profile switcher
      },
      language: 'id',
      interactive: false, // Disable interaction to set origin and destination
      clickToSetOrigin: false, // Optional, disable if not needed
      clickToSetDestination: false, // Optional, disable if not needed
      marker: false 
    });

    directionsInstance.on('route', (event) => {
      const route = event.route[0];
      setRoute(route); // Update route state with the new route
    });

    setDirections(directionsInstance);
    map.addControl(directionsInstance, 'top-left');

    map.on('load', () => {
      geolocate.trigger();
    });

    geolocate.on('geolocate', (position) => {
      const { longitude, latitude } = position.coords;
      setUserLocation([longitude, latitude]);
      console.log(position.coords)

      // Update map center when user location changes
      map.setCenter([longitude, latitude]);

      // Add origin marker if not already added
      if (!destinationMarkerRef.current) {
        const originMarker = new mapboxgl.Marker({
          color: '#3366FF' // Blue color for origin marker
        })
          .setLngLat([longitude, latitude])
          .addTo(map);

        destinationMarkerRef.current = originMarker; // Save marker to ref
      }
    });

    return () => map.remove();
  }, []);

  const handleRouteClick = (destination) => {
    if (userLocation && destination && directions) {
      directions.setOrigin(userLocation);
      directions.setDestination(destination);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow relative" id="map" style={{ height: '100%', width: '100%' }}>
        {selectedPlace && (
          <div className="absolute bottom-5 left-5 w-72 h-80 bg-white p-5 shadow-lg z-10 rounded-lg text-black">
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold"
              onClick={handleOnClose}
            >
              X
            </button>
            {selectedPlace.properties.image && <img src={selectedPlace.properties.image} alt={selectedPlace.properties.name} className="w-full h-32 object-cover mb-2 rounded-lg"/>}
            <p className="font-bold">{selectedPlace.properties.name}</p>
            {selectedPlace.properties.rating && <p>Rating: {selectedPlace.properties.rating}</p>}
            {selectedPlace.properties.kecamatan && <p>Kecamatan: {selectedPlace.properties.kecamatan}</p>}
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-32 m-2">Detail</button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-32 m-2"
                onClick={() => handleRouteClick(selectedPlace.geometry.coordinates)}
              >
                Rute
              </button>
            </div>
          </div>
        )}
        <RouteCard route={route} onClose={() => setRoute(null)} /> {/* Render the RouteCard */}
      </div>
    </div>
  );
};

export default MapsPage;

