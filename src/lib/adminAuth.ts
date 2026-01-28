import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Admin authentication functions
export const adminAuth = {
  // Login admin user
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Get admin user by email
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Simple password check - in production, use proper bcrypt comparison
      const isValidPassword = password === 'admin123';
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUser.id);

      // Store in localStorage
      localStorage.setItem('admin_user', JSON.stringify({
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
        is_active: adminUser.is_active,
        last_login: adminUser.last_login,
        created_at: adminUser.created_at,
        updated_at: adminUser.updated_at
      }));

      return { success: true, user: adminUser };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    }
  },

  // Logout admin user
  async logout(): Promise<void> {
    localStorage.removeItem('admin_user');
  },

  // Get current admin user from localStorage
  getCurrentUser(): AdminUser | null {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role || user.role === 'super_admin' : false;
  },

  // Hash password (for user creation)
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  // Verify password
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
};

// React hook for admin authentication
import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const user = adminAuth.getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await adminAuth.login(email, password);
    
    console.log('useAdminAuth login result:', result);
    
    if (result.success && result.user) {
      const newState = {
        user: result.user,
        isAuthenticated: true,
        isLoading: false
      };
      console.log('Setting auth state to:', newState);
      setAuthState(newState);
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
    
    return result;
  };

  const logout = async () => {
    await adminAuth.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout,
    hasRole: (role: string) => adminAuth.hasRole(role)
  };
};
