import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './containers/Navbar/Navbar';
import Profile from './containers/Profile/Profile';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import MenuContainer from './containers/MenuContainer/MenuContainer';
import axios from 'axios';
import Recipes from './containers/Recipes/Recipes';

function App() {
    const [user, setUser] = useState(null);  // Track authenticated user
    const [section, setSection] = useState('recipes');  // Track current section

    // Check if user is authenticated on component mount
    useEffect(() => {
        axios.get('/api/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);  // Set the authenticated user
            })
            .catch(() => {
                setUser(null);  // If not authenticated, set user to null
            });
    }, []);

    const renderSection = () => {
        switch (section) {
            case 'recipes':
                return <Recipes />;
            case 'menus':
                return <MenuContainer user={user} />;
            case 'profile':
                return <Profile user={user} setUser={setUser} />;
            default:
                return <Recipes />;
        }
    };

    return (
        <div className="App">
            {user ? (
                <>
                    {/* Render the current section */}
                    {renderSection()}

                    {/* Navbar for section navigation */}
                    <Navbar setSection={setSection} />
                </>
            ) : (
                // If the user is not authenticated, show the login/register form
                <AuthContainer setUser={setUser} />
            )}
        </div>
    );
}

export default App;
