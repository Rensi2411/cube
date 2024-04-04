import React from 'react';

interface Customer {
  id: number;
  name: string;
  title: string;
}

interface Props {
  customers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomerId: number | null;
}

const CustomerList: React.FC<Props> = ({ customers, onSelectCustomer, selectedCustomerId }) => {
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li
            key={customer.id}
            className={selectedCustomerId === customer.id ? 'selected' : ''}
            onClick={() => onSelectCustomer(customer.id)}
          >
            <h3>{customer.name}</h3>
            <p>{customer.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
