import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: September 29, 2025
          </p>
        </header>

        {/* Content Container */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8">
          
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing or using the HydraShop services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and all additional terms and policies referenced herein. If you do not agree to these terms, you must not use our services.
            </p>
          </section>

          {/* 2. User Obligations */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              2. User Account and Obligations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You must be at least 18 years old or be supervised by a parent/guardian to use our services.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong className="font-semibold">Account Information:</strong> You are solely responsible for ensuring that all information you provide is accurate and current.</li>
              <li><strong className="font-semibold">Security:</strong> You are responsible for maintaining the security of your account and for all activities that occur under your account.</li>
              <li><strong className="font-semibold">Prohibited Use:</strong> Using the platform for any illegal or unauthorized purpose is strictly prohibited.</li>
            </ul>
          </section>

          {/* 3. Conditions of Sale */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              3. Conditions of Sale and Payments
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Prices for our products and services are subject to change without notice. It is your responsibility to confirm the total amount and applicable taxes before placing your order.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-gray-100 dark:border-gray-700">
              4. Intellectual Property Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All content, design, logos, text, and graphics on the Site are the property of HydraShop and are protected by international copyright laws. Unauthorized use is prohibited.
            </p>
          </section>
          
          {/* Contact Information */}
          <footer className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Contact Us
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:terms@hydrashop.com" className="text-indigo-600 hover:underline">terms@hydrashop.com</a>.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Terms;