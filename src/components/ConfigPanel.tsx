import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface ConfigPanelProps {
  donationUrl: string;
  onSave: (url: string) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ donationUrl, onSave }) => {
  const [url, setUrl] = useState(donationUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url);
    alert('Donation URL saved successfully!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Crypto Donation Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="donationUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Donation Page URL
          </label>
          <input
            type="url"
            id="donationUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://your-crypto-donation-page.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
        >
          <Save className="mr-2" />
          Save Configuration
        </button>
      </form>
    </div>
  );
};

export default ConfigPanel;