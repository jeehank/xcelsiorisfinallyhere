import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(footerRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%", 
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="footer-section">
      <div className="footer-content">
        <div className="footer-left">
          <img src="/xcelsiorlogo.png" alt="X-Celsior Logo" className="footer-logo" />
          <h3 className="footer-title">X-Celsior’26</h3>
          <p className="footer-bio">
            X-Celsior is the flagship technology festival of St. Xavier’s Collegiate School, celebrating innovation, creativity, and competition among the brightest young minds.
          </p>
        </div>
        <div className="footer-right">
          <h3 className="footer-contact-title">Contact Us:</h3>
          <div className="footer-contacts">
            <p>Debarpon Mukherjee: +91 84205 64720</p>
            <p>Jeehan Karanjai: +91 82748 69581</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 St. Xavier's Collegiate School. All rights reserved.</p>
      </div>
    </footer>
  );
}
