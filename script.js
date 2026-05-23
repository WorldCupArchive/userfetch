// Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const retryBtn = document.getElementById('retryBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');

// Event listeners
searchBtn.addEventListener('click', searchUser);
resetBtn.addEventListener('click', clearResults);
retryBtn.addEventListener('click', searchUser);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchUser();
    }
});

async function searchUser() {
    const username = searchInput.value.trim();
    
    if (!username) {
        showError('Please enter an X username');
        return;
    }

    // Show loading state
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    error.classList.add('hidden');
    searchBtn.disabled = true;

    try {
        // Fetch user data from X API v2
        const response = await fetch(
            `/.netlify/functions/search-user?username=${encodeURIComponent(username)}`
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();

        // Display results
        displayResults(data);
        loading.classList.add('hidden');
        result.classList.remove('hidden');

    } catch (err) {
        console.error('Error:', err);
        showError(err.message || 'Unable to find user. Please check the username and try again.');
        loading.classList.add('hidden');
    } finally {
        searchBtn.disabled = false;
    }
}

function displayResults(data) {
    document.getElementById('userName').textContent = data.name || '-';
    document.getElementById('userHandle').textContent = `@${data.username}` || '-';
    document.getElementById('name').textContent = data.name || '-';
    document.getElementById('region').textContent = extractRegion(data.location) || 'Not specified';
    document.getElementById('location').textContent = data.location || '-';
    document.getElementById('bio').textContent = data.bio || '-';
    document.getElementById('followers').textContent = formatNumber(data.public_metrics?.followers_count || 0);
    document.getElementById('verified').textContent = data.verified ? '✓ Yes' : 'No';
    
    if (data.profile_image_url) {
        document.getElementById('userAvatar').src = data.profile_image_url;
    }
}

function extractRegion(location) {
    if (!location) return null;
    
    // Try to extract region from location string
    // Format is usually "City, State/Country" or "City, Country"
    const parts = location.split(',').map(p => p.trim());
    
    if (parts.length >= 2) {
        return parts[parts.length - 1]; // Return the last part (usually country/state)
    }
    
    return location;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function clearResults() {
    searchInput.value = '';
    result.classList.add('hidden');
    error.classList.add('hidden');
    loading.classList.add('hidden');
    searchInput.focus();
}
