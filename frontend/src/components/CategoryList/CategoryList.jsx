import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
    });

    useEffect(() => {
        // Fetch categories when component mounts
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories', error);
            });
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/categories', newCategory)
            .then(response => {
                // Add the newly created category to the state
                setCategories([...categories, response.data]);
                // Reset the form
                setNewCategory({ name: '' });
            })
            .catch(error => {
                console.error('There was an error creating the category!', error);
            });
    };

    return (
        <div>
            <h1>Category List</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id + Math.random()}>{category.name}</li>
                ))}
            </ul>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}

export default CategoryList
