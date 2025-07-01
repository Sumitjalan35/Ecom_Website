import React from 'react';
import { FaPlusCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const products = [
  { id: 1, name: 'A+ Blood Pack', price: 500, type: 'A+', stock: 15, urgency: 'normal', description: 'Most common blood type in India' },
  { id: 2, name: 'A- Blood Pack', price: 520, type: 'A-', stock: 8, urgency: 'high', description: 'Rare blood type, high demand' },
  { id: 3, name: 'B+ Blood Pack', price: 480, type: 'B+', stock: 12, urgency: 'normal', description: 'Common blood type' },
  { id: 4, name: 'B- Blood Pack', price: 540, type: 'B-', stock: 5, urgency: 'high', description: 'Rare blood type' },
  { id: 5, name: 'AB+ Blood Pack', price: 460, type: 'AB+', stock: 20, urgency: 'low', description: 'Universal recipient' },
  { id: 6, name: 'AB- Blood Pack', price: 580, type: 'AB-', stock: 3, urgency: 'critical', description: 'Rarest blood type' },
  { id: 7, name: 'O+ Blood Pack', price: 490, type: 'O+', stock: 18, urgency: 'normal', description: 'Most common blood type' },
  { id: 8, name: 'O- Blood Pack', price: 600, type: 'O-', stock: 6, urgency: 'critical', description: 'Universal donor' },
];

function ProductList({ addToCart, searchTerm, selectedCategory }) {
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'normal': return '#059669';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'critical': return 'Critical Need';
      case 'high': return 'High Demand';
      case 'normal': return 'Available';
      case 'low': return 'Low Priority';
      default: return 'Available';
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="blood-icon">🧪</span> Available Blood Packs
        </h2>
        <div className="product-count">
          {filteredProducts.length} of {products.length} types available
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <FaInfoCircle className="no-results-icon" />
          <h3>No blood types found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="blood-products">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <span className="blood-type-badge">{product.type}</span>
                <div className="urgency-badge" style={{ backgroundColor: getUrgencyColor(product.urgency) }}>
                  {getUrgencyText(product.urgency)}
                </div>
              </div>
              
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <div className="price-section">
                  <p className="product-price">₹{product.price}</p>
                  <p className="stock-info">
                    Stock: <span className={product.stock < 5 ? 'low-stock' : 'normal-stock'}>{product.stock} units</span>
                  </p>
                </div>
                
                {product.stock < 5 && (
                  <div className="low-stock-warning">
                    <FaExclamationTriangle />
                    <span>Low Stock!</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="btn btn-add"
                disabled={product.stock === 0}
              >
                <FaPlusCircle /> 
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList; 