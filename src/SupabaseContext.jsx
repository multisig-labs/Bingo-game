import { createContext, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabaseClient] = useState(supabase);

  return (
    <SupabaseContext.Provider value={{ supabaseClient }}>
      {children}
    </SupabaseContext.Provider>
  );
};
