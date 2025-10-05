# Login Credentials

## Hardcoded Login Information

The application now has functional login with hardcoded credentials stored in `src/app/auth.json`.

### Login Details:
- **Email**: `admin@jobzyn.com`
- **Password**: `admin123`

### User Information:
- **Name**: Admin User
- **Role**: Administrator
- **Avatar**: AU

### How it works:
1. The login form validates credentials against the hardcoded values
2. Upon successful login, user data is stored in localStorage
3. The site header displays the authenticated user's information
4. User remains logged in until they explicitly logout

### Files Modified:
- `src/app/auth.json` - Contains hardcoded credentials and user data
- `src/contexts/AuthContext.tsx` - Updated to use hardcoded credentials
- `src/components/site-header.tsx` - Updated to display authenticated user info

### Testing:
1. Navigate to `/sign-in` or click "Login" on the landing page
2. Enter the credentials above
3. Click "Sign in"
4. You should be redirected to the dashboard
5. The site header should show "Admin User" instead of "John Doe"
