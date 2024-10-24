// src/components/SubscriptionForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import './SubscriptionForm.css';

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="subscription-form">
      <h4>Subscribe to Kodigo Music</h4>

      {submitted ? (
        <div>
          <p className="success-message">¡Thanks for your sub, {formData.name}!</p>
          {/* Enlace para regresar a la página de inicio */}
          <Link to="/">Back to playlist</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <button type="submit">Subscribe</button>
          <Link to="/">Back to playlist</Link>
        </form>
      )}
    </div>
  );
}

export default SubscriptionForm;
