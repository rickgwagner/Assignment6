//  Hide total div until an option is added
function hideTotal() {
    "use strict";
    var priceField = document.getElementById('totalPrice');
    priceField.style.display = 'none';
}
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", hideTotal, false);
}
//  Hide Other field unless Other option is chosen in dropdown
var selectLocation = document.getElementById('location'),
    onChange = function (event) {
        "use strict";
        var shown = this.options[this.selectedIndex].value === "other";
        document.getElementById('otherlocation').style.display = shown ? 'block' : 'none';
    };
if (window.addEventListener) {
    selectLocation.addEventListener('change', onChange, false);
} else {
    selectLocation.attachEvent('onchange', function () {
        "use strict";
        onChange.apply(selectLocation, arguments);
    });
}
//  Write a function to validate and ensure that the user enters a value (or makes a selection) for each of the form items here. Use regular expressions to ensure that their name doesn’t contain any numbers and that their zip code, phone number, and email address are formatted correctly. Make sure that the user only enters two alpha characters in the state field.  

function validate() {
    "use strict";
    var theName = document.pizzaForm.name.value;
    var nameExp = /^([a-zA-Z ]){2,30}$/;
    if (nameExp.test(theName) === false) {
        window.alert("Please provide your name");
        document.pizzaForm.name.focus();
        return false;
    }
    if (document.pizzaForm.street.value === "") {
        window.alert("Please provide your street address");
        document.pizzaForm.street.focus();
        return false;
    }
    if (document.pizzaForm.city.value === "") {
        window.alert("Please provide your city");
        document.pizzaForm.city.focus();
        return false;
    }
    var theState = document.pizzaForm.state.value;
    var stateExp = /[0-9]/;
    if (document.pizzaForm.state.value === "" || document.pizzaForm.state.value.length !== 2 || stateExp.test(theState) === true) {
        window.alert("Please enter a state in 2 letters");
        document.pizzaForm.state.focus();
        return false;
    }
    var zipExp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    var theZip = document.pizzaForm.zipcode.value;
    if (document.pizzaForm.zipcode.value === "" || zipExp.test(theZip) === false) {
        window.alert("Please provide a valid zipcode.");
        document.pizzaForm.zipcode.focus();
        return false;
    }
    var phoneExp = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
    var thePhone = document.pizzaForm.phone.value;
    if (document.pizzaForm.phone.value === "" || phoneExp.test(thePhone) === false) {
        window.alert("Please provide your Phone number");
        document.pizzaForm.phone.focus();
        return false;
    }
    var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var theEmail = document.pizzaForm.email.value;
    if (document.pizzaForm.email.value === "" || emailExp.test(theEmail) === false) {
        window.alert("Please provide your Email");
        document.pizzaForm.email.focus();
        return false;
    }
    return (true);
}

////  Run validate function when leaving name field
//document.getElementById("name").addEventListener("blur", function () {
//    "use strict";
//    validate();
//});
//
////  Run validate function when leaving zipcode field
//document.getElementById("zipcode").addEventListener("blur", function () {
//    "use strict";
//    validate();
//});
//

//  Run validate function when leaving email field
document.getElementById("email").addEventListener("blur", function () {
    "use strict";
    validate();
});

//  PRICES
var handTossed = {
    choose: "Choose a Size (0)",
    small: "Small ($9.99)",
    medium: "Medium ($12.99)",
    large: "Large ($14.99)"
};

var thinCrust = {
    choose: "Choose a Size (0)",
    medium: "Medium ($11.99)",
    large: "Large ($13.99)"
};
    
var newYork = {
    choose: "Choose a Size (0)",
    large: "Large ($16.99)",
    exlarge: "Extra Large ($19.99)"
};
    
var glutenFree = {
    choose: "Choose a Size (0)",
    small: "Small ($10.99)"
};

var cheesePrices = {
    light: 0,
    normal: 0,
    extra: 2.99,
    double: 3.99
};

var saucePrices = {
    regularTom: 0,
    heartyTom: 0.99,
    bbq: 1.99
};

// Add Size and Cost Options of Selected Crust to Dropdown list
function getRadioVal(form, dough) {
    "use strict";
    var val;
    var radios = form.elements[dough];
    for (var i = 0, len = radios.length; i < len; i++) {
        if ( radios[i].checked ) {
            val = radios[i].value;
            break;
        }
    }
    return val;
}

document.getElementById('pizza').onchange = function() {
var dropdown = document.getElementById("sizeOptions");
var val = getRadioVal(this, 'dough');
    
var list = document.getElementById("sizeOptions");
// As long as <select list> has a child node, remove it
while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
}     
    
if (val === "handTossed") {
var select = document.getElementById("sizeOptions");
for(index in handTossed) {
select.options[select.options.length] = new Option(handTossed[index]);
}
}
else if (val === "thinCrust") {
var select = document.getElementById("sizeOptions");
for(index in thinCrust) {
select.options[select.options.length] = new Option(thinCrust[index]);
}
}
else if (val === "newYork") {
var select = document.getElementById("sizeOptions");
for(index in newYork) {
select.options[select.options.length] = new Option(newYork[index]);
}
}
else {
var select = document.getElementById("sizeOptions");
for(index in glutenFree) {
select.options[select.options.length] = new Option(glutenFree[index]);
} 
}
}

//  Show Cheese, Sauce and Topping Options once a Dough Option is Selected
var hideExtras = document.getElementById("extras");
hideExtras.classList.add("extras");

document.getElementById("sizeOptions").addEventListener("change", function () {
var showExtras = document.getElementById("extras");
showExtras.classList.remove("extras");
});

//  Show Billing Info once Finished Building Pizza is Confirmed
var hideBilling = document.getElementById("billingInfo");
hideBilling.classList.add("hideBilling");

document.getElementById("finishedBuilding").addEventListener("click", function () {
var confirmOptions = window.confirm("Are You Sure You're Done?");
if (confirmOptions === true) {
var showBilling = document.getElementById("billingInfo");
showBilling.classList.remove("hideBilling");
} 
});
                                                             
//  GETTING COSTS
function getCrustPrice()
{
    var crustPrice = 0;
    var selectedCrust = sizeOptions.options[sizeOptions.selectedIndex].text;
    crustText = selectedCrust.replace (/[^\d.-]/g, '');
    var crustPrice = parseFloat(crustText);   
    return crustPrice;
}

document.getElementById("sizeOptions").addEventListener("change", function () {
    "use strict";
    calculateTotal();
});

function getCheesePrice()
{
    var cheesePrice = 0;
    var theForm = document.forms.pizza;
    var selectedCheese = theForm.elements.cheese;
    cheesePrice = cheesePrices[selectedCheese.value];
    return cheesePrice;
}

document.getElementById("cheese").addEventListener("change", function () {
    "use strict";
    getCheesePrice(), calculateTotal();
});

function getSaucePrice()
{
    var saucePrice = 0;
    var theForm = document.forms.pizza;
    var selectedSauce = theForm.elements.sauce;
    saucePrice = saucePrices[selectedSauce.value];
    return saucePrice;
}

document.getElementById("sauce").addEventListener("change", function () {
    "use strict";
    getSaucePrice(), calculateTotal();
});

function getToppingsPrice()
{
    var toppingPrice = 0;
    var theForm = document.forms.pizza;
    var includeToppings = theForm.elements.pepperoni;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.sausage;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.ham;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.bacon;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.salami;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.peppers;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.olives;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.jalapenos;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }
    var includeToppings = theForm.elements.mushrooms;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    } 
   var includeToppings = theForm.elements.pineapple;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }    
   var includeToppings = theForm.elements.onion;
    if(includeToppings.checked === true)
    {
        toppingPrice = toppingPrice + .99;
    }    
    return toppingPrice;
}

document.getElementById("pepperoni").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("sausage").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("ham").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("bacon").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("salami").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("peppers").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("olives").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("jalapenos").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("mushrooms").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("pineapple").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

document.getElementById("onion").addEventListener("change", function () {
    "use strict";
    getToppingsPrice(), calculateTotal();
});

//  Add it all up
function calculateTotal()
{
    var pizzaPrice = getCrustPrice() + getCheesePrice() + getSaucePrice() + getToppingsPrice();
    var priceField = document.getElementById('totalPrice');
    priceField.style.display='block';
    var roundedTotal = Math.round(pizzaPrice*100)/100;
    priceField.innerHTML = "Total Pizza Cost: $"+roundedTotal;
}

// Copy Location Info to Billing Fields
function copyLocationInfo()
{
    if(billing.checked === true)
    document.pizzaForm.billingName.value = document.pizzaForm.name.value;
    document.pizzaForm.billingStreet.value = document.pizzaForm.street.value;
    document.pizzaForm.billingNumber.value = document.pizzaForm.number.value;
    document.pizzaForm.billingCity.value = document.pizzaForm.city.value;
    document.pizzaForm.billingState.value = document.pizzaForm.state.value;
    document.pizzaForm.billingZip.value = document.pizzaForm.zipcode.value;
}

//  Credit Card Validation
function ccVerify() {
    var theCard = document.pizzaForm.cardNumber.value;
    var cardExp = /[0-9]/;
    if (document.pizzaForm.cardNumber.value === "" || cardExp.test(theCard) === false) {
        window.alert("Please enter a valid CC NUmber");
        document.pizzaForm.cardNumber.focus();
        return false;
    }
   if (document.pizzaForm.cardNumber.value.length === 13 || document.pizzaForm.cardNumber.value.length === 15 || document.pizzaForm.cardNumber.value.length === 16) {
       window.console.log("Valid number of digits"); 
   }
    else {
        window.alert("Please enter a valid number of digits");
        document.pizzaForm.cardNumber.focus();
        return false;
   }
}
    
document.getElementById("cardNumber").addEventListener("blur", function () {
    "use strict";
    ccVerify();
});

//  Display Card Type
function cardType() {
    
var list = document.getElementById("cardVendor");
// As long as <div> has a child node, remove it
while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
}  
    
var cardTemp = document.pizzaForm.cardNumber.value;
var firstNum = cardTemp.charAt(0);
var secondNum = cardTemp.charAt(1);
    if (firstNum == 4) {
        var whatType = "Visa";
    }
    else if (firstNum == 3 && secondNum == 7) {
        var whatType = "American Express";
}
    else if (firstNum == 5 && secondNum == 1 || firstNum == 5 && secondNum == 2 || firstNum == 5 && secondNum == 3 || firstNum == 5 && secondNum == 4 || firstNum == 5 && secondNum == 5) {
        var whatType = "MasterCard";
}
    else {
        var whatType = "Invalid";
    }
   if (whatType == "Visa") {
var parentDiv = document.getElementById("cardVendor");
var newParagraph = document.createElement("p"); 
var t = document.createTextNode("Visa"); 
newParagraph.appendChild(t);
parentDiv.appendChild(newParagraph);       
    }
    else if (whatType == "American Express") {
var parentDiv = document.getElementById("cardVendor");
var newParagraph = document.createElement("p"); 
var t = document.createTextNode("American Express"); 
newParagraph.appendChild(t);
parentDiv.appendChild(newParagraph);         
}
    else if (whatType == "MasterCard") {
var parentDiv = document.getElementById("cardVendor");
var newParagraph = document.createElement("p"); 
var t = document.createTextNode("MasterCard"); 
newParagraph.appendChild(t);
parentDiv.appendChild(newParagraph);         
}
    else {
window.console.log("Not a valid card vendor");
}        
}

document.getElementById("cardNumber").addEventListener("blur", function () {
    "use strict";
    cardType();
});

function ccValidate() {
    
var list = document.getElementById("invalidCard");
// As long as <div> has a child node, remove it
while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
}     
    
    var str = document.pizzaForm.cardNumber.value;
    var res = str.split("");
    res.reverse();
    for (var i = 1; i < res.length; i += 2) {
        res[i] *= 2;
    }
var doubled = res;
var joined = doubled.join("");
var newSplit = joined.split("");    
for(var i = 0, len = newSplit.length; i < len; i++){
    newSplit[i] = parseInt(newSplit[i], 10);
}  
var totalAmount = 0;
for (var x = 0; x < newSplit.length; x++) {
    totalAmount += newSplit[x]; 
}
if (totalAmount % 10 === 0) {
    window.console.log("Valid Card Number");
}
else {
var parentDiv = document.getElementById("invalidCard");
var newParagraph = document.createElement("p"); 
var t = document.createTextNode("Invalid Card Number"); 
newParagraph.appendChild(t);
parentDiv.appendChild(newParagraph);
document.pizzaForm.cardNumber.focus();
return false;    
}
}

//  Run validate function when leaving CC field
document.getElementById("cardNumber").addEventListener("blur", function () {
    "use strict";
    ccValidate();
});

//  Check CVC Number
function cvcValidate() {
    "use strict";
    var theCVC = document.pizzaForm.cvc.value;
    var cvcExp = /^[0-9]+$/;
    if (document.pizzaForm.cvc.value === "" || document.pizzaForm.cvc.value.length !== 3 || cvcExp.test(theCVC) === false) {
        window.alert("Please provide your CVC number");
        document.pizzaForm.cvc.focus();
        return false;
    }
}
//  Run validate function when leaving CVC field
document.getElementById("cvc").addEventListener("blur", function () {
    "use strict";
    cvcValidate();
});

function checkCardExp() {
var d1 = new Date();
d1.setFullYear(document.pizzaForm.year.value, document.pizzaForm.month.value -1, document.pizzaForm.day.value);
    
var d2 = new Date();
d2.getFullYear;

if (d1 < d2) {
window.alert("The Expiration Date can not be in the past"); 
}
else {
window.console.log("The Exp. Date is OK");     
}
}

//  Run checkCardExp function when selecting Expiration Year or Month options
document.getElementById("month").addEventListener("change", function () {
    "use strict";
    checkCardExp();
});

document.getElementById("year").addEventListener("change", function () {
    "use strict";
    checkCardExp();
});

//  Go to Thank you page on form submission
placeOrder.addEventListener("click", function () {
window.open("thanks.html", "_self", "toolbar=yes, scrollbars=yes, resizable=yes, width=1050, height=750");
}, false);

//  Credit Card test numbers
//  TEST NUM VISA
//  invalid  4512113014843252
//  valid  4512113014643252

//  TEST NUM MC
//  invalid  5555555557554444 
//  valid  5555555555554444 

//  TEST NUM AMEX
//  invalid  371449635598431 
//  valid  371449635398431 