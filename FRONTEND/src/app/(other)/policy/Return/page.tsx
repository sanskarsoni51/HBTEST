// pages/return-and-cancellation-policy.tsx

import Head from "next/head";

const ReturnAndCancellationPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Return and Cancellation Policy | The Haat Bazaar</title>
        <meta
          name="description"
          content="Return and Cancellation Policy for The Haat Bazaar"
        />
      </Head>

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Return and Cancellation Policy
          </h1>
          <p className="text-lg text-gray-600">
            Please read our return and cancellation policy carefully before
            making any purchase on The Haat Bazaar.
          </p>
        </header>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Return Policy
            </h2>
            <p className="text-lg text-gray-700">
              We offer returns for products that are defective, damaged, or not
              as described. If you receive a product in such condition, you must
              initiate a return request within 7 days of receiving the item.
            </p>
            <p className="text-lg text-gray-700">
              The product must be unused and in its original packaging to be
              eligible for a return. Once the product is successfully picked up,
              we will initiate the refund process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Cancellation Policy
            </h2>
            <p className="text-lg text-gray-700">
              Orders can be canceled before they are shipped. Once the order is
              shipped, we cannot process cancellations.
            </p>
            <p className="text-lg text-gray-700">
              To cancel an order, please contact our support team immediately
              with the order number.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              3. Refund Policy
            </h2>
            <p className="text-lg text-gray-700">
              If you are eligible for a refund after returning a product, please
              note that the refund will be processed within 7 working days after
              the product is successfully picked up.
            </p>
            <p className="text-lg text-gray-700">
              The refund will be credited to the original payment method. Please
              allow additional time for the transaction to reflect in your
              account depending on your bank or payment provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              4. How to Initiate a Return or Cancellation
            </h2>
            <p className="text-lg text-gray-700">
              To initiate a return or cancellation, please contact our customer
              support team via the contact form on our website or email us at
              support@thehaatbazaar.com with the relevant details and order
              number.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              5. Conditions for Return and Cancellation
            </h2>
            <p className="text-lg text-gray-700">
              - The product must be returned in its original condition, unused,
              and in the original packaging.
            </p>
            <p className="text-lg text-gray-700">
              - Returns or cancellations must be requested within 7 days of
              receiving the product.
            </p>
            <p className="text-lg text-gray-700">
              - Any items marked as final sale or non-returnable cannot be
              returned.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReturnAndCancellationPolicy;
