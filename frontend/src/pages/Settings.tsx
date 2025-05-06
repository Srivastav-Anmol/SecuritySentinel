import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface AuthResponse {
  message: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError('Email is required');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put<AuthResponse>(
        'http://localhost:5000/api/auth/update-email',
        { email: formData.email },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(response.data.message);
      // Update user in localStorage
      const updatedUser = { ...user, email: formData.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating email');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put<AuthResponse>(
        'http://localhost:5000/api/auth/update-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(response.data.message);
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] py-12">
      <div className="container max-w-2xl">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        {error && (
          <div className="bg-alert/10 border-l-4 border-alert p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-alert mr-3 shrink-0" />
            <p className="text-sm text-alert">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-success/10 border-l-4 border-success p-4 mb-6 flex items-center">
            <Check className="h-5 w-5 text-success mr-3 shrink-0" />
            <p className="text-sm text-success">{success}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="card p-6">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Update Email Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Update Email</h2>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium block">
                  New Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 block w-full rounded-md bg-secondary/30 border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Enter your new email"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto px-6 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>

          {/* Update Password Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium block">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 block w-full rounded-md bg-secondary/30 border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Enter your current password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium block">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 block w-full rounded-md bg-secondary/30 border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Enter your new password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 block w-full rounded-md bg-secondary/30 border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto px-6 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 