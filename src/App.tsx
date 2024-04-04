import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomerList, CustomerDetails } from './components';
import { fetchCustomers, fetchCustomerDetails } from './api';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerDetails, setCustomerDetails] = useState<any | null>(null);

  useEffect(() => {
    fetchCustomers().then(data => setCustomers(data));
  }, []);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      fetchCustomerDetails(selectedCustomerId).then(data => setCustomerDetails(data));
    }
  }, [selectedCustomerId]);

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomerId(id);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CustomerList customers={customers} onSelectCustomer={handleSelectCustomer} selectedCustomerId={selectedCustomerId} />} />
          <Route path="/details" element={<CustomerDetails details={customerDetails} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
