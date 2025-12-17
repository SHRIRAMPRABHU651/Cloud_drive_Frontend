import React, { useState, useEffect } from 'react';
import api from '../api/axios';

/**
 * Share Modal Component - Modern Redesign
 * Handles sharing files with users and generating share links
 */
const ShareModal = ({ file, isOpen, onClose, onShareSuccess }) => {
  const [activeTab, setActiveTab] = useState('user');
  const [userEmail, setUserEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && activeTab === 'link') {
      fetchShareLink();
    }
  }, [isOpen, activeTab]);

  const fetchShareLink = async () => {
    try {
      const response = await api.post('/share/link', {
        fileId: file.id,
      });
      if (response.data.success) {
        const link = response.data.data.shareLink || `${window.location.origin}/share/${response.data.data.shareToken}`;
        setShareLink(link);
      }
    } catch (err) {
      // Link might not exist yet, that's okay
    }
  };

  const handleShareWithUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/share/user', {
        fileId: file.id,
        sharedWithEmail: userEmail,
      });

      if (response.data.success) {
        setSuccess('File shared successfully! Email notification sent.');
        setUserEmail('');
        if (onShareSuccess) {
          onShareSuccess();
        }
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share file');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/share/link', {
        fileId: file.id,
        expiresAt: expiresAt || null,
      });

      if (response.data.success) {
        const link = response.data.data.shareLink || `${window.location.origin}/share/${response.data.data.shareToken}`;
        setShareLink(link);
        setSuccess('Share link generated! Copy and share it.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate link');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setSuccess('Link copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Share File</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* File Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">File</p>
            <p className="font-semibold text-gray-900 truncate">{file.name}</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === 'user'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Share with User
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === 'link'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Generate Link
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-800">{success}</div>
            </div>
          )}

          {/* Share with User Tab */}
          {activeTab === 'user' && (
            <form onSubmit={handleShareWithUser}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="user@example.com"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  An email notification will be sent to the user
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Sharing...' : 'Share File'}
              </button>
            </form>
          )}

          {/* Generate Link Tab */}
          {activeTab === 'link' && (
            <div>
              <form onSubmit={handleGenerateLink} className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Generating...' : 'Generate Link'}
                </button>
              </form>

              {shareLink && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Anyone with this link can access the file
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
