import React, { useState } from 'react';
import './XModal.css';

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({
    username: false,
    email: false,
    dob: false,
    phone: false
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let isValid = true;

    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = true;
        isValid = false;
      }
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const currentDate = new Date();
    const dobDate = new Date(formData.dob);
    if (dobDate > currentDate) {
      alert('Invalid date of birth. Please enter a valid date.');
      return;
    }

    setIsOpen(false);
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
    setFormErrors({
      username: false,
      email: false,
      dob: false,
      phone: false
    });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.className === 'modal') {
      setIsOpen(false);
    }
  };

  return (
    <div>
        <h1>User Details Modal</h1>
      <button onClick={handleOpenModal}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleInputChange} />
                {formErrors.username && <span className="error-message">Please enter a username.</span>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} />
                {formErrors.email && <span className="error-message">Please enter an email address.</span>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} />
                {formErrors.dob && <span className="error-message">Please enter your date of birth.</span>}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} />
                {formErrors.phone && <span className="error-message">Please enter a phone number.</span>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
