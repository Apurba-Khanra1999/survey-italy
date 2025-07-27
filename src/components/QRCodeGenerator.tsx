
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, ExternalLink, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  url: string;
  title: string;
}

const QRCodeGenerator = ({ url, title }: QRCodeGeneratorProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Survey link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.download = `${title}-qr-code.png`;
        link.href = url;
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const openSurvey = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2.5">
          <Share2 className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Share Your Survey
        </h3>
      </div>
      
      <div className="text-center space-y-8">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
            <QRCodeSVG
              id="qr-code"
              value={url}
              size={220}
              bgColor="#ffffff"
              fgColor="#1f2937"
              level="M"
              includeMargin={true}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Survey Link
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
              />
              <button
                onClick={copyToClipboard}
                className="p-3 text-gray-600 hover:text-blue-600 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
                title="Copy link"
              >
                <Copy className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={openSurvey}
                className="p-3 text-gray-600 hover:text-indigo-600 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200 group"
                title="Open survey"
              >
                <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <button
            onClick={downloadQRCode}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" />
            <span>Download QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
