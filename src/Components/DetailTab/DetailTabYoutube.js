import React from 'react';
import styled from 'styled-components';

const IFRAME = styled.iframe`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
`;

export default ({ playerKey }) => (
  <IFRAME
    title="trailor"
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${playerKey}`}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);
