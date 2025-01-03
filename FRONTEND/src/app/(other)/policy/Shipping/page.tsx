import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Shipping Policy</h1>
        <p className="text-lg text-gray-600">
          Please read our shipping policy carefully to understand our practices
          regarding shipping and delivery of products.
        </p>
      </header>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Standard Shipping
          </h2>
          <p className="text-lg text-gray-700">
            It usually takes{" "}
            <span className="font-medium">5-7 business days</span> for the
            products to reach our customers. All orders will be dispatched from
            our warehouse within
            <span className="font-medium"> 2 business days</span>. In peak
            periods, please allow up to
            <span className="font-medium"> 4 business days</span> for dispatch.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Tracking Information
          </h2>
          <p className="text-lg text-gray-700">
            Once your order is dispatched, you will receive a notification on
            your
            <span className="font-medium">
              {" "}
              registered phone number or email
            </span>
            . The notification will include a
            <span className="font-medium"> tracking number</span> and a tracking
            link.
          </p>
          <p className="text-lg text-gray-700">
            We have tie-ups with more than{" "}
            <span className="font-medium">Multiple courier partners</span>{" "}
            across India. If you have any preference for a specific courier
            partner, kindly reach out to us, and we will ship your order using
            your preferred partner.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Customer Support
          </h2>
          <p className="text-lg text-gray-700">
            For any issues or inquiries regarding shipping, please contact our
            customer support team at
            <span className="font-medium"> support@thehaatbazaar.com</span> or
            call us at <span className="font-medium">+91-9887279510</span>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
