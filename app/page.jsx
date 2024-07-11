"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Background } from './components/Background';
import { useAuth } from './helper/auth_context';
import { HeroOneButton } from './components/HeroOneButton';
import { Section } from './layouts/Section';
import { NavbarTwoColumns } from './components/Navbar';
import { Logo } from './components/Logo';
import { VerticalFeatures } from './components/VerticalFeature';
import { Banner } from './components/banner/Banner';
import { Footer } from './components/Footer';
import Modal from './components/Modal';
import LoginPage from './components/Login';
import RegisterForm from './components/Register';

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        Swal.fire("Logout Successfully!", "", "success");
        await logout();
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  useEffect(() => {
    
  }, [user]);

  return (
    <>
      <Background color="bg-[url('../images/bg.jpg')] bg-cover">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />}>
            <li>
              <Link href="" className='mx-4'>About</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/maps" className='mx-4'>Maps</Link>
                </li>
                <li>
                  <Link href="" onClick={handleLogout} className="px-2 text-white mx-2">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => setShowLoginModal(true)} className='mx-4'>Sign in</button>
                </li>
              </>
            )}
          </NavbarTwoColumns>
        </Section>
      {user?( 
        <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {"Selamat Datang "+user.displayName+" \n"}
            </>
          }
          description="Ayo Mulai Pencarian Pantai di Kabupaten Badung!"
          button={
            <Link href="/maps">
              <button className='xl bg-blue-600 p-4 text-white'>Mulai</button>
            </Link>
          }
        />
      </Section>
      ):(
        <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {"JELAJAHI LOKASI WISATA PANTAI DI KABUPATEN BADUNG\n"}
            </>
          }
          button={
            <Link href="">
              <button className='xl bg-blue-600 p-4 text-white'>Mulai</button>
            </Link>
          }
        />
      </Section>
      )}
      </Background>
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}> 
          <LoginPage onClose={() => setShowLoginModal(false)}/>
      </Modal>

      {/* Modal Register */}
      <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
      <RegisterForm onClose={() => setShowRegisterModal(false)}/>
      </Modal>
      <VerticalFeatures />
      {/* <AboutUs /> */}
      <Banner user={user}/>
      <Footer />
    </>
  );
};

export default Hero;
