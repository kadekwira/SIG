"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { firestore } from '../../config/firebase_config';
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

const DetailPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  const getDataById = async (id) => {
    try {
      const docRef = doc(firestore, 'wisata_pantai', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  };

  useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        const data = await getDataById(params.id);
        setData(data);
      };

      fetchData();
    }
  }, [params.id]);

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <nav className="bg-gray-600 shadow-md py-4 px-6 flex justify-between items-center w-full fixed top-0 left-0 right-0 z-10">
        <a className="text-2xl font-bold text-white" href="/">
         {data.properties.name}
        </a>
        <div className="flex space-x-4">
          <a href="/" className="text-white hover:text-gray-800">Home</a>
          <a href="/maps" className="text-white hover:text-gray-800">Maps</a>
        </div>
      </nav>

      <div className="pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{data.properties.name}</h1>
          <p className="text-gray-800 flex justify-center items-center mb-3">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-500 text-xl mr-2"/>
            {data.properties.alamat}
          </p>
          <p className="text-gray-800 flex justify-center items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl mr-2"/>
            {data.properties.rating}
          </p>
        </div>

        <div className="mb-32">
          <img className="h-96 w-full object-cover rounded-md" src={data.properties.image_tumb} alt={data.properties.name} />
        </div>

        <section className='mb-32'>
        <h2 className="font-bold text-2xl text-center text-gray-800 mb-10">Deskripsi & Fasilitas</h2>
        <div className="flex flex-col md:flex-row mb-12 space-y-8 md:space-y-0 md:space-x-8">
          <section className="flex-1 bg-white shadow-md rounded-lg overflow-hidden p-6">
            <p className="text-gray-800 text-center">
              {data.properties.deskripsi}
            </p>
          </section>

          <section className="flex-1 bg-white shadow-md rounded-lg overflow-hidden p-6">
            <div className="text-gray-800 text-center" dangerouslySetInnerHTML={{ __html: data.properties.fasilitas }} />
          </section>
        </div>
        </section>

        <section>
          <h2 className="font-bold text-2xl text-center text-gray-800 mb-8">Galery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <img className="w-full h-48 object-cover rounded-md hover:shadow-lg" src={data.properties.galeri.foto1} alt="Gallery Image 1"/>
            <img className="w-full h-48 object-cover rounded-md hover:shadow-lg" src={data.properties.galeri.foto2} alt="Gallery Image 2"/>
            <img className="w-full h-48 object-cover rounded-md hover:shadow-lg" src={data.properties.galeri.foto3} alt="Gallery Image 3"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPage;
