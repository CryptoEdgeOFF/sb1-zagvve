import React, { useState, useEffect } from 'react';
import ViewerOverlay from './components/ViewerOverlay';
import ConfigPanel from './components/ConfigPanel';

declare global {
  interface Window {
    Twitch?: {
      ext: {
        configuration: {
          set: (segment: string, key: string, value: string) => void;
          onChanged: (callback: () => void) => void;
        };
      };
    };
  }
}

function App() {
  const [isConfig, setIsConfig] = useState(false);
  const [donationUrl, setDonationUrl] = useState('');

  useEffect(() => {
    // Check if we're in the config panel
    setIsConfig(window.Twitch?.ext.configuration.broadcaster ? true : false);

    // Load saved donation URL using Twitch's Configuration Service
    window.Twitch?.ext.configuration.onChanged(() => {
      const config = window.Twitch?.ext.configuration.broadcaster;
      if (config) {
        const content = JSON.parse(config.content);
        setDonationUrl(content.donationUrl || '');
      }
    });
  }, []);

  const saveDonationUrl = (url: string) => {
    setDonationUrl(url);
    window.Twitch?.ext.configuration.set('broadcaster', '1', JSON.stringify({ donationUrl: url }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isConfig ? (
        <ConfigPanel donationUrl={donationUrl} onSave={saveDonationUrl} />
      ) : (
        <ViewerOverlay donationUrl={donationUrl} />
      )}
    </div>
  );
}

export default App;