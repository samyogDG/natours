import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { showAlert } from "./alerts";

// Load Stripe once and reuse
const stripePromise = loadStripe(
  "pk_test_51RNU0tQ7PBKToUeDwKdcWwGLD187t19b6BdOGGFoO5mBl2phYpQuO5om6p2ny6OQbBivtgf5aCeQuPYkAkvi1Xpm00KzbMaG2V"
);

export const bookTour = async (tourId) => {
  try {
    console.log(tourId)
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Load Stripe (ensures it's loaded properly)
    const stripe = await stripePromise;

    // 3) Redirect to Stripe Checkout
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
   
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
