// RouteCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faClock, faRoad, faArrowRight, faArrowLeft, faArrowUp, faStreetView } from '@fortawesome/free-solid-svg-icons';

const maneuverIconMap = {
  'depart': faStreetView,
  'left': faArrowLeft,
  'slight left': faArrowLeft,
  'right': faArrowRight,
  'straight': faArrowUp,
};

const RouteCard = ({ route, onClose }) => {
  if (!route) return null;

  const { duration, distance, legs } = route;
  const durationInMinutes = Math.round(duration / 60);
  const distanceInKilometers = (distance / 1000).toFixed(2);

  return (
    <div className="absolute bottom-5 left-5 w-80 bg-white p-5 shadow-lg z-10 rounded-lg text-black max-h-96 overflow-y-auto">
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className="font-bold mb-2">Rute Detail</h2>
      <p>
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        Durasi: {durationInMinutes} menit
      </p>
      <p>
        <FontAwesomeIcon icon={faRoad} className="mr-2" />
        Jarak: {distanceInKilometers} km
      </p>
      <h3 className="font-bold mt-4 mb-2">Instruksi:</h3>
      <ul className="list-disc ml-4">
        {legs[0].steps.map((step, index) => {
          const maneuverType = step.maneuver.modifier;
          const icon = maneuverIconMap[maneuverType] || faStreetView;

          return (
            <li key={index} className="mb-1 flex items-center">
              <span className="mr-2">
                <FontAwesomeIcon icon={icon} />
              </span>
              {step.maneuver.instruction}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RouteCard;
