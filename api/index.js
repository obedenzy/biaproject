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

    // Endpoint to fetch participant names (already exists from previous response)
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

      // Map form data to table columns
      const mappedData = {
        full_name: formData.fullName, // Add full name mapping
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

      const { data, error } = await supabase
        .from('biaformtable')
        .insert([mappedData]);

      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Error inserting data', error });
      }

      console.log('Data inserted successfully:', data);
      res.status(200).json({ message: 'Form data received and stored successfully', data });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
