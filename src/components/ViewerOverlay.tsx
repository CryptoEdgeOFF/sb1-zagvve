import React from 'react';
import { DollarSign } from 'lucide-react';

interface ViewerOverlayProps {
  donationUrl: string;
}

const ViewerOverlay: React.FC<ViewerOverlayProps> = ({ donationUrl }) => {
  const handleClick = () => {
    if (donationUrl) {
      window.open(donationUrl, '_blank');
    } else {
      alert('The streamer has not set up their donation page yet.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
    >
      <DollarSign className="mr-2" />
      Donate Crypto
    </button>
  );
};

export default ViewerOverlay;