# Baytree Centre Mentor Portal App

`A companion app for Baytree Centre mentors`

The Baytree Centre Mentor Portal is an application created for mentors to manage all of their needs involving their assigned mentee(s). Here, they can view their session history, clock in/out of sessions, complete monthly questionnaires, access Baytree Centre resources, and receive notifications from Baytree admins.

## Frontend

The project repository is split into frontend and backend sections. The root directory houses the frontend while the backend code is nested inside a dedicated `backend` sub folder.

### Directory Structure

```
...
├── public/                   static, public assets
├── src/
│   ├── apps/                 components for the main pages of the application
│   ├── assets/
│   │   └── fonts/            font files
│   │   └── icons/            icon SVG files
│   │   └── images/           images used throughout the application, like logo and empty state graphics
│   ├── components/           reusable components
│   │   └── form/             components specifically used for building out forms
│   ├── stylesheets/
│   │   └── apps/             styles for page components
│   │   └── components/       styles for components
│   │   └── util/             various utility classes for general things like colours, typography, etc.
│   ├── util/                 various utility variables and functions for things like date manipulation, etc.
...

```

### Run and Build Directions

For first time cloners, install all dependencies (listed in `package.json`)

```
npm i
```

To run the application locally

```
npm run start
```

To build the application for deployment

```
npm run build
```

## Backend
