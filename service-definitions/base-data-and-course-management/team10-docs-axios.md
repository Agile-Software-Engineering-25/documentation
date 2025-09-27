# Documentation: Authenticated Axios for API Requests

## What it does
Creates an Axios instance that **automatically** adds your authentication token to every request. (see https://axios-http.com/docs/intro)

## How to use it

```typescript
import useAuthenticatedAxiosInstance from '@hooks/useAuthenticatedAxiosInstance';

function MyComponent() {
  // Get the authenticated instance
  const axios = useAuthenticatedAxiosInstance();
  
  // Use it like regular axios - authentication happens automatically
  const fetchData = async () => {
    try {
      const response = await axios.get('/endpoint');
      return response.data;
    } catch (error) {
      // handle request errors  
    }
  };
}
```

## Common authentication errors

| Error | What it means | Possible actions
|---|---|---
| 401 Unauthorized | User isn't logged in or token expired | redirect to login page
| 403 Forbidden | User doesn't have permission | show no permission message and redirect back

## Features

- Works just like regular Axios
- Automatically adds "Authorization: Bearer [token]" header
- Uses the backend URL as default 
- Updates when your authentication changes
