import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CustomerList, CustomerDetails } from './components';
import { fetchCustomers, fetchCustomerDetails } from './api';

const App: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerDetails, setCustomerDetails] = useState(null);

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
        <Switch>
          <Route exact path="/">
            <CustomerList
              customers={customers}
              onSelectCustomer={handleSelectCustomer}
              selectedCustomerId={selectedCustomerId}
            />
          </Route>
          <Route path="/details">
            {customerDetails && <CustomerDetails details={customerDetails} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
