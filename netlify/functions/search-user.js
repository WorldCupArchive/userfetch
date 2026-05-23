exports.handler = async (event) => {
    const username = event.queryStringParameters?.username;

    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Username parameter is required' }),
        };
    }

    const bearerToken = process.env.X_BEARER_TOKEN;

    if (!bearerToken) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'API token not configured' }),
        };
    }

    try {
        // First, get the user by username
        const userResponse = await fetch(
            `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=created_at,description,location,profile_image_url,verified,public_metrics`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    'User-Agent': 'XUserFinder/1.0',
                },
            }
        );

        if (!userResponse.ok) {
            if (userResponse.status === 404) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'User not found' }),
                };
            }
            throw new Error(`Twitter API error: ${userResponse.status}`);
        }

        const data = await userResponse.json();

        if (!data.data) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        const user = data.data;

        return {
            statusCode: 200,
            body: JSON.stringify({
                name: user.name,
                username: user.username,
                bio: user.description,
                location: user.location,
                verified: user.verified,
                profile_image_url: user.profile_image_url,
                public_metrics: user.public_metrics,
            }),
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'Failed to fetch user data. Please try again later.' 
            }),
        };
    }
};
