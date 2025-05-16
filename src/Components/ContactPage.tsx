// This file includes our team's contact information and names
import { useEffect } from "react";
import "./ContactPage.css";

function ContactPage() {
  // Add a class to the body tag when the contact page loads and clean up when it unloads
  useEffect(() => {
    document.body.classList.add('contact-page-active');
    return () => document.body.classList.remove('contact-page-active');
  }, []);

  return (
    <div className="contact-container">
      <h1>Contact the Group</h1>
      <div className="contact-list">
        <div className="contact-card">
          <div className="contact-name">Name: Mia Pfaff</div>
          <div className="contact-email">Email: miapfaff@udel.edu</div>
        </div>
        <div className="contact-card">
          <div className="contact-name">Name: Sean Smith</div>
          <div className="contact-email">Email: ssmitty@udel.edu</div>
        </div>
        <div className="contact-card">
          <div className="contact-name">Name: Tyler Walsh</div>
          <div className="contact-email">Email: tjwalsh@udel.edu</div>
        </div>
        <div className="contact-card">
          <div className="contact-name">Name: Emma Judd</div>
          <div className="contact-email">Email: emmajudd@udel.edu</div>
        </div>
      </div>
    </div>
  );
}
export default ContactPage;