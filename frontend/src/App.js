import './App.css';
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './containers/Navbar/Navbar';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import CategoryList from './components/CategoryList/CategoryList';
import Profile from './containers/Profile/Profile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);  // Track authenticated user

  // Check if user is authenticated on component mount
  useEffect(() => {
    axios.get('/api/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);  // Set the authenticated user
        console.log('User:', response.data);
      })
      .catch(() => {
        setUser(null);  // If not authenticated, set user to null
        console.log('No user');
      });
  }, []);  // Run only once on component mount

  return (
    <div className="App">
      {/* <Navbar /> */}

      {/* If the user is authenticated, show profile and other components */}
      {user ? (
        <>
          <Profile user={user} setUser={setUser} /> {/* Pass user and setUser */}
          <CategoryList />
          <RecipeList />
        </>
      ) : (
        // If the user is not authenticated, show login and register forms
        <AuthContainer setUser={setUser} />
      )}
    </div>
  );
}

export default App;
