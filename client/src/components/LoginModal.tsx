import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export function LoginModal({ isOpen, onClose, redirectTo }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Sign in to continue</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="mt-4">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#3b82f6',
                    brandAccent: '#2563eb',
                    inputBackground: '#1f2937',
                    inputText: '#f3f4f6',
                    inputBorder: '#374151',
                    inputBorderHover: '#4b5563',
                    inputBorderFocus: '#3b82f6',
                    inputPlaceholder: '#9ca3af',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
              style: {
                button: {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontWeight: '500',
                },
                anchor: {
                  color: '#3b82f6',
                },
                label: {
                  color: '#d1d5db',
                },
                message: {
                  color: '#ef4444',
                },
              },
            }}
            providers={['google']}
            redirectTo={redirectTo || window.location.origin}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Password',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your password',
                  button_label: 'Sign up',
                  loading_button_label: 'Signing up...',
                  social_provider_text: 'Sign up with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                },
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}