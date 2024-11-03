# Meal Planner

Welcome to Meal Planner! This web application allows users to manage and organize recipes, generate weekly menus, and plan meals efficiently. Designed for easy use, Meal Planner helps you keep track of your favorite dishes and organize them into customized menus for each week.

🌐 **[Live Demo](https://mealplanner.vincentguilbault.com/)**

## Features

- **User Authentication**: Secure user login and registration to keep your data private.
- **Recipe Management**: Add, edit, and delete recipes with details such as preparation time, category, and external links.
- **Weekly Menu Generator**: Automatically generate a weekly menu based on your saved recipes.
- **Recipe Categorization**: Organize recipes by category to make it easy to plan balanced and varied meals.
- **Reroll Feature**: Change a single day’s recipe in your weekly menu without affecting the others.
- **Responsive Design**: Optimized for both mobile and desktop, with a seamless and user-friendly interface.

## Installation

To run this project locally, follow these steps:

1. Clone this repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate into the project directory:

    ```bash
    cd meal-planner
    ```

3. Install dependencies for both backend and frontend:

    ```bash
    composer install         # For Laravel (backend)
    npm install              # For React (frontend)
    ```

4. Set up the `.env` file:
   - Copy `.env.example` to `.env` and update the necessary environment variables, especially the database settings and `APP_URL`.
   - Generate the Laravel app key:

     ```bash
     php artisan key:generate
     ```

5. Run the migrations to create the database tables:

    ```bash
    php artisan migrate
    ```

6. Build the frontend:

    ```bash
    npm run build
    ```

7. Start the Laravel server:

    ```bash
    php artisan serve
    ```

## Usage

Once installed, you can:

- **Sign Up** to create an account.
- **Add Categories** to organize your recipes.
- **Create Recipes** with details like preparation time, category, and an optional external link.
- **Generate a Weekly Menu** based on your recipes and enjoy automated meal planning.
- **Edit or Delete** recipes and categories as you manage your collection.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Laravel
- **Database**: MySQL
- **Deployment**: Hostinger

---

Visit the live application here: [Meal Planner](https://mealplanner.vincentguilbault.com/)
