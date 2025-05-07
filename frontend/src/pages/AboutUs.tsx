import React from 'react';
import { Github, Linkedin, Mail, Briefcase, MapPin, Calendar } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  location: string;
  joined: string;
  github: string;
  linkedin: string;
}

const AboutUs: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Divyanshu Sharma",
      role: "Model Training and Implementation",
      bio: "Divyanshu specializes in computer vision algorithms. He leads our core detection technology development.",
      image: "/dev.jpg",
      location: "Tundla,UP",
      joined: "2020",
      github: "https://github.com/Divyanshugdgps",
      linkedin: "https://www.linkedin.com/in/divyanshu-sharma-bb2573213?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",

    },
    {
      id: 2,
      name: "Ayushi",
      role: "Backend Developer",
      bio: "Ayushi is an expert in building secure, scalable backend systems. He manages our real-time detection infrastructure and data processing pipelines.",
      image: "/ayushi.jpg",
      location: "Noida, UP",
      joined: "2021",
      github: "https://github.com/ayushii055",
      linkedin: "https://www.linkedin.com/in/ayushi-~-ba53832ba/",

    },
    {
      id: 3,
      name: "Kshitij Tripathi",
      role: "Frontend Developer",
      bio: "Kshitij creates beautiful, intuitive user interfaces that make complex security systems accessible and easy to use for non-technical users.",
      image: "/kshitij.jpg",
      location: "Chennai, TN",
      joined: "2022",
      github: "#",
      linkedin: "https://www.linkedin.com/in/kshitij-tripathi-3a8903287",
    },
    {
      id: 4,
      name: "Abhay Singh",
      role: "Deployement & Documentation",
      bio: "With a background in retail loss prevention, Abhay bridges the gap between technology and practical security implementation in retail environments.",
      image: "/abhay.jpg",
      location: "Gr. Noida, UP",
      joined: "2020",
      github: "#",
      linkedin: "#",

    }
  ];

  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground">
            We're a passionate team of engineers, AI specialists, and security experts dedicated to creating cutting-edge solutions for retail theft prevention.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {teamMembers.map((member) => (
            <div key={member.id} className="card overflow-hidden animate-slide-up" style={{ animationDelay: `${member.id * 100}ms` }}>
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 h-60 md:h-auto overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{member.location}</span>
                    </div>
{/*                     <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                    <span>{member.experience} experience</span>
                    </div> */}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Joined {member.joined}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <a 
                      href={member.github} 
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              How we came together to revolutionize retail security
            </p>
          </div>
          
          <div className="card p-8 mb-12">
            <div className="prose prose-invert max-w-none">
              <p>
                Security Sentinel was founded in 2020 with a clear mission: to make advanced security technology accessible to retailers of all sizes. Our founders, who had backgrounds in both AI research and retail loss prevention, recognized that most small to medium departmental stores lacked the sophisticated security systems that larger chains could afford.
              </p>
      
              <p>
                As the technology developed, team brought build the robust backend infrastructure needed to process video feeds in real-time, and creates an intuitive interface that store managers could use without specialized training.
              </p>
              <p>
                Today, our system is deployed in hundreds of stores across the country, helping to significantly reduce theft and inventory loss while providing store owners with peace of mind.
              </p>
            </div>
          </div>
          
          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To democratize access to advanced security technology, enabling businesses of all sizes to protect their assets effectively and create safer retail environments for both employees and customers.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Innovation in security technology</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Privacy and ethical use of AI</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Accessibility for businesses of all sizes</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Continuous improvement and learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;