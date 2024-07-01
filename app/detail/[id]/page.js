"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { firestore } from '../../config/firebase_config';
import { doc, getDoc } from "firebase/firestore";
import './style.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faStar} from '@fortawesome/free-solid-svg-icons';

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
    return <div>Loading...</div>;
  }

  return (
<div className="container p-5">
<nav className="relative px-4 py-4 flex justify-between items-center bg-white">
  <a className="text-3xl font-bold leading-none text-gray-800" href="">
  {data.properties.name}
  </a>
  <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
    <li>
      <a className="text-sm text-gray-400 hover:text-blue-500" href="/">
        Home
      </a>
    </li>
    <li>
      <a className="text-sm text-gray-400 hover:text-blue-500" href="/maps">
        Maps
      </a>
    </li>
    
  </ul>

</nav>
<section className="bg-white py-3">
    <div className="container py-8 px-6 mx-auto">
    <img
            className="hover:grow hover:shadow-lg"
            src={data.properties.image_tumb}
    />
    <p className="text-gray-800 mt-5">
      <FontAwesomeIcon icon={faLocationDot} className="text-blue-500 text-xl mr-3"/>
      <span>{data.properties.alamat}</span>
    </p>
    <p className="text-gray-800 mt-5">
      <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl mr-3"/>
      <span>{data.properties.rating}</span>
    </p>
    </div>
  </section>
  <section className="bg-white py-8">
    <div className="container py-8 px-6 mx-auto">
      <a
        className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
      >
        Deskripsi
      </a>
      <p className="mt-4 text-gray-800">
        {data.properties.deskripsi}
      </p>
    </div>
  </section>
  <section className="bg-white py-8">
    <div className="container py-8 px-6 mx-auto">
      <a
        className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
       
      >
        Fasilitas
      </a>
      <p className="mt-4 text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: data.properties.fasilitas }} />

      </p>
    </div>
  </section>
  <section className="bg-white py-8">
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <nav id="store" className="w-full z-30 top-0 px-6 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
          <a
            className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
            
          >
            Galery
          </a>
        </div>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-2">
            <img
              className="hover:grow hover:shadow-lg"
              src={data.properties.galeri.foto1}
            />
            <img
              className="hover:grow hover:shadow-lg"
              src={data.properties.galeri.foto2}
            />
            <img
              className="hover:grow hover:shadow-lg"
              src={data.properties.galeri.foto3}
            />
      </div>
    </div>
  </section>
</div>

  );
};

export default DetailPage;
