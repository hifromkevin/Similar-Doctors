import React from 'react';

const SimilarDoctors = ({doctor}) => (
  <div className="similar__doctors col-4">
    <img src={doctor.picture} alt={doctor.name} className="similar__image" />
    <p className="similar__props">{doctor.name}<br />
    {doctor.averageReview}/5</p>
  </div>
);

export default SimilarDoctors;