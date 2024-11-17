import { useState } from "react";

export default function RazorpayPayment() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Fetch order_id from backend
            const res = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 500, currency: "INR" }), // Example amount
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            const { order } = data;

            // Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Your Company Name",
                description: "Test Transaction",
                image: "/your-logo.png", // Optional
                order_id: order.id,
                handler: function (response) {
                    // Handle success
                    alert(`Payment successful: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Your address here",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error.message);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}
