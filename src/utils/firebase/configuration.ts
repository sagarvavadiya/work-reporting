import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ovexndvocxgwjtfuklxw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZXhuZHZvY3hnd2p0ZnVrbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NjUxMjcsImV4cCI6MjA1NDI0MTEyN30.twXz2lZDHyJPMQt_BoQOvZH2XesBkhwMITuk95JS9Is";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
