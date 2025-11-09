import React, { useState, useEffect } from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay, handleClick }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    // Generate unique invoice number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    setInvoiceNumber(`INV-${timestamp}-${randomNum}`);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const date = new Date().toLocaleDateString();
    const content = `
CONFERENCE EXPENSE PLANNER - QUOTE
Generated on: ${date}
=====================================

COST BREAKDOWN:
-----------------
Venue Costs:    $${totalCosts.venue}
Add-ons Costs:  $${totalCosts.addons}
Meals Costs:    $${totalCosts.meals}

TOTAL COST:     $${totalCosts.total}

=====================================
Thank you for using BudgetEase Solutions!
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conference-quote-${date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    const date = new Date().toLocaleDateString();
    const content = `Conference Quote - ${date}\n\nVenue: $${totalCosts.venue}\nAdd-ons: $${totalCosts.addons}\nMeals: $${totalCosts.meals}\n\nTotal: $${totalCosts.total}`;
    
    navigator.clipboard.writeText(content).then(() => {
      alert('Quote copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleProceedToPayment = () => {
    if (!clientName || !clientEmail || !eventName) {
      alert('Please fill in all required client information fields.');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    const depositAmount = (totalCosts.total * 0.5).toFixed(2);
    const balanceAmount = (totalCosts.total * 0.5).toFixed(2);
    setShowPaymentSuccess(true);
    setTimeout(() => {
      alert(`✅ Payment Initiated Successfully!\n\n📄 Invoice: ${invoiceNumber}\n👤 Client: ${clientName}\n💰 Deposit (50%): $${depositAmount}\n💳 Payment Method: ${paymentMethod}\n📅 Balance Due: $${balanceAmount}\n\n✨ Thank you for your booking!`);
      setShowPaymentSuccess(false);
    }, 1000);
  };

  const depositAmount = (totalCosts.total * 0.5).toFixed(2);
  const balanceAmount = (totalCosts.total * 0.5).toFixed(2);
  
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <h3 className="preheading">Invoice / Facture</h3>
          <p className="invoice-number">Invoice #: {invoiceNumber}</p>
          <div className="export-buttons no-print">
            <button className="export-btn print-btn" onClick={handlePrint} title="Print Invoice">
              🖨️ Print
            </button>
            <button className="export-btn download-btn" onClick={handleDownloadText} title="Download Invoice">
              📥 Download
            </button>
            <button className="export-btn copy-btn" onClick={handleCopyToClipboard} title="Copy to Clipboard">
              📋 Copy
            </button>
          </div>
        </div>

        {/* Client Information Form */}
        <div className="client-info-section no-print">
          <h4>Client Information</h4>
          <div className="client-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Client Name *"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="client-input"
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="client-input"
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Event Name *"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="client-input"
              />
              <input
                type="date"
                placeholder="Event Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="client-input"
              />
            </div>
          </div>
        </div>

        {/* Client Info Display for Print */}
        <div className="client-info-print print-only">
          <h4>Client Information</h4>
          <p><strong>Client Name:</strong> {clientName || 'N/A'}</p>
          <p><strong>Email:</strong> {clientEmail || 'N/A'}</p>
          <p><strong>Event Name:</strong> {eventName || 'N/A'}</p>
          <p><strong>Event Date:</strong> {eventDate || 'N/A'}</p>
        </div>

        <div className="cost-breakdown">
          <div className="cost-section">
            <h4>Venue Costs:</h4>
            <p className="cost-amount">${totalCosts.venue}</p>
          </div>
          <div className="cost-section">
            <h4>Add-ons Costs:</h4>
            <p className="cost-amount">${totalCosts.addons}</p>
          </div>
          <div className="cost-section">
            <h4>Meals Costs:</h4>
            <p className="cost-amount">${totalCosts.meals}</p>
          </div>
          <hr />
          <div className="cost-section total">
            <h2 id="pre_fee_cost_display" className="price">
              Total: ${totalCosts.total}
            </h2>
          </div>
          <div className="items-display-section">
            <h4>Selected Items:</h4>
            <ItemsDisplay />
          </div>
          {/* Payment Terms */}
          <div className="payment-terms">
            <h4>Payment Terms</h4>
            <ul>
              <li>50% deposit required to confirm booking</li>
              <li>Balance due 7 days before event</li>
              <li>Payment methods: Bank transfer, Credit card, Check</li>
            </ul>
          </div>

          {/* Payment Section */}
          <div className="payment-section no-print">
            <h4>💳 Payment Information</h4>
            
            {/* Payment Summary */}
            <div className="payment-summary">
              <div className="summary-row">
                <span>Total Amount:</span>
                <span className="amount-large">${totalCosts.total}</span>
              </div>
              <div className="summary-row highlight">
                <span>Deposit Required (50%):</span>
                <span className="amount-large">${depositAmount}</span>
              </div>
              <div className="summary-row">
                <span>Balance Due:</span>
                <span>${balanceAmount}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-methods">
              <h5>Select Payment Method:</h5>
              <div className="payment-options">
                <div 
                  className={`payment-card ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('Credit Card')}
                >
                  <div className="payment-icon">💳</div>
                  <div className="payment-name">Credit Card</div>
                </div>
                <div 
                  className={`payment-card ${paymentMethod === 'Bank Transfer' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('Bank Transfer')}
                >
                  <div className="payment-icon">🏦</div>
                  <div className="payment-name">Bank Transfer</div>
                </div>
                <div 
                  className={`payment-card ${paymentMethod === 'PayPal' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('PayPal')}
                >
                  <div className="payment-icon">💰</div>
                  <div className="payment-name">PayPal</div>
                </div>
                <div 
                  className={`payment-card ${paymentMethod === 'Check' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('Check')}
                >
                  <div className="payment-icon">✅</div>
                  <div className="payment-name">Check</div>
                </div>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <button 
              className={`proceed-payment-btn ${showPaymentSuccess ? 'processing' : ''}`}
              onClick={handleProceedToPayment}
              disabled={showPaymentSuccess}
            >
              {showPaymentSuccess ? '⏳ Processing...' : '🚀 Proceed to Payment'}
            </button>
          </div>

          <div className="print-footer">
            <p>Invoice Date: {new Date().toLocaleDateString()}</p>
            <p><strong>BudgetEase Solutions</strong> - Conference Expense Planner</p>
            <p>Email: info@budgetease.com | Tel: +1 (555) 123-4567</p>
            <p className="thank-you">Thank you for your business!</p>
          </div>
          <button className="back-button no-print" onClick={handleClick}>
            Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
