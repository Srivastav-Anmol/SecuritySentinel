import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Eye, 
  BarChart3, 
  Clock, 
  Zap, 
  Video, 
  AlertTriangle,
  Shield,
  ArrowRight 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container flex flex-col items-center text-center">
          <div 
            className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-in"
          >
            <ShieldAlert className="h-5 w-5" />
            <span className="text-sm font-medium">Advanced Security Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-slide-up">
            Protect Your Store with <br className="hidden md:block" />
            <span className="text-primary">AI-Powered Theft Detection</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Security Sentinel provides cutting-edge robbery and theft detection technology for departmental stores, 
            using advanced computer vision algorithms to identify suspicious activities in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/about" className="btn btn-primary px-8 py-3">
              Learn More
            </Link>
            {/* <Link to="/about" className="btn btn-secondary px-8 py-3">
              Learn More
            </Link> */}
          </div>
          
          <div className="mt-16 md:mt-24 w-full flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
  <div className="glass-effect rounded-2xl overflow-hidden w-[90%] md:w-[70%] lg:w-[60%] h-[300px] md:h-[400px]">
    <img 
      src="https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      alt="Security monitoring system in action" 
      className="w-full h-full object-cover"
    />
  </div>
</div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Security Features</h2>
            <p className="text-muted-foreground">
              Our technology offers a complete solution for detecting and preventing theft in retail environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
              <p className="text-muted-foreground mb-4">
                Continuous video analysis with instant alerts for suspicious activities detected in your store.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive reporting and analytics to identify patterns and optimize your security protocols.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Protection</h3>
              <p className="text-muted-foreground mb-4">
                Round-the-clock surveillance ensures your store is protected at all times, even after hours.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Alerts</h3>
              <p className="text-muted-foreground mb-4">
                Receive immediate notifications on your devices when suspicious activities are detected.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <Video className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Evidence</h3>
              <p className="text-muted-foreground mb-4">
                Automatic recording and storage of incidents for use as evidence if needed for prosecution.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6 bg-primary/10 text-primary h-14 w-14 flex items-center justify-center rounded-full">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Theft Prevention</h3>
              <p className="text-muted-foreground mb-4">
                Proactive theft deterrence through visible monitoring and quick response to suspicious activities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Our advanced AI system uses computer vision to detect suspicious behavior and prevent theft.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 glass-effect rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3205567/pexels-photo-3205567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="AI-powered security system" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-full shrink-0 mt-1">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Video Capture</h3>
                  <p className="text-muted-foreground">
                    Our system integrates with your existing security cameras or new installations to capture video feed.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-full shrink-0 mt-1">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Advanced algorithms analyze the video in real-time, identifying suspicious patterns and behaviors.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-full shrink-0 mt-1">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Threat Detection</h3>
                  <p className="text-muted-foreground">
                    The system recognizes potential theft activities, such as concealing items or suspicious movements.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary h-10 w-10 flex items-center justify-center rounded-full shrink-0 mt-1">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Alert & Response</h3>
                  <p className="text-muted-foreground">
                    Immediate alerts are sent to security personnel with video evidence for quick intervention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your Store?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of retailers who've reduced theft by up to 75% using our AI-powered security solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary px-8 py-3">
                Get Started
              </Link>
              {/* <Link to="/signup" className="btn btn-secondary px-8 py-3">
                Get Started
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;