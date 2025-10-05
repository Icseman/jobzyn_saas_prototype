# Jobzyn Final

A modern ReactJS application with sign up and sign in pages, built with TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Sign Up Page**: Complete registration form with company details, personal information, and social login options
- **Sign In Page**: Clean login form with email/password authentication and social login
- **Dark/Light Theme**: Toggle between dark and light modes with persistent theme selection
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Modern UI Components**: Built with Radix UI primitives and styled with TailwindCSS

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Jobzyn_final
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, Label)
│   ├── LoginForm.tsx   # Login form component
│   └── SignUpForm.tsx  # Sign up form component
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── LoginPage.tsx   # Login page
│   └── SignUpPage.tsx # Sign up page
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Features Overview

### Sign Up Page
- Company name field
- First and last name fields
- Email and phone number
- "How did you hear about us?" dropdown
- Password field with validation hint
- Terms and conditions checkbox
- Social login buttons (Google, LinkedIn)
- Dark/light theme toggle

### Sign In Page
- Email and password fields
- Remember me checkbox
- Forgot password link
- Social login buttons (Google, LinkedIn)
- Link to sign up page
- Dark/light theme toggle

### Theme System
- Automatic theme detection based on system preference
- Manual theme toggle
- Persistent theme selection in localStorage
- Smooth transitions between themes

## Customization

### Colors
The color scheme can be customized in `src/index.css` by modifying the CSS custom properties:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other colors */
}
```

### Components
All UI components are built with Radix UI primitives and can be customized by modifying the TailwindCSS classes in the component files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
