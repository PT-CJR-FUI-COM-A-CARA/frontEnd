"use client";
import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'; 

const ContactBanner = () => {
  return (
    <div className="bg-[#EDEDED] text-gray-800 font-sans"> 
      <section
        className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/logo/jacareLogin.png')" }}
      >
        <div className="absolute inset-0 bg-[#050036]/60"></div>
        <div className="relative z-10">
          <img 
              src="../logo/Logomarca 3.svg"
              alt="Logo Fui Com a Cara" 
              className="max-w-xs md:max-w-sm lg:max-w-md h-auto" 
            />
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, description, info }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center text-center max-w-sm mx-auto">
      <div className="text-6xl text-[#050036] mb-6">
        <Icon />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 uppercase mb-4">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 px-4">
        {description}
      </p>
      <p className="text-[#050036] font-semibold text-lg">
        {info}
      </p>
    </div>
  );
};


const ContactInfo = () => {
  const contactData = [
    {
      icon: FaInstagram,
      title: 'INSTAGRAM',
      description: 'Siga nosso intagram para receber atualizações sobre o projeto!',
      info: '@fuicomacara',
    },
    {
      icon: FaLinkedin,
      title: 'LINKEDIN',
      description: 'Nosso linkedin para mais atualizações sobre o projeto',
      info: '@',
    },
    {
      icon: FaEnvelope,
      title: 'EMAIL',
      description: 'Aqui está nosso email para contato',
      info: 'fuicomacara@gmail.com',
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
        {contactData.map((item, index) => (
          <ContactCard 
            key={index} 
            icon={item.icon}
            title={item.title}
            description={item.description}
            info={item.info}
          />
        ))}
      </div>
    </section>
  );
};


const ContactPage = () => {
  return (
    <div className="bg-[#EDEDED] min-h-screen">
      
      <ContactBanner />
      <ContactInfo />
    </div>
  );
};

export default ContactPage;