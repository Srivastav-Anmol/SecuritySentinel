import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-13rem)] flex items-center justify-center py-12 animate-fade-in">
      <div className="container max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-alert/20 p-4">
            <AlertTriangle className="h-10 w-10 text-alert" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <Home className="h-4 w-4 mr-2" />
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;