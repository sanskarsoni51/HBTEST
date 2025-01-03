// pages/terms-and-conditions.tsx

import Head from "next/head";

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | The Haat Bazaar</title>
        <meta
          name="description"
          content="Terms and Conditions for The Haat Bazaar"
        />
      </Head>

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to The Haat Bazaar. Please read these terms and conditions
            carefully before using our website.
          </p>
        </header>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Acceptance of Terms
            </h2>
            <p className="text-lg text-gray-700">
              By accessing or using our website, you agree to comply with the
              following terms and conditions. If you do not agree, please
              refrain from using our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Account Responsibility
            </h2>
            <p className="text-lg text-gray-700">
              If you create an account on our website, you are responsible for
              maintaining the confidentiality of your login details and account
              activities. You are also responsible for ensuring that all
              information provided is accurate and up-to-date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              3. Payment Terms
            </h2>
            <p className="text-lg text-gray-700">
              All payments made through Razorpay are subject to Razorpay terms
              and conditions. We are not responsible for any payment failures,
              refunds, or issues related to payment processing. Please ensure
              your payment details are correct to avoid delays.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              4. Product Availability
            </h2>
            <p className="text-lg text-gray-700">
              We make every effort to ensure the availability of products.
              However, availability is subject to change without notice. In the
              event that a product becomes unavailable after an order has been
              placed, we will notify you as soon as possible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              5. Intellectual Property
            </h2>
            <p className="text-lg text-gray-700">
              All content on the website, including text, graphics, logos,
              images, and other materials, is owned by The Haat Bazaar or its
              licensors and is protected by intellectual property laws.
              Unauthorized use of this content is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              6. Limitation of Liability
            </h2>
            <p className="text-lg text-gray-700">
              We are not responsible for any direct, indirect, incidental,
              special, or consequential damages arising from the use of our
              website or products. You agree to use the website at your own
              risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              7. Modifications
            </h2>
            <p className="text-lg text-gray-700">
              We reserve the right to modify or update these terms at any time.
              Changes will be effective immediately upon posting. Please review
              these terms periodically to stay informed of any changes.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
