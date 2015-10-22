function calculateTotal() {
    "use strict";
    var pizzaPrice = getCrustPrice() + getCheesePrice() + getSaucePrice() + getToppingsPrice(), priceField = document.getElementById("totalPrice");
    priceField.style.display = 'block';
    var roundedTotal = Math.round(pizzaPrice * 100) / 100;
    priceField.innerHTML = "Total Pizza Cost: $" + roundedTotal;
}