# X User Region Finder

A web application that searches for X (Twitter) users and displays their region information, bio, follower count, and verification status.

## Features

- 🔍 **User Search**: Search any public X user by username
- 🌍 **Region Detection**: Automatically extracts region from user location
- 👤 **User Info**: Displays name, bio, follower count, and verification status
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **X-themed UI**: Beautiful interface matching X's design language
- ⚡ **Fast & Lightweight**: Quick API calls with smooth animations

## Information Displayed

- **Name**: User's display name
- **Username**: X handle
- **Region**: Extracted from location field
- **Location**: Full location string
- **Bio**: User's bio/description
- **Followers**: Total follower count (formatted)
- **Verified**: Verification badge status
- **Avatar**: User's profile picture

## Setup Instructions

### 1. Get X API Access

1. Go to [X Developer Portal](https://developer.twitter.com/)
2. Sign up or log in with your account
3. Create a new app
4. Generate API keys and tokens:
   - API Key
   - API Secret Key
   - Bearer Token (for OAuth 2.0)

### 2. Create Environment Variables

For local development, create a `.env` file in the root directory:

```
X_BEARER_TOKEN=your_bearer_token_here
```

For Netlify deployment, add the environment variable in your Netlify site settings:
- Go to Site settings → Build & deploy → Environment
- Add `X_BEARER_TOKEN` with your Bearer Token value

### 3. Install Dependencies (Local Development)

```bash
npm install
npm start
```

## Project Structure

```
userfetch/
├── index.html                          # Frontend HTML
├── styles.css                          # Styling
├── script.js                           # Frontend JavaScript
├── netlify/
│   └── functions/
│       └── search-user.js              # Serverless function for X API
├── .env.example                        # Example environment variables
├── package.json                        # Dependencies
└── README.md                           # Documentation
```

## Deployment to Netlify

### Automatic Deployment (Recommended)

1. Push this repository to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Add environment variable in Site settings:
   - Key: `X_BEARER_TOKEN`
   - Value: Your X API Bearer Token
6. Click "Deploy site"

Netlify will automatically:
- Build your site
- Deploy the serverless functions
- Connect everything together

### Manual Testing Locally

```bash
# Install dependencies
npm install

# Install Netlify CLI
npm install -g netlify-cli

# Run locally with functions
netlify dev
```

Visit `http://localhost:8888` to test

## API Integration

This project uses the **X API v2** to:
- Search for users by username
- Retrieve user profile information
- Extract location and region data

### Backend Endpoint

**GET** `/.netlify/functions/search-user?username=<username>`

Returns user data including:
- name
- username
- location
- bio
- profile_image_url
- public_metrics (followers_count)
- verified

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Rate Limiting

X API has rate limits:
- User Lookup: 900 requests per 15 minutes
- Consider implementing caching for repeated searches

## Privacy

This app only fetches publicly available X profile information. No private data is collected or stored.

## License

MIT License - Feel free to use this for any purpose.

## Troubleshooting

**"User not found"** 
- Make sure the username is correct
- Make sure the account is public
- X API might be rate limited (try again in a few minutes)

**"API Error"** 
- Check that your Bearer Token is valid
- Verify the token has the correct permissions
- Check Netlify environment variables are set correctly

**"CORS Error"** 
- This should not happen when deployed to Netlify
- For local development, use `netlify dev` instead of direct HTTP

## Support

For issues with the X API, visit [X Developer Portal](https://developer.twitter.com/)
