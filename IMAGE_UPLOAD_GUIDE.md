# Image Upload & Firestore Schema Guide

## Overview
The image upload system has been completely redesigned to be **much faster** and more flexible. Images are now stored as **Base64-encoded data directly in Firestore** instead of Firebase Storage, eliminating network delays.

## Key Improvements

### 1. **Faster Image Uploads**
- **No external storage needed**: Images stored as Base64 directly in Firestore
- **Instant processing**: No wait for Firebase Storage upload confirmation
- **Parallel compression**: Multiple images processed simultaneously
- **Reduced file sizes**: Automatic compression (75% JPEG quality, max 1200px)

### 2. **Multiple Upload Methods**
The new ImageUpload component supports:

#### Upload Tab
- Drag & drop multiple images
- Click to select files button
- Real-time validation

#### Image URL Tab
- Paste URLs from web sources
- Perfect for using images from existing websites
- URL validation before adding

#### Paste Tab
- Copy images from clipboard
- Paste directly into the form
- Great for screenshots

### 3. **Firestore Schema Updates**

New project document structure:
```json
{
  "name": "string",                // Internal project name
  "title": "string",               // Public project title
  "description": "string",         // Project description
  "location": "string",            // Project location
  "category": "string",            // Category (Residential, Commercial, etc.)
  "status": "string",              // Status (upcoming, ongoing, completed, on-hold)
  "area": "string",                // Area in text format
  "squareFeet": "number",          // Area in square feet (numeric)
  "timeline": "string",            // Timeline description
  "progress": "number",            // Progress percentage (0-100)
  "percentage": "number",          // Percentage (synced with progress)
  "images": ["string"],            // Array of Base64-encoded images
  "createdAt": "timestamp",        // Creation timestamp
  "updatedAt": "timestamp",        // Last update timestamp
  "createdBy": "string",           // User ID who created
  "updatedBy": "string"            // User ID who last updated
}
```

## How to Use

### Creating/Editing Projects

1. **Access Admin Dashboard**
   - Navigate to `/admin/projects/new` to create a new project
   - Or go to `/admin/projects/{projectId}/edit` to edit existing

2. **Fill Basic Information**
   - Project Name (optional, internal reference)
   - Project Title (required, public facing)
   - Description (required)
   - Location (required)
   - Category (required)
   - Status (required)
   - Area in square feet
   - Timeline
   - Progress percentage

3. **Add Images**
   - **Method 1**: Drag & drop images into the upload area
   - **Method 2**: Click "Select Files" button to choose files
   - **Method 3**: Switch to "Image URL" tab and paste image URLs
   - **Method 4**: Copy images and switch to "Paste" tab to paste directly

4. **Remove Images**
   - Hover over any image in the grid
   - Click the X button to remove

5. **Save Project**
   - Click "Create Project" or "Update Project" button
   - Project is saved to Firestore with all images

## Database Considerations

### Image Storage in Firestore
- **Base64 encoding**: Images are encoded as strings
- **Firestore limits**: 
  - Document size limit: 1MB
  - With 10 images max, keep individual images under 80-100KB
  - Recommended: Keep images under 50KB each (achieved with compression)

### Size Optimization
- All images are automatically:
  - Resized to max 1200px (width or height)
  - Compressed to 75% JPEG quality
  - Encoded as Base64 strings

### Performance Tips
1. **Use multiple images**: Up to 10 images per project
2. **Monitor file sizes**: Keep total document < 1MB
3. **Cache management**: Images displayed via Base64 (cached by browser)
4. **Fast loading**: No external server requests for images

## Firestore Rules
The existing Firestore rules remain the same, allowing:
- ✅ Managers and admins to create/update projects
- ✅ All authenticated users to read projects
- ✅ Admins to delete projects

## Migration (If needed)

If you have existing projects with Firebase Storage images:
1. Existing image URLs will continue to work
2. New images must use Base64 encoding
3. To migrate: Edit project → Remove old images → Add new ones

## Technical Details

### ImageUpload Component Props
```typescript
interface ImageUploadProps {
  existingImages?: string[];        // Already uploaded images
  onImagesChange: (images: string[]) => void;  // Callback when images change
  maxImages?: number;               // Max images allowed (default 10)
}
```

### Supported Image Formats
- PNG, JPG, JPEG, GIF, WebP
- Maximum 10MB per file (before compression)
- Automatically compressed and optimized

## Troubleshooting

### Images not appearing
- Check Firestore document size (should be < 1MB)
- Verify images are valid Base64 strings
- Check browser console for errors

### Upload failing
- Ensure valid image format (PNG, JPG, GIF, WebP)
- Check file size doesn't exceed 10MB
- Verify Firestore write permissions

### Slow performance
- Reduce number of images per project
- Use URL method for external images
- Consider compression quality settings

## Firestore Example Document

```
Collection: projects
Document: project_12345

{
  name: "Residential Complex A",
  title: "Luxury Residential Complex",
  description: "A 20-unit luxury residential complex with modern amenities",
  location: "Bangalore, Karnataka",
  category: "Residential",
  status: "ongoing",
  area: "15000",
  squareFeet: 15000,
  timeline: "18 Months (Jan 2024 - Jun 2025)",
  progress: 45,
  percentage: 45,
  images: [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA..."
  ],
  createdAt: Timestamp(2024-11-26),
  updatedAt: Timestamp(2024-11-26),
  createdBy: "user_123",
  updatedBy: "user_123"
}
```

---

**Note**: All images are stored as Base64-encoded strings for instant access and no external dependencies!
