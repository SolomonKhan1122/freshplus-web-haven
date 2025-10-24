# FreshPlus Admin Portal

A comprehensive admin portal for managing bookings, quotes, and customer communications for FreshPlus Cleaning Services.

## Features

### 🔐 Admin Authentication
- Secure login system with role-based access control
- Protected routes that require authentication
- Session management with local storage
- Default admin credentials provided for initial setup

### 📊 Dashboard Overview
- Real-time statistics and metrics
- Quick action buttons for common tasks
- Recent activity feed
- Revenue tracking and estimates

### 📅 Booking Management
- View all customer bookings in a sortable table
- Filter bookings by status (pending, confirmed, in-progress, completed, cancelled)
- Search functionality across all booking fields
- Detailed booking view with customer information
- Update booking status and add admin notes
- Assign staff members to bookings
- Direct email and phone contact with customers
- Delete bookings with confirmation

### 💰 Quote Management
- Manage quote requests from the quote form
- Track quote status (pending, contacted, quoted, accepted, completed, cancelled)
- Set quote amounts and track revenue
- Send professional quote emails to customers
- Assign quotes to staff members
- Add internal admin notes
- Full customer and service details view

### 📧 Contact Message Management
- View all contact form submissions
- Mark messages as read/unread
- Reply to customer inquiries directly from the admin panel
- Track message status (unread, read, replied, archived)
- Search through all messages
- Add internal notes for team collaboration

## Database Schema

### Admin Users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Enhanced Bookings Table
- Added `status` field for tracking booking progress
- Added `admin_notes` for internal team communication
- Added `assigned_to` for staff assignment

### Enhanced Quotes Table
- Added `status` field for quote management
- Added `quote_amount` for revenue tracking
- Added `admin_notes` for internal notes
- Added `assigned_to` for staff assignment

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  admin_notes TEXT,
  replied_by TEXT,
  reply_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Getting Started

### 1. Database Setup
The admin portal requires several database tables. These have been automatically created via Supabase migrations:
- `admin_users` - For admin authentication
- Enhanced `bookings` table with admin fields
- Enhanced `quotes` table with admin fields  
- `contact_messages` - For contact form submissions

### 2. Default Admin Account
A default admin account has been created:
- **Email:** admin@freshplus.com.au
- **Password:** admin123
- **Role:** super_admin

**⚠️ IMPORTANT:** Change these credentials immediately after first login for security.

### 3. Accessing the Admin Portal
Navigate to `/admin` or `/admin/login` to access the admin portal.

### 4. Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with overview
- `/admin/bookings` - Booking management
- `/admin/quotes` - Quote management  
- `/admin/contacts` - Contact message management

## Security Features

### Authentication
- Secure password hashing with bcrypt
- Session-based authentication
- Protected routes with role checking
- Automatic logout on invalid sessions

### Role-Based Access Control
- **admin** - Standard admin access to all features
- **super_admin** - Full administrative access (can create other admins)

### Data Protection
- Row Level Security (RLS) enabled on admin tables
- Admin-only access to sensitive customer data
- Input validation and sanitization
- CSRF protection through form validation

## Admin Features

### Dashboard
- **Statistics Cards:** Quick overview of bookings, quotes, contacts, and revenue
- **Recent Activity:** Latest customer interactions
- **Quick Actions:** Direct links to pending items

### Booking Management
- **Status Tracking:** pending → confirmed → in_progress → completed
- **Staff Assignment:** Assign bookings to specific team members
- **Customer Communication:** Direct email/phone contact
- **Notes System:** Internal communication and job details

### Quote Management
- **Quote Pipeline:** Track from request to completion
- **Revenue Tracking:** Set and monitor quote amounts
- **Email Integration:** Send professional quotes directly
- **Service Details:** Full breakdown of requested services

### Contact Management
- **Message Status:** Track read/unread/replied status
- **Reply System:** Compose and send replies directly
- **Search & Filter:** Find specific messages quickly
- **Archive System:** Organize old messages

## Technical Stack

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Lucide React** icons

### Backend
- **Supabase** for database and real-time features
- **PostgreSQL** database
- **Row Level Security** for data protection

### Authentication
- **bcryptjs** for password hashing
- **Local Storage** for session management
- **Protected Routes** component for access control

## Deployment Notes

### Environment Variables
The admin portal uses the same Supabase configuration as the main application. Ensure these are set:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Security Considerations
1. **Change Default Credentials:** Immediately update the default admin password
2. **HTTPS Required:** Always use HTTPS in production
3. **Regular Backups:** Implement database backup strategy
4. **Access Logs:** Monitor admin access and activities
5. **Password Policy:** Enforce strong password requirements

## Support and Maintenance

### Regular Tasks
- Monitor dashboard for pending items
- Respond to customer inquiries promptly
- Update booking and quote statuses
- Review and archive old contact messages
- Check system performance and security

### Troubleshooting
- Check browser console for JavaScript errors
- Verify Supabase connection and permissions
- Ensure database tables exist and have correct schema
- Validate admin user credentials and permissions

## Future Enhancements

### Planned Features
- Email template management
- Advanced reporting and analytics
- Customer management system
- Staff scheduling and management
- Mobile-responsive improvements
- Real-time notifications
- Export functionality for reports

### Integration Opportunities
- Payment processing integration
- Calendar synchronization
- SMS notifications
- Customer portal
- Inventory management
- Service scheduling automation

---

## Support

For technical support or questions about the admin portal:
- Check the browser console for error messages
- Verify database connections and permissions
- Review the SUPABASE_SETUP.md file for database configuration
- Contact the development team for assistance

**Remember:** This admin portal gives you complete access to all customer data and business operations. Use responsibly and maintain security best practices.
