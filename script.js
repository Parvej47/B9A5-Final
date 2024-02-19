// Function to toggle seat selection
function toggleSeatSelection(seatButton) {
    seatButton.classList.toggle('selected');
    seatButton.classList.toggle('bg-green-600');
}

// Function to handle seat selection
function handleSeatSelection(seatButton) {
    // Check if the seat is already selected
    if (seatButton.classList.contains('selected')) {
        // If selected, deselect the seat
        toggleSeatSelection(seatButton);
    } else {
        // If not selected, check if the maximum seat selection limit is reached
        const selectedSeats = document.querySelectorAll('.btn.selected').length;
        if (selectedSeats < 4) {
            // If not reached, select the seat
            toggleSeatSelection(seatButton);
        } else {
            // If reached, alert the user
            alert('You can only select up to 4 seats.');
        }
    }

    // Check if the selected seat number is between 1 to 4
    const selectedSeatsCount = document.querySelectorAll('.btn.selected').length;
    const nextButton = document.getElementById('nextButton');
    if (selectedSeatsCount >= 1 && selectedSeatsCount <= 4) {
        // Enable the next button if the selected seat number is between 1 to 4
        nextButton.disabled = false;
    } else {
        // Disable the next button if the selected seat number is not between 1 to 4
        nextButton.disabled = true;
    }

    // Update the selected seats table
    updateSelectedSeatsTable();
}

// Function to update the selected seats table
function updateSelectedSeatsTable() {
    const selectedSeatsTableBody = document.getElementById('selectedSeatsTableBody');
    selectedSeatsTableBody.innerHTML = '';

    // Get all selected seats
    const selectedSeats = document.querySelectorAll('.btn.selected');

    // Counter for the seat numbers
    let seatNumber = 1;

    // Iterate through each selected seat and add it to the table
    selectedSeats.forEach(seat => {
        const seatName = seat.textContent;
        const seatClass = 'Economy';
        const seatPrice = 550;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seatNumber}</td>
            <td>${seatName}</td>
            <td>${seatClass}</td>
            <td>${seatPrice}</td>
        `;
        selectedSeatsTableBody.appendChild(row);

        // Increment seat number
        seatNumber++;
    });

    // Update the total price
    updateTotalPrice();
}

// Function to update the total price
function updateTotalPrice() {
    const selectedSeats = document.querySelectorAll('.btn.selected');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    selectedSeats.forEach(seat => {
        totalPrice += 550; // Assuming price per seat is 550 BDT
    });

    totalPriceElement.textContent = totalPrice;
}

// Function to apply coupon
function applyCoupon() {
    const couponCodeInput = document.getElementById('couponCode');
    const discountMessage = document.getElementById('discountMessage');
    const finalPrice = document.getElementById('finalPrice');
    const totalPrice = parseInt(document.getElementById('totalPrice').textContent);
    const couponCode = couponCodeInput.value;

    // Check if the coupon code is valid
    if (couponCode === 'NEW15') {
        // Apply 15% discount
        const discount = (15 / 100) * totalPrice;
        const discountedPrice = totalPrice - discount;

        discountMessage.textContent = 'Coupon applied: 15% off';
        finalPrice.textContent = `Final Price: BDT ${discountedPrice}`;
    } else if (couponCode === 'COUPLE20') {
        // Apply 20% discount
        const discount = (20 / 100) * totalPrice;
        const discountedPrice = totalPrice - discount;

        discountMessage.textContent = 'Coupon applied: 20% off';
        finalPrice.textContent = `Final Price: BDT ${discountedPrice}`;
    } else {
        // Invalid coupon code
        discountMessage.textContent = 'Invalid coupon code';
        finalPrice.textContent = '';
    }
}

// Add event listeners to seat buttons
const seatButtons = document.querySelectorAll('.btn');
seatButtons.forEach(seatButton => {
    seatButton.addEventListener('click', () => {
        handleSeatSelection(seatButton);
    });
});

