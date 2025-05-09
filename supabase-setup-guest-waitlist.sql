-- Create guest_waitlist table
CREATE TABLE IF NOT EXISTS public.guest_waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'joined')),
    invited_at TIMESTAMP WITH TIME ZONE,
    joined_at TIMESTAMP WITH TIME ZONE
);

-- Comments for easier understanding
COMMENT ON TABLE public.guest_waitlist IS 'Table to store users who sign up for the guest app waitlist';
COMMENT ON COLUMN public.guest_waitlist.email IS 'Email address of the user';
COMMENT ON COLUMN public.guest_waitlist.signed_up_at IS 'Timestamp when the user signed up for the waitlist';
COMMENT ON COLUMN public.guest_waitlist.status IS 'Current status of the waitlist entry: pending, invited, or joined';
COMMENT ON COLUMN public.guest_waitlist.invited_at IS 'Timestamp when the user was invited to join the app';
COMMENT ON COLUMN public.guest_waitlist.joined_at IS 'Timestamp when the user joined the app';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS guest_waitlist_email_idx ON public.guest_waitlist (email);
CREATE INDEX IF NOT EXISTS guest_waitlist_status_idx ON public.guest_waitlist (status);

-- Set up RLS (Row Level Security) policies
ALTER TABLE public.guest_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert from client
CREATE POLICY "Allow public to insert their own email" 
ON public.guest_waitlist FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- Only allow service role to read/update/delete
CREATE POLICY "Allow service role to manage all records" 
ON public.guest_waitlist 
USING (auth.role() = 'service_role');

-- Add to realtime publication if using realtime features
ALTER PUBLICATION supabase_realtime ADD TABLE public.guest_waitlist; 