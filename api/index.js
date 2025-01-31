    require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const { createClient } = require('@supabase/supabase-js');
    const app = express();
    const port = process.env.PORT || 3001;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    app.use(cors());
    app.use(express.json());

    // Helper function to get the start date of the week (Sunday)
    function getStartOfWeek(date) {
      const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
      const diff = date.getDate() - day; // Difference between current day and Sunday
      const startOfWeek = new Date(date);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
      return startOfWeek;
    }

    // Helper function to get the end date of the week (Saturday)
    function getEndOfWeek(date) {
      const startOfWeek = getStartOfWeek(date);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to Saturday
      endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day
      return endOfWeek;
    }

    // Endpoint to fetch participant names
    app.get('/api/participants', async (req, res) => {
      const { data, error } = await supabase
        .from('participants')
        .select('full_name');

      if (error) {
        console.error('Error fetching participants:', error);
        return res.status(500).json({ message: 'Error fetching participants', error });
      }

      console.log('Participants fetched successfully:', data);
      res.status(200).json(data);
    });

    app.post('/api/form', async (req, res) => {
      const formData = req.body;

      // Calculate week start and end dates on the server
      const now = new Date();
      const weekStartDate = getStartOfWeek(now);
      const weekEndDate = getEndOfWeek(now);

      // Map form data to table columns
      const mappedData = {
        full_name: formData.fullName,
        city_group: formData.cityGroup,
        hydration_goals: formData.hydrationGoals,
        diet_nutrition: formData.dietNutrition,
        study_read: formData.studyRead,
        daily_progress_photo: formData.dailyProgressPhoto,
        mindfulness_practice: formData.mindfulnessPractice,
        abstinence: formData.abstinence,
        connection_networking: formData.connectionNetworking,
        consistency: formData.consistency,
      };

      try {
        // Check if a record exists for the full name in the current week
        const { data: existingRecords, error: existingError } = await supabase
          .from('biaformtable')
          .select()
          .eq('full_name', formData.fullName)
          .gte('created_at', weekStartDate.toISOString())
          .lte('created_at', weekEndDate.toISOString());

        if (existingError) {
          console.error('Error checking for existing records:', existingError);
          return res.status(500).json({ message: 'Error checking for existing records', error: existingError });
        }

        if (existingRecords && existingRecords.length > 0) {
          // Update existing record (take the first one if there are multiple)
          const existingRecord = existingRecords[0];
          const { data, error } = await supabase
            .from('biaformtable')
            .update(mappedData)
            .eq('id', existingRecord.id);

          if (error) {
            console.error('Error updating record:', error);
            return res.status(500).json({ message: 'Error updating record', error });
          }

          console.log('Record updated successfully:', data);
          res.status(200).json({ message: 'Form data updated successfully', data });
        } else {
          // Insert new record
          const { data, error } = await supabase
            .from('biaformtable')
            .insert([mappedData]);

          if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Error inserting data', error });
          }

          console.log('Data inserted successfully:', data);
          res.status(200).json({ message: 'Form data received and stored successfully', data });
        }
      } catch (error) {
        console.error('Error processing form submission:', error);
        return res.status(500).json({ message: 'Error processing form submission', error });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
