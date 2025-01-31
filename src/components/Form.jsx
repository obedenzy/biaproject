import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    const Form = () => {
      const [formData, setFormData] = useState({
        fullName: '',
        cityGroup: '',
        hydrationGoals: '',
        dietNutrition: '',
        studyRead: '',
        dailyProgressPhoto: '',
        mindfulnessPractice: '',
        abstinence: '',
        connectionNetworking: '',
        consistency: '',
      });
      const [participants, setParticipants] = useState([]);
      const [formSubmitted, setFormSubmitted] = useState(false);

      useEffect(() => {
        const fetchParticipants = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/participants');
            setParticipants(response.data);
          } catch (error) {
            console.error('Error fetching participants:', error);
          }
        };

        fetchParticipants();
      }, []);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/form', formData);
          console.log('Form submitted successfully:', response.data);
          setFormData({
            fullName: '',
            cityGroup: '',
            hydrationGoals: '',
            dietNutrition: '',
            studyRead: '',
            dailyProgressPhoto: '',
            mindfulnessPractice: '',
            abstinence: '',
            connectionNetworking: '',
            consistency: '',
          });
          setFormSubmitted(true); // Show confirmation message
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

      return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Select Full Name *
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            >
              <option value="">Select Full Name</option>
              {participants.map((participant) => (
                <option key={participant.full_name} value={participant.full_name}>
                  {participant.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityGroup">
              Select Your "Home" City Group *
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cityGroup"
              name="cityGroup"
              value={formData.cityGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select City Group</option>
              <option value="Atlanta, GA">Atlanta, GA</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Baltimore/DC">Baltimore/DC</option>
              <option value="Boston (New England)">Boston (New England)</option>
              <option value="Chicago, IL">Chicago, IL</option>
              <option value="Cincinnati, OH">Cincinnati, OH</option>
              <option value="Cleveland, OH">Cleveland, OH</option>
              <option value="Columbus, OH">Columbus, OH</option>
              <option value="Conneticut / West Mass.">Conneticut / West Mass.</option>
              <option value="Dallas/Ft. Worth">Dallas/Ft. Worth</option>
              <option value="Denver, CO">Denver, CO</option>
              <option value="Detroit, MI">Detroit, MI</option>
              <option value="Fort Myers/Cape Coral, FL">Fort Myers/Cape Coral, FL</option>
              <option value="Honolulu, HI">Honolulu, HI</option>
              <option value="Houston, TX">Houston, TX</option>
              <option value="Hunstville, AL">Hunstville, AL</option>
              <option value="Indianapolis, IN">Indianapolis, IN</option>
              <option value="Jacksonville, FL">Jacksonville, FL</option>
              <option value="Kansas City, MO">Kansas City, MO</option>
              <option value="Las Vegas, NV">Las Vegas, NV</option>
              <option value="Lexington, KY">Lexington, KY</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Miami/West Palm Beach, FL">Miami/West Palm Beach, FL</option>
              <option value="Milwaukee, WI">Milwaukee, WI</option>
              <option value="Nashville, TN">Nashville, TN</option>
              <option value="New York City, NY">New York City, NY</option>
              <option value="North Carolina">North Carolina</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Orlando, FL">Orlando, FL</option>
              <option value="Philadelphia, PA">Philadelphia, PA</option>
              <option value="Phoenix, AZ">Phoenix, AZ</option>
              <option value="Pittsburgh, PA">Pittsburgh, PA</option>
              <option value="Richmond, VA">Richmond, VA</option>
              <option value="San Antonio, TX">San Antonio, TX</option>
              <option value="San Diego, CA">San Diego, CA</option>
              <option value="San Francisco/San Jose, CA">San Francisco/San Jose, CA</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="South Carolina">South Carolina</option>
              <option value="St. Louis, MO">St. Louis, MO</option>
              <option value="Tampa, FL">Tampa, FL</option>
              <option value="West Virginia">West Virginia</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Hydration Goals</p>
            <p className="text-gray-600 text-sm mb-2">Drink half your body weight in ounces of water daily to refresh and rejuvenate.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="hydrationGoals"
                  value="yes"
                  checked={formData.hydrationGoals === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="hydrationGoals"
                  value="no"
                  checked={formData.hydrationGoals === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Diet & Nutrition</p>
            <p className="text-gray-600 text-sm mb-2">Stick to a balanced diet with no cheat meals for 30 days. Discipline is your power.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="dietNutrition"
                  value="yes"
                  checked={formData.dietNutrition === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="dietNutrition"
                  value="no"
                  checked={formData.dietNutrition === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Study & Read</p>
            <p className="text-gray-600 text-sm mb-2">30 minutes of BRRRR Invest Academy studies + 10 pages of personal growth or real estate reading daily.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="studyRead"
                  value="yes"
                  checked={formData.studyRead === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="studyRead"
                  value="no"
                  checked={formData.studyRead === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Daily Progress Photo</p>
            <p className="text-gray-600 text-sm mb-2">Capture your transformation to inspire yourself and others.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="dailyProgressPhoto"
                  value="yes"
                  checked={formData.dailyProgressPhoto === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="dailyProgressPhoto"
                  value="no"
                  checked={formData.dailyProgressPhoto === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Mindfulness Practice</p>
            <p className="text-gray-600 text-sm mb-2">10 minutes of meditation, journaling, or breathing exercises to center your mind.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="mindfulnessPractice"
                  value="yes"
                  checked={formData.mindfulnessPractice === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="mindfulnessPractice"
                  value="no"
                  checked={formData.mindfulnessPractice === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Abstinence</p>
            <p className="text-gray-600 text-sm mb-2">No alcohol or recreational drugs to clear the path for peak performance.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="abstinence"
                  value="yes"
                  checked={formData.abstinence === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="abstinence"
                  value="no"
                  checked={formData.abstinence === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Connection & Networking</p>
            <p className="text-gray-600 text-sm mb-2">Engage with your accountability partner to stay motivated and build meaningful connections.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="connectionNetworking"
                  value="yes"
                  checked={formData.connectionNetworking === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="connectionNetworking"
                  value="no"
                  checked={formData.connectionNetworking === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Consistency</p>
            <p className="text-gray-600 text-sm mb-2">Show up every single day, from Day 1 to Day 30, and hold yourself accountable.</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="consistency"
                  value="yes"
                  checked={formData.consistency === 'yes'}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="consistency"
                  value="no"
                  checked={formData.consistency === 'no'}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>

          {formSubmitted && (
            <p className="text-green-600 mt-4">Thank you for joining the challenge!</p>
          )}
        </form>
      );
    };

    export default Form;
