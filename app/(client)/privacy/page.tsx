import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: September 29, 2025
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to HydraShop. We are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding this information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We collect information in several ways when you use our services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong className="font-semibold">Personal Data:</strong> Name, email address, shipping address, and phone number provided during registration or checkout.</li>
              <li><strong className="font-semibold">Payment Data:</strong> Payment card details (processed securely by third-party providers) and billing address.</li>
              <li><strong className="font-semibold">Usage Data:</strong> Information about how you access and use the service, such as your IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>To provide and maintain our Service, including processing transactions and delivering products.</li>
              <li>To notify you about changes to our Service.</li>
              <li>To provide customer support and respond to inquiries.</li>
              <li>To monitor the usage of our Service and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              4. Your Data Protection Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You have the right to access, update, or request deletion of your Personal Data. If you wish to exercise any of those rights, please contact us at the email below.
            </p>
          </section>

          <footer className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Contact Us
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              If you have any questions about this Privacy Policy, please email us at <a href="mailto:privacy@hydrashop.com" className="text-indigo-600 hover:underline">privacy@hydrashop.com</a>.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Privacy;