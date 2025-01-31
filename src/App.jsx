import React, { useState, useEffect } from 'react';
    import Form from './components/Form';

    function App() {
      const [currentDateTime, setCurrentDateTime] = useState('');

      useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'America/New_York', // Eastern Time
          };
          const formattedDateTime = now.toLocaleString('en-US', options);
          setCurrentDateTime(formattedDateTime + " (Eastern Time)");
        };

        updateDateTime(); // Update on component mount
        const intervalId = setInterval(updateDateTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Clean up on unmount
      }, []);

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center mb-8 md:text-5xl">BIA GROWTH MINDSET TRANSFORMATIONAL CHALLENGE 2.0</h1>

          {/* Image Section Panel */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <img
              src="https://i.ibb.co/d2xY9kQ/BIA-GROWTH-MINDSET-TRANSFORMATIONAL-CHALLENGE.jpg"
              alt="BIA Growth Mindset Transformational Challenge 2.0"
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Text Section Panel */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 md:text-3xl">Kickstart February 2025 with Purpose: Detox, Cleanse, and Propel Yourself!</h2>
            <p className="text-gray-700 mb-4">
              BRRRR Invest Academy invites you to elevate your journey and ignite transformational growth with Transformational Challenge 2.0. February is your month to detox and cleanse yourself—to purify your mind and body, your temple, and build a strong foundation for your future success in real estate investing through the BRRRR method. Are you ready to commit?
            </p>
            <p className="text-gray-700 font-bold mb-2">Here’s What You’ll Conquer Over the Next 30 Days:</p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Daily Workouts:</strong> Commit to 30 minutes of exercise every day to energize your body.</li>
              <li><strong>Hydration Goals:</strong> Drink half your body weight in ounces of water daily to cleanse and rejuvenate.</li>
              <li><strong>Diet & Nutrition:</strong> Follow a balanced diet that aligns with your health goals—no cheat meals for 90 days. This discipline fuels your journey.</li>
              <li><strong>Study & Read:</strong> Dedicate 30 minutes to BRRRR Invest Academy studies and read 10 pages of self-improvement or real estate books daily to expand your mind.</li>
              <li><strong>Daily Progress Photo:</strong> Document your transformation daily to keep yourself inspired.</li>
              <li><strong>Mindfulness Practice:</strong> Spend 10 minutes in meditation, journaling, or breathing exercises to align your inner self with your goals.</li>
              <li><strong>Abstinence:</strong> Commit to no alcohol or recreational drugs, clearing the path for peak performance.</li>
              <li><strong>Connection & Networking:</strong> Engage with your accountability partner to build meaningful connections and stay motivated.</li>
              <li><strong>Consistency:</strong> Show up every day and hold yourself accountable from Day 1 to Day 30.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>Why Join?</strong><br />
              This month isn’t just a challenge—it’s your clean slate, your time to propel yourself into greatness. By detoxing and cleansing your mind and body, you’re laying a foundation of discipline, focus, and clarity that will supercharge your BRRRR investing journey.
            </p>
            <p className="text-gray-700">
              Your mind and body are your temple. Care for them, strengthen them, and unlock the power to achieve your goals.
            </p>
            <p className="text-gray-700 mt-4">
              Are you ready to cleanse, build, and thrive? Join us in making February the month that transforms your future. The time to start is now!
            </p>
          </div>

          {/* Form */}
          <div className="mb-8">
            <p className="text-red-600 font-bold text-center text-lg">{currentDateTime}</p>
          </div>
          <Form />
        </div>
      );
    }

    export default App;
