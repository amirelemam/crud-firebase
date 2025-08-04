# API Documentation

## Base URL

- Local: `http://localhost:5001/{project-name}/{gcp-region}/api`
- Production: `https://{gcp-region}-{project-name}.cloudfunctions.net/api`

## Endpoints

### Create User

- **POST** `/api/users`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "zipCode": "10001"
  }
  ```
- **Required:** `name`, `zipCode` (5-digit US zip code)
- **Response:** User object with auto-generated `id`, `lat`, `lon`, and `timezone`

### Get All Users

- **GET** `/api/users`
- Returns all users in the database

### Get Single User

- **GET** `/api/users/:id`
- Returns user by ID

### Update User

- **PUT** `/api/users/:id`
- **Body:** Same as create, but all fields are optional
- **Note:** If `zipCode` is updated, location data will be re-fetched

### Delete User

- **DELETE** `/api/users/:id`
- Deletes user by ID

## Data Model

Each user in the database has the following structure:

```json
{
  "id": "auto-generated-id",
  "name": "John Doe",
  "zipCode": "10001",
  "lat": 40.7505,
  "lon": -73.9965,
  "timezone": -18000
}
```

## Example Usage

### Using curl

```bash
# Create a user
curl -X POST http://localhost:5001/{project-name}/{gcp-region}/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "zipCode": "10001"}'

# Get all users
curl http://localhost:5001/{project-name}/{gcp-region}/api/users

# Get specific user
curl http://localhost:5001/{project-name}/{gcp-region}/api/users/USER_ID

# Update a user
curl -X PUT http://localhost:5001/{project-name}/{gcp-region}/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "zipCode": "90210"}'

# Delete a user
curl -X DELETE http://localhost:5001/{project-name}/{gcp-region}/api/users/USER_ID
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input data (e.g., invalid zip code format)
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server-side errors

## Rate Limiting

The API implements rate limiting to prevent abuse. Please respect the rate limits when making requests.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for web applications.
