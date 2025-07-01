import React, { useState } from 'react';
import { FaTrashAlt, FaCheckCircle, FaFileAlt, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

function Cart({ cart, removeFromCart, updateQuantity, placeOrder, orderHistory, clearCart, cartTotal }) {
  const [activeTab, setActiveTab] = useState('cart');

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="panel cart-panel">
      <div className="cart-tabs">
        <button 
          className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          <FaShoppingCart />
          Cart ({getTotalItems()})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaFileAlt />
          History ({orderHistory.length})
        </button>
      </div>

      {activeTab === 'cart' && (
        <div className="cart-section">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <FaShoppingCart className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some blood packs to get started</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-info">
                      <div className="item-header">
                        <span className="blood-type-badge-small">{item.type}</span>
                        <h4 className="item-name">{item.name}</h4>
                      </div>
                      <p className="item-price">₹{item.price} per unit</p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      
                      <div className="item-total">
                        ₹{item.price * item.quantity}
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(index)}
                        className="btn-remove"
                        title="Remove item"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Processing Fee:</span>
                  <span>₹50</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{cartTotal + 50}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button
                  onClick={clearCart}
                  className="btn btn-secondary"
                >
                  Clear Cart
                </button>
                <button
                  onClick={placeOrder}
                  className="btn btn-order"
                  disabled={cart.length === 0}
                >
                  <FaCheckCircle /> Place Order (₹{cartTotal + 50})
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="order-history">
          {orderHistory.length === 0 ? (
            <div className="empty-history">
              <FaFileAlt className="empty-history-icon" />
              <h3>No orders yet</h3>
              <p>Your order history will appear here</p>
            </div>
          ) : (
            <div className="history-list">
              {orderHistory.map((order, idx) => (
                <div key={order.id} className="history-item">
                  <div className="order-header">
                    <div className="order-info">
                      <h4>Order #{order.id}</h4>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div 
                      className="order-status"
                      style={{ backgroundColor: getOrderStatusColor(order.status) }}
                    >
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="order-items">
                    {order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="order-item">
                        <span className="blood-type-badge-small">{item.type}</span>
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-total">
                    <strong>Total: ₹{order.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart; 