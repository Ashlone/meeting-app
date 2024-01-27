# Meeting API Documentation

This document outlines the RESTful APIs for the Resolution Action System, with a focus on meeting-related operations. The system has been developed using Express with TypeScript and a PostgreSQL database with Prisma.
Live server url running on render is https://meeting-app-server.onrender.com

## Clone the repository from GitHub

```
git clone https://github.com/Ashlone/meeting-app.git

```

## Navigate to the backend directory:
```
cd backend

```

## Install the dependencies using npm or yarn:
```
npm install
```

## Set up the environment variables:
Create a .env file and configure the necessary environment variables for your local setup.

```
PORT = YOUR SERVER PORT NUMBER
DATABASE_URL = postgres://meeting_app_db_1vz2_user:oAFChbnINOSbdrxueHt3dUscSTzkO22R@dpg-cmqi37g21fec739mco2g-a.oregon-postgres.render.com/meeting_app_db_1vz2 

```

## Run prisma migrations
```
npm run prisma migrate dev

```

## Start the server
```
npm run dev

```

## To run tests with jest
```
npm run test

```

## Create New Meeting

### Request

- **Method:** POST
- **Endpoint:** `/api/meetings`
- **Description:** Creates a new meeting.
- **Request Body:**
  ```json
   {
    "meetingType": "MANCO",
    "meetingDate": "2024-01-24T10:00:00",
    "meetingTime": "2024-01-24T10:00:00",
    "carriedForwardItems": [1, 2, 3]
  }

### Response
- **Status Code:** 200
- **Body:**

```json
{
  "meetingId": "abc123",
  "meetingType": "MANCO",
  "meetingNumber": 1,
  "meetingDate": "2024-01-24T10:00:00",
  "meetingTime": "2024-01-24T10:00:00",
  "meetingItems": [
    {
      "id": 1,
      "description": "Update project timeline",
      "dueDate": "2024-01-31",
    },
    {
      "id": 2,
      "description": "Review budget for Q1",
      "dueDate": "2024-02-15",
    },
    {
      "id": 2,
      "description": "Report on marketing campaign",
      "dueDate": "2024-02-28",
    }
  ],
  "carriedForwardItems": [
    {
      "id": 1,
      "description": "Update project timeline",
      "dueDate": "2024-01-31",
    },
  ]
}
```

## Get Meeting Items from Previous Meeting

### Request

- **Method:** GET
- **Endpoint:** `/api/meetings/:meetingType/previous-items`
- **Description:** Retrieves a list of all Meeting Items from the previous meeting of the specified Meeting Type.

### Response

- **Status Code:** 200
- **Body:**
  ```json
  {
    "meetingType": "MANCO",
    "meetingItems": [
      {
        "id": "abc123",
        "description": "Update project timeline",
        "dueDate": "2024-01-31",
      },
      {
        "id": "def456",
        "description": "Review budget for Q1",
        "dueDate": "2024-02-15",
      },
    ]
  }


## Add New Meeting Item

### Request

- **Method:** POST
- **Endpoint:** `/api/meetings/:meetingId/items`
- **Description:** Adds a new Meeting Item to the specified meeting.
- **Request Body:**
  ```json
  {
    "description": "Discuss marketing strategy",
    "dueDate": "2024-03-15",
  }


### Response
- **Status Code:** 200
- **Body:**

```json
{
  "id": "ghi789",
  "description": "Discuss marketing strategy",
  "dueDate": "2024-03-15",
}
```
## Update Meeting Item Status

### Request

- **Method:** PUT
- **Endpoint:** `/api/meetings/items/:meetingItemId/status`
- **Description:** Updates the status of a specific meeting item.
- **Request Body:**

```json
  {
    "status": "In Development",
    "action_required": "New APis will be developed"
  }

```

### Response
- **Status Code:** 200
- **Body:**

```json
{
  "id": 101,
  "description": "Update project timeline",
  "status": "In Development",
  "action_required": "New APis will be developed"
}
```

## Get Meeting Item Status

### Request

- **Method:** GET
- **Endpoint:** `/api/meetings/items/:meetingItemId`
- **Description:** Retrieves a single meeting item status

### Response
- **Status Code:** 200
- **Body:**

```json
{
  "id": 101,
  "description": "Update project timeline",
  "status": "In Development",
  "action_required": "New APis will be developed"
}
```

