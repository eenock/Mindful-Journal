-- Seed initial daily prompts
INSERT INTO daily_prompts (prompt_text, category, difficulty) VALUES
  ('What brought you joy today, no matter how small?', 'gratitude', 'easy'),
  ('Describe a challenge you faced today and how you handled it.', 'reflection', 'medium'),
  ('What are you grateful for right now?', 'gratitude', 'easy'),
  ('If you could tell your past self something, what would it be?', 'reflection', 'deep'),
  ('What does self-care mean to you today?', 'wellness', 'medium'),
  ('Write about a person who made a positive impact on your life.', 'relationships', 'medium'),
  ('What are you learning about yourself lately?', 'self-discovery', 'deep'),
  ('Describe your ideal day from start to finish.', 'vision', 'medium'),
  ('What emotions did you experience today and why?', 'emotional-awareness', 'medium'),
  ('What would you do if you knew you could not fail?', 'dreams', 'deep'),
  ('List three things that made you smile this week.', 'gratitude', 'easy'),
  ('How do you want to grow in the next month?', 'growth', 'medium'),
  ('What boundaries do you need to set for your wellbeing?', 'wellness', 'deep'),
  ('Describe a moment when you felt truly at peace.', 'mindfulness', 'medium'),
  ('What are you proud of accomplishing recently?', 'achievement', 'easy')
ON CONFLICT DO NOTHING;
