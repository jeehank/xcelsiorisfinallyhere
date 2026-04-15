import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    
    
    const calculateDistance = () => {
      
      return -(trackRef.current.scrollWidth - window.innerWidth);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${trackRef.current.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(trackRef.current, {
      x: calculateDistance,
      ease: "none"
    });
  }, { scope: containerRef });

  const realSponsors = [
    { id: 1, title: "Title Sponsor", src: "/eveready.png" },
    { id: 3, title: "Radio Partner", src: "/friendsfm.png" },
  ];

  return (
    <section ref={containerRef} className="sponsors-section">
      <div className="sponsors-header">
        <h2>Our Official Partners</h2>
      </div>


      <div ref={trackRef} className="sponsors-track">
        {realSponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-card glass">
            <div className="sponsor-logo-wrapper">
              <img src={sponsor.src} alt={sponsor.title} className="sponsor-logo-img" />
            </div>
            <h3>{sponsor.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
