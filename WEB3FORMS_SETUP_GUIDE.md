# Web3Forms Email Setup Guide

## Step-by-Step Instructions to Connect Your Email

### Step 1: Create/Login to Web3Forms Account

1. Go to **https://web3forms.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up using:
   - Your email: `jprinfraworks123@gmail.com`
   - Or use any email to create the account
4. Verify your email address if required

### Step 2: Get Your Access Key

1. After logging in, go to **Dashboard**
2. You'll see your **Access Keys** section
3. Either:
   - **Use existing key**: `bdc4e2d1-a62d-47a4-af0c-4df059e8252b` (if it exists)
   - **Create new key**: Click "Create New Access Key"

### Step 3: Configure Access Key Settings

1. Click on your access key to edit settings
2. Set the following:
   - **Recipient Email**: `jprinfraworks123@gmail.com`
   - **Email Subject**: (optional) "New Contact Form Submission"
   - **Enable Auto-Reply**: Yes (optional, sends confirmation to sender)
   - **Spam Protection**: Enable (recommended)

### Step 4: Verify Access Key is Active

1. Make sure the access key status shows **"Active"**
2. Check that the recipient email is correctly set
3. Save all settings

### Step 5: Test the Connection

1. Go to your website contact form
2. Fill out and submit a test message
3. Check your email inbox: `jprinfraworks123@gmail.com`
4. **Important**: Also check **Spam/Junk folder** - emails might land there initially

### Step 6: Verify in Browser Console

1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Submit the form
4. Look for logs:
   - "Submitting form to Web3Forms..."
   - "Recipient email: jprinfraworks123@gmail.com"
   - "Web3Forms response: {success: true, ...}"
   - "Email sent successfully! Message ID: ..."

## Troubleshooting

### If emails are not received:

1. **Check Spam Folder**: Gmail often filters new senders to spam
2. **Verify Access Key**: Make sure it's active in Web3Forms dashboard
3. **Check Recipient Email**: Ensure it's set correctly in access key settings
4. **Check Console Errors**: Look for error messages in browser console
5. **Verify Access Key**: The key in code must match the one in dashboard
6. **Rate Limits**: Free tier has limits - check if you've exceeded them

### Common Issues:

- **"Invalid Access Key"**: Key doesn't exist or is incorrect
- **"Rate Limit Exceeded"**: Too many submissions - wait or upgrade
- **"Email not configured"**: Recipient email not set in access key settings
- **Emails in Spam**: Mark as "Not Spam" to train Gmail

## Alternative: Update Access Key in Code

If you create a NEW access key, update it in the code:

**File**: `src/pages/Contact.tsx`  
**Line**: ~33  
**Change**: 
```typescript
formDataToSend.append("access_key", "YOUR_NEW_ACCESS_KEY_HERE");
```

## Current Configuration

- **Access Key**: `bdc4e2d1-a62d-47a4-af0c-4df059e8252b`
- **Recipient Email**: `jprinfraworks123@gmail.com`
- **API Endpoint**: `https://api.web3forms.com/submit`

## Web3Forms Free Tier Limits

- 250 submissions per month (free tier)
- Unlimited submissions (paid plans)
- No credit card required for free tier

## Need Help?

1. Check Web3Forms documentation: https://docs.web3forms.com
2. Contact Web3Forms support if access key issues persist
3. Verify your email address is correct: `jprinfraworks123@gmail.com`

