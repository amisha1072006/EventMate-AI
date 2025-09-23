import React from 'react';
import { FaGlassCheers, FaBriefcase, FaBirthdayCake, FaMusic } from 'react-icons/fa';

const categories = [
  { name: 'Weddings', icon: <FaGlassCheers /> },
  { name: 'Corporate', icon: <FaBriefcase /> },
  { name: 'Birthdays', icon: <FaBirthdayCake /> },
  { name: 'Concerts', icon: <FaMusic /> },
];

const Categories = () => {
  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <div key={category.name} className="category-item">
              <div className="category-icon">{category.icon}</div>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;