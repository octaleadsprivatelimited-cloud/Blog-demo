# How to Add Demo Blogs

I've created a SQL file with 6 demo blog posts for your website. Here are the ways to add them:

## Method 1: Using MySQL Command Line (Recommended)

1. Open your terminal/command prompt
2. Navigate to the project directory
3. Run this command:

```bash
mysql -u root -p health_cooking_blog < backend/database/demo-blogs.sql
```

Enter your MySQL password when prompted.

## Method 2: Using MySQL Workbench or phpMyAdmin

1. Open MySQL Workbench or phpMyAdmin
2. Select the `health_cooking_blog` database
3. Open the file: `backend/database/demo-blogs.sql`
4. Copy and paste the contents into the SQL editor
5. Click "Execute" or "Run"

## Method 3: Direct MySQL Command

1. Connect to MySQL:
```bash
mysql -u root -p
```

2. Select the database:
```sql
USE health_cooking_blog;
```

3. Copy and paste the contents of `backend/database/demo-blogs.sql` and execute

## What You'll Get

After running the script, you'll have **6 published demo blog posts**:

1. **10 Simple Ways to Boost Your Immune System Naturally** (Health)
2. **Healthy Mediterranean Quinoa Bowl Recipe** (Cooking)
3. **Understanding Macronutrients: Protein, Carbs, and Fats Explained** (Nutrition)
4. **5 Morning Habits That Will Transform Your Day** (Diet & Lifestyle)
5. **The Benefits of Regular Exercise for Mental Health** (Health)
6. **Easy Meal Prep Ideas for Busy Weeknights** (Cooking)

All blogs are set to "published" status and will appear on your website immediately!

## Verify

After running the script, visit:
- Homepage: http://localhost:3000
- Blog List: http://localhost:3000/blogs

You should see the demo blogs displayed.

