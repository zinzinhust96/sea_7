import React from 'react';

const PageWrapper = ({ children }) => (<div className="container-fluid">
  <div className="container mt-5">
    {children}
  </div>
</div>)

export default PageWrapper
