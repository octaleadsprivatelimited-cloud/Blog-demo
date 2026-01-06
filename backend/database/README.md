# Database Scripts

## Setup

1. **Initial Setup** - Run `schema.sql` first to create the database, tables, and default data
2. **Demo Data** - Run `demo-blogs.sql` to add sample blog posts

## Running the Scripts

### Using MySQL Command Line:
```bash
mysql -u root -p health_cooking_blog < backend/database/schema.sql
mysql -u root -p health_cooking_blog < backend/database/demo-blogs.sql
```

### Using MySQL Workbench or phpMyAdmin:
1. Open the SQL file
2. Select the `health_cooking_blog` database
3. Execute the script

## Demo Blogs Included

The demo-blogs.sql file includes 6 sample blog posts:

1. **Health Category:**
   - "10 Simple Ways to Boost Your Immune System Naturally"
   - "The Benefits of Regular Exercise for Mental Health"

2. **Cooking Category:**
   - "Healthy Mediterranean Quinoa Bowl Recipe"
   - "Easy Meal Prep Ideas for Busy Weeknights"

3. **Nutrition Category:**
   - "Understanding Macronutrients: Protein, Carbs, and Fats Explained"

4. **Diet & Lifestyle Category:**
   - "5 Morning Habits That Will Transform Your Day"

All demo blogs are set to "published" status and will be visible on the website immediately after running the script.

