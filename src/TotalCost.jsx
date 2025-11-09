import React from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay, handleClick }) => {
  
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
  
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <h3 className="preheading">Total Cost for the Event</h3>
          <div className="export-buttons no-print">
            <button className="export-btn print-btn" onClick={handlePrint} title="Print Quote">
              🖨️ Print
            </button>
            <button className="export-btn download-btn" onClick={handleDownloadText} title="Download as Text">
              📥 Download
            </button>
            <button className="export-btn copy-btn" onClick={handleCopyToClipboard} title="Copy to Clipboard">
              📋 Copy
            </button>
          </div>
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
          <div className="print-footer">
            <p>Generated on: {new Date().toLocaleDateString()}</p>
            <p>BudgetEase Solutions - Conference Expense Planner</p>
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
