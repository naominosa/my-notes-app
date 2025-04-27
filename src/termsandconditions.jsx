import React, { useState } from 'react';
import './Termsandcondition.css';

const TermsAndConditions = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="wrapper">
      <div className="containers">
        <div className="emoji">📜✨</div>
        <h1 className="heading">Terms & Conditions</h1>
        <p className="date">Last updated: April 17, 2025</p>

        <section className="section">
          <h2 className="subHeading">1. Be Kind 😊</h2>
          <p className="paragraph">
            Please be respectful and kind while using our services. We're all here to have a good time.
          </p>
        </section>

        <section className="section">
          <h2 className="subHeading">2. No Spam 🚫</h2>
          <p className="paragraph">
            Don’t flood the site with spam or annoying content. Let’s keep things nice and cozy.
          </p>
        </section>

        <section className="section">
          <h2 className="subHeading">3. Protect Your Content 🔒</h2>
          <p className="paragraph">
            We care about your content and privacy. Make sure you do too!
          </p>
        </section>

        <section className="section">
          <h2 className="subHeading">4. Updates 🔁</h2>
          <p className="paragraph">
            We may tweak these terms now and then. When we do, we’ll let you know right here.
          </p>

          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />

<label htmlFor="agree" className="checkboxLabel">
            I agree to these cute and fair terms 💕
          </label>
<div className="footer">
          &copy; 2025 Your Lovely App 🌸 All rights reserved. Made with 💖
        </div>
        </section>
{/* 
        <div className="checkboxContainer">
        
         
        </div> */}

        
      </div>
    </div>
  );
};

export default TermsAndConditions;
