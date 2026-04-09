import React from 'react';

const WHATSAPP_PHONE = '5511960474488';

export const TopBanner: React.FC = () => {

  const message =
    'Olá! Vim pelo site da Mobibi! Quero negociar uma condição exclusiva de aluguel veicular.';

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="bg-gray-900 text-white text-center py-2 px-4 text-sm font-medium">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
      >
        <span>Entre em contato e negocie uma condição exclusiva de desconto.</span>

        <span className="underline decoration-white underline-offset-2">
          Clique aqui.
        </span>
      </a>
    </div>
  );
};