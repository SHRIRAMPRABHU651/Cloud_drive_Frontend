import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

/**
 * Share Link Page
 * Public page for accessing files via share link (no authentication required)
 */
const ShareLink = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFileInfo();
  }, [token]);

  const fetchFileInfo = async () => {
    try {
      setLoading(true);
      // This endpoint is now public (no auth required)
      const response = await api.get(`/share/access/${token}`);
      if (response.data.success) {
        setFile(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const downloadUrl = `/api/files/download/${file.file.id}?token=${token}`;
      window.open(downloadUrl, '_blank');
    } catch (err) {
      alert('Failed to download file');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">File Shared with You</h2>
          <p className="text-gray-600">You have been granted access to download this file</p>
        </div>

        {file && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">📁</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{file.file.filename}</h3>
                <p className="text-sm text-gray-500">{formatFileSize(file.file.size)}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
        >
          Download File
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          This link may expire. Download the file soon.
        </p>
      </div>
    </div>
  );
};

export default ShareLink;


