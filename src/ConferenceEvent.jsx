import React, { useState, useEffect } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
const ConferenceEvent = ({ showNavbar = true, showDetails = false, setShowDetails = null }) => {
    const [showItems, setShowItems] = useState(showDetails);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const validateSelection = () => {
        const newErrors = {};
        const hasVenue = venueItems.some(item => item.quantity > 0);
        const hasMeals = mealsItems.some(item => item.selected);
        
        if (!hasVenue) {
            newErrors.venue = "Please select at least one venue";
        }
        
        if (hasMeals && numberOfPeople < 1) {
            newErrors.people = "Number of people must be at least 1";
        }
        
        if (numberOfPeople > 1000) {
            newErrors.people = "Number of people cannot exceed 1000";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleToggleItems = () => {
        if (!showItems) {
            if (validateSelection()) {
                setShowItems(true);
                if (setShowDetails) setShowDetails(true);
            } else {
                showNotificationMessage("Please select at least one venue before viewing details");
            }
        } else {
            setShowItems(false);
            if (setShowDetails) setShowDetails(false);
        }
    };

    // Sync with parent state
    React.useEffect(() => {
        if (showDetails !== showItems) {
            setShowItems(showDetails);
        }
    }, [showDetails]);

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          showNotificationMessage("Maximum 3 Auditorium Halls allowed");
          return; 
        }
        if (venueItems[index].quantity >= 10) {
          showNotificationMessage("Maximum 10 items allowed per venue type");
          return;
        }
        dispatch(incrementQuantity(index));
        setErrors(prev => ({ ...prev, venue: null }));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        if (avItems[index].quantity > 0) {
            dispatch(decrementAvQuantity(index));
        }
    };

    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index));
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({
                    name: item.name,
                    quantity: item.quantity,
                    cost: item.cost,
                    totalCost: item.cost * item.quantity
                });
            }
        });
        avItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({
                    name: item.name,
                    quantity: item.quantity,
                    cost: item.cost,
                    totalCost: item.cost * item.quantity
                });
            }
        });
        mealsItems.forEach((item) => {
            if (item.selected) {
                items.push({
                    name: item.name,
                    quantity: numberOfPeople,
                    cost: item.cost,
                    totalCost: item.cost * numberOfPeople
                });
            }
        });
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        return (
            <div className="items-list">
                {items.length === 0 ? (
                    <p>No items selected yet.</p>
                ) : (
                    items.map((item, index) => (
                        <div key={index} className="item-row">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">x {item.quantity}</span>
                            <span className="item-cost">${item.totalCost}</span>
                        </div>
                    ))
                )}
            </div>
        );
    };

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
          venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        } else if (section === "av") {
          avItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        } else if (section === "meals") {
          mealsItems.forEach((item) => {
            if (item.selected) {
              totalCost += item.cost * numberOfPeople;
            }
          });
        }
        return totalCost;
      };
    
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");
    
    const totalCosts = {
        venue: venueTotalCost,
        addons: avTotalCost,
        meals: mealsTotalCost,
        total: venueTotalCost + avTotalCost + mealsTotalCost
    };

    const navigateToProducts = (idType, e) => {
        e.preventDefault();
        console.log('Navigating to:', idType); // Debug log
        
        if (showItems) {
            setShowItems(false);
        }
        
        setTimeout(() => {
            const element = document.querySelector(idType);
            console.log('Found element:', element); // Debug log
            
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('Element not found:', idType);
            }
        }, showItems ? 300 : 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showNotification && (
                <div className="notification">
                    <span>{notificationMessage}</span>
                </div>
            )}
            {showScrollTop && (
                <button className="scroll-to-top" onClick={scrollToTop} title="Scroll to top">
                    ↑
                </button>
            )}
            {showNavbar && (
                <nav className="navbar_event_conference">
                    <div className="company_logo">Conference Expense Planner</div>
                    <div className="left_navbar">
                        <div className="nav_links">
                            <a href="#venue" onClick={(e) => navigateToProducts("#venue", e)} >Venue</a>
                            <a href="#addons" onClick={(e) => navigateToProducts('#addons', e)}>Add-ons</a>
                            <a href="#meals" onClick={(e) => navigateToProducts('#meals', e)}>Meals</a>
                        </div>
                        <button className="details_button" onClick={handleToggleItems}>
                            Show Details
                        </button>
                    </div>
                </nav>
            )}
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
            </span>
            <button
              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">
                                <div className="text">
                                    <h1>Add-ons Selection</h1>
                                </div>
                                <div className="addons_selection venue_selection">
                                    {avItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                <button
                                                    className={avItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-minus"}
                                                    onClick={() => handleDecrementAvQuantity(index)}
                                                >
                                                    &#8211;
                                                </button>
                                                <span className="selected_count">
                                                    {avItems[index].quantity > 0 ? ` ${avItems[index].quantity}` : "0"}
                                                </span>
                                                <button
                                                    className="btn-success btn-plus"
                                                    onClick={() => handleIncrementAvQuantity(index)}
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${avTotalCost}</div>
                            </div>

                            {/* Meal Section */}
                            <div id="meals" className="venue_container container_main">
                                <div className="text">
                                    <h1>Meals Selection</h1>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="numberOfPeople">Number of People:</label>
                                    <input
                                        type="number"
                                        id="numberOfPeople"
                                        value={numberOfPeople}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 1;
                                            if (value > 1000) {
                                                showNotificationMessage("Maximum 1000 people allowed");
                                                setNumberOfPeople(1000);
                                            } else if (value < 1) {
                                                setNumberOfPeople(1);
                                            } else {
                                                setNumberOfPeople(value);
                                                setErrors(prev => ({ ...prev, people: null }));
                                            }
                                        }}
                                        min="1"
                                        max="1000"
                                        className={`people-input ${errors.people ? 'input-error' : ''}`}
                                    />
                                    {errors.people && <span className="error-message">{errors.people}</span>}
                                </div>
                                <div className="meal_selection">
                                    {mealsItems.map((item, index) => (
                                        <div key={index} className="meal-item">
                                            <div className="meal-info">
                                                <input
                                                    type="checkbox"
                                                    id={`meal-${index}`}
                                                    checked={item.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                    className="meal-checkbox"
                                                />
                                                <label htmlFor={`meal-${index}`} className="meal-label">
                                                    <span className="meal-name">{item.name}</span>
                                                    <span className="meal-cost">${item.cost} per person</span>
                                                </label>
                                            </div>
                                            {item.selected && (
                                                <div className="meal-total">
                                                    Total: ${item.cost * numberOfPeople}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
