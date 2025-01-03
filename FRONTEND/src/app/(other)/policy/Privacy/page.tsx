// pages/policy/Privacy.tsx

import Head from "next/head";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Haat Bazaar</title>
        <meta name="description" content="Privacy Policy for The Haat Bazaar" />
      </Head>

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Please read our privacy policy carefully before using The Haat
            Bazaar website.
          </p>
        </header>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Collection of Personally Identifiable Information
            </h2>
            <p className="text-lg text-gray-700">
              We collect personally identifiable information (email address,
              name, phone number, etc.) from you when you set up an account with
              The Haat Bazaar. While you can browse some sections of our site
              without being a registered member, certain sections do require
              registration. We use your contact information to send you offers
              based on your previous orders and your interests.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Use of Demographic and Profile Data
            </h2>
            <p className="text-lg text-gray-700">
              We use personal information to provide the services you request
              and resolve disputes; troubleshoot problems; help promote a safe
              service; and as otherwise described. We collect and analyze
              demographic data about users activities on our website to improve
              our offerings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Cookies</h2>
            <p className="text-lg text-gray-700">
              A cookie is a small piece of information stored by a Web server on
              a Web browser. Cookies help the browser remember information
              specific to a user. You can disable cookies in your browser
              settings, but it may impact your website experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Sharing of Personal Information
            </h2>
            <p className="text-lg text-gray-700">
              We may share personal information with affiliates to help detect
              fraud, prevent illegal acts, or as required by law. Information
              may also be shared in case of business mergers or acquisitions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Links to Other Sites
            </h2>
            <p className="text-lg text-gray-700">
              Our site links to other websites that may collect your personal
              information. The Haat Bazaar is not responsible for the privacy
              practices of those websites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Security Precautions
            </h2>
            <p className="text-lg text-gray-700">
              We adhere to strict security guidelines to protect the information
              under our control. Our secure servers ensure your data is safe
              from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Choice/Opt-Out
            </h2>
            <p className="text-lg text-gray-700">
              You can opt-out of receiving promotional communications by
              emailing your request to support@thehaatbazaar.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Advertising
            </h2>
            <p className="text-lg text-gray-700">
              We use third-party services to display ads. These services may
              collect anonymous data about your visits to our site. No
              personally identifiable information is shared.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
