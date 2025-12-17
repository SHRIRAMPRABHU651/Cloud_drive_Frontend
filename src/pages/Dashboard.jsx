import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import FileUpload from '../components/FileUpload';
import ShareModal from '../components/ShareModal';

/**
 * Dashboard Page - Modern Redesign
 * Main page showing user's files with upload and sharing capabilities
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/files/my');
      if (response.data.success) {
        setFiles(response.data.data.files);
      }
    } catch (err) {
      setError('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const response = await api.get(`/files/download/${fileId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType === 'application/pdf') return '📄';
    if (mimeType === 'text/csv') return '📊';
    if (mimeType === 'text/plain') return '📝';
    return '📁';
  };

  const getFileColor = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'bg-blue-100 text-blue-600';
    if (mimeType === 'application/pdf') return 'bg-red-100 text-red-600';
    if (mimeType === 'text/csv') return 'bg-green-100 text-green-600';
    if (mimeType === 'text/plain') return 'bg-gray-100 text-gray-600';
    return 'bg-purple-100 text-purple-600';
  };

  const filteredFiles = files.filter((file) =>
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <span className="text-2xl">☁️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CloudDrive
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Link
                to="/shared"
                className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              >
                Shared Files
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-96 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            {showUpload ? '✕ Cancel' : '+ Upload Files'}
          </button>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <div className="mb-8 animate-fade-in">
            <FileUpload onUploadSuccess={fetchFiles} />
          </div>
        )}

        {/* Files Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading your files...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-800">{error}</div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No files found' : 'No files yet'}
            </p>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Upload your first file to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Upload Your First File
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 p-6 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${getFileColor(file.mimeType)} p-3 rounded-lg text-2xl`}>
                    {getFileIcon(file.mimeType)}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDownload(file._id, file.originalName)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download"
                    >
                      ⬇️
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFile({
                          id: file._id,
                          name: file.originalName,
                        });
                        setShowShareModal(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share"
                    >
                      🔗
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 truncate" title={file.originalName}>
                  {file.originalName}
                </h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>{formatFileSize(file.size)}</p>
                  <p>{formatDate(file.uploadDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Share Modal */}
      {showShareModal && selectedFile && (
        <ShareModal
          file={selectedFile}
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false);
            setSelectedFile(null);
          }}
          onShareSuccess={fetchFiles}
        />
      )}
    </div>
  );
};

export default Dashboard;
