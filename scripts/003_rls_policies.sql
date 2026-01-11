-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_prompt_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_insights ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view own profile data" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Journal entries policies
CREATE POLICY "Users can view own entries" ON journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own entries" ON journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries" ON journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries" ON journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Mood logs policies
CREATE POLICY "Users can view own moods" ON mood_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create mood logs" ON mood_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Prompts are public (all users can view)
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view prompts" ON daily_prompts
  FOR SELECT USING (true);

-- User prompt responses policies
CREATE POLICY "Users can view own responses" ON user_prompt_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create responses" ON user_prompt_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Streaks policies
CREATE POLICY "Users can view own streaks" ON user_streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON user_streaks
  FOR ALL USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insights policies
CREATE POLICY "Users can view own insights" ON user_insights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create insights" ON user_insights
  FOR INSERT WITH CHECK (auth.uid() = user_id);
