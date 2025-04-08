# Job Finder Frontend

This is the frontend for the Job Finder application, built with React.

## Features

- User authentication (login/register)
- Job posting and searching
- Job applications
- User profiles
- Application tracking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

To start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at http://localhost:3000

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context providers
  ├── services/      # API services
  ├── pages/         # Page components
  ├── utils/         # Utility functions
  ├── App.js         # Main application component
  └── index.js       # Application entry point
```

## Deployment

The frontend is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy your application. 