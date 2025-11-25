# Firebase Setup Requirements

This document outlines all the Firebase requirements and setup steps for the JPR Infrabuild application.

## 🔥 Firebase Services Used

The application uses the following Firebase services:

1. **Firebase Authentication** - User authentication and authorization
2. **Cloud Firestore** - Database for projects, tasks, and user profiles
3. **Firebase Storage** - Image storage for project photos

---

## 📋 Required Firebase Configuration

You need to provide the following configuration values from your Firebase project:

### Environment Variables (`.env` file)

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**Where to find these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app, click "Add app" and select the web icon `</>`
7. Copy the configuration values from the `firebaseConfig` object

---

## 🗄️ Firestore Database Setup

### Collections Required

The application expects the following Firestore collections:

#### 1. `users` Collection
- **Document ID**: User UID (from Firebase Auth)
- **Fields**:
  - `uid` (string) - User ID
  - `email` (string) - User email
  - `displayName` (string) - User display name
  - `role` (string) - One of: `"admin"`, `"manager"`, `"viewer"`
  - `createdAt` (timestamp) - Creation timestamp
  - `updatedAt` (timestamp) - Last update timestamp

#### 2. `projects` Collection
- **Document ID**: Auto-generated
- **Fields**:
  - `title` (string) - Project title
  - `description` (string) - Project description
  - `location` (string) - Project location
  - `category` (string) - Project category
  - `status` (string) - One of: `"upcoming"`, `"ongoing"`, `"completed"`, `"on-hold"`
  - `area` (string) - Project area
  - `timeline` (string) - Project timeline
  - `images` (array of strings) - Array of image URLs
  - `progress` (number) - Progress percentage (0-100)
  - `createdAt` (timestamp) - Creation timestamp
  - `updatedAt` (timestamp) - Last update timestamp
  - `createdBy` (string) - User ID who created
  - `updatedBy` (string) - User ID who last updated

#### 3. `projects/{projectId}/tasks` Subcollection
- **Document ID**: Auto-generated
- **Fields**:
  - `projectId` (string) - Parent project ID
  - `title` (string) - Task title
  - `description` (string) - Task description
  - `status` (string) - One of: `"pending"`, `"in-progress"`, `"completed"`
  - `priority` (string) - One of: `"low"`, `"medium"`, `"high"`
  - `assignedTo` (string, optional) - User ID assigned to task
  - `notes` (array) - Array of note objects with:
    - `content` (string)
    - `createdAt` (timestamp)
    - `createdBy` (string)
  - `createdAt` (timestamp) - Creation timestamp
  - `updatedAt` (timestamp) - Last update timestamp
  - `completedAt` (timestamp, optional) - Completion timestamp
  - `createdBy` (string) - User ID who created

### Firestore Security Rules

The application includes security rules in `firestore.rules`. Deploy these rules to Firebase:

```bash
firebase deploy --only firestore:rules
```

**Rule Summary:**
- Users can read and create their own profile (for first-time signup)
- Users can update their own profile (but cannot change role)
- Only admins can delete users or modify other users' profiles
- All authenticated users can read projects
- Only managers and admins can create/update projects
- Only admins can delete projects
- All authenticated users can read tasks
- Only managers and admins can create/update/delete tasks
- Public can create contact leads and quotation requests (no auth required)
- Only authenticated admins can read contact leads and quotation requests

---

## 📦 Firebase Storage Setup

### Storage Structure

The application stores project images in the following structure:
```
projects/
  {projectId}/
    {timestamp}_{filename}
```

### Storage Security Rules

The application includes storage rules in `storage.rules`. Deploy these rules to Firebase:

```bash
firebase deploy --only storage
```

**Rule Summary:**
- Authenticated users can read project images
- Only managers and admins can upload/delete images
- Image size limit: 5MB
- Only image files are allowed

---

## 🔐 Authentication Setup

### Authentication Methods

The application uses **Email/Password** and **Google Sign-In** authentication.

**To enable:**
1. Go to Firebase Console
2. Navigate to "Authentication" > "Sign-in method"
3. Enable "Email/Password" provider
4. Enable "Google" provider (optional but recommended)
   - Add your authorized domains (localhost, your production domain)
5. Click "Save"

### Initial Admin User Setup

**Option 1: Self-Registration (Recommended)**
1. Visit `/admin/login` in your application
2. Click the "Sign Up" tab
3. Fill in email, password, and display name
4. Click "Create Admin Account"
5. You'll be automatically signed in and redirected to the dashboard

**Option 2: Manual Setup (Alternative)**
1. **Create user in Firebase Authentication:**
   - Go to "Authentication" > "Users"
   - Click "Add user"
   - Enter email and password
   - Click "Add user"

2. **Create user profile in Firestore:**
   - Go to Firestore Database
   - Navigate to `users` collection
   - Create a document with the user's UID as the document ID
   - Add the following fields:
     ```json
     {
       "uid": "user-uid-here",
       "email": "admin@example.com",
       "displayName": "Admin User",
       "role": "admin",
       "createdAt": [timestamp],
       "updatedAt": [timestamp]
     }
     ```

---

## 🚀 Deployment Steps

### 1. Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Storage
- ✅ Hosting (optional)

### 4. Deploy Security Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage
```

### 5. Update Environment Variables
- Copy `.env.example` to `.env`
- Fill in your actual Firebase credentials

### 6. Test the Application
- Start the development server: `npm run dev`
- Try logging in with your admin credentials
- Verify that you can create projects and upload images

---

## 📝 Important Notes

1. **Dummy Credentials**: The application currently uses dummy credentials. Replace them with your actual Firebase project credentials.

2. **Security Rules**: Make sure to deploy the security rules before using the application in production.

3. **User Roles**: The application supports three roles:
   - `admin` - Full access (create, read, update, delete)
   - `manager` - Can create and update projects/tasks, but cannot delete projects
   - `viewer` - Read-only access

4. **Image Upload**: Project images are limited to 5MB and must be image files only.

5. **Environment Variables**: Never commit your `.env` file to version control. It's already in `.gitignore`.

---

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key in `.env` is correct
   - Make sure the `.env` file is in the root directory

2. **"Permission denied" errors**
   - Verify that security rules are deployed
   - Check that the user has the correct role in Firestore

3. **Images not uploading**
   - Verify Storage rules are deployed
   - Check that the user has manager or admin role
   - Ensure image size is under 5MB

4. **User profile not found**
   - Make sure you've created a user document in Firestore `users` collection
   - Verify the document ID matches the user's UID from Authentication

---

## 📞 Support

If you encounter any issues during setup, please check:
- Firebase Console for error logs
- Browser console for client-side errors
- Firebase documentation: https://firebase.google.com/docs

---

**Last Updated**: January 2025

