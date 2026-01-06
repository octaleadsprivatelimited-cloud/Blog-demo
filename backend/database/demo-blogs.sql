-- Demo Blogs for Health & Cooking Blog
-- Run this SQL script to insert sample blog posts

USE health_cooking_blog;

-- Note: Category IDs are:
-- 1 = Health
-- 2 = Cooking
-- 3 = Nutrition
-- 4 = Diet & Lifestyle

-- Demo Blog 1: Health Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('10 Simple Ways to Boost Your Immune System Naturally', 
'10-simple-ways-to-boost-your-immune-system-naturally',
'<h2>Introduction</h2>
<p>Your immune system is your body\'s defense mechanism against harmful pathogens. While there\'s no magic pill to instantly boost immunity, there are several evidence-based strategies you can incorporate into your daily routine to strengthen your body\'s natural defenses.</p>

<h2>1. Prioritize Quality Sleep</h2>
<p>Sleep is crucial for immune function. Adults should aim for 7-9 hours of quality sleep each night. During sleep, your body produces cytokines, which are essential for fighting infections and inflammation.</p>

<h2>2. Stay Hydrated</h2>
<p>Proper hydration helps your body flush out toxins and supports overall cellular function. Aim for at least 8 glasses of water daily, more if you\'re active or in hot climates.</p>

<h2>3. Eat a Balanced Diet</h2>
<p>Focus on whole foods rich in vitamins and minerals. Include plenty of fruits, vegetables, lean proteins, and whole grains in your diet. Foods like citrus fruits, broccoli, spinach, and garlic are particularly beneficial for immunity.</p>

<h2>4. Exercise Regularly</h2>
<p>Moderate exercise can help boost your immune system. Aim for at least 150 minutes of moderate-intensity exercise per week, such as brisk walking, cycling, or swimming.</p>

<h2>5. Manage Stress Levels</h2>
<p>Chronic stress can weaken your immune system. Practice stress-reduction techniques like meditation, deep breathing, yoga, or spending time in nature.</p>

<h2>6. Limit Alcohol Consumption</h2>
<p>Excessive alcohol can impair immune function. If you drink, do so in moderation—no more than one drink per day for women and two for men.</p>

<h2>7. Don\'t Smoke</h2>
<p>Smoking damages your immune system and makes you more susceptible to infections. If you smoke, consider quitting—it\'s one of the best things you can do for your health.</p>

<h2>8. Get Regular Sunlight</h2>
<p>Sunlight helps your body produce vitamin D, which is crucial for immune function. Aim for 10-15 minutes of sun exposure daily, or consider a vitamin D supplement if you live in areas with limited sunlight.</p>

<h2>9. Maintain a Healthy Weight</h2>
<p>Obesity can impair immune function. Maintain a healthy weight through a balanced diet and regular exercise.</p>

<h2>10. Practice Good Hygiene</h2>
<p>Simple habits like washing your hands regularly, avoiding touching your face, and practicing good oral hygiene can help prevent infections.</p>

<h2>Conclusion</h2>
<p>Boosting your immune system naturally requires consistent effort and lifestyle choices. By incorporating these strategies into your daily routine, you can strengthen your body\'s natural defenses and improve your overall health and well-being.</p>',
1,
'10 Simple Ways to Boost Your Immune System Naturally | Health Tips',
'Discover evidence-based natural strategies to strengthen your immune system and improve your overall health. Learn simple lifestyle changes you can make today.',
'published',
NOW() - INTERVAL 5 DAY);

-- Demo Blog 2: Cooking Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('Healthy Mediterranean Quinoa Bowl Recipe', 
'healthy-mediterranean-quinoa-bowl-recipe',
'<h2>Introduction</h2>
<p>This Mediterranean quinoa bowl is packed with fresh vegetables, healthy fats, and protein. It\'s perfect for a quick lunch or light dinner and takes only 30 minutes to prepare.</p>

<h2>Ingredients</h2>
<ul>
<li>1 cup quinoa, rinsed</li>
<li>2 cups vegetable broth</li>
<li>1 cucumber, diced</li>
<li>2 tomatoes, chopped</li>
<li>1 red bell pepper, diced</li>
<li>1/2 red onion, thinly sliced</li>
<li>1/2 cup kalamata olives, pitted and halved</li>
<li>4 oz feta cheese, crumbled</li>
<li>1/4 cup fresh parsley, chopped</li>
<li>3 tablespoons olive oil</li>
<li>2 tablespoons lemon juice</li>
<li>1 teaspoon dried oregano</li>
<li>Salt and pepper to taste</li>
</ul>

<h2>Instructions</h2>

<h3>Step 1: Cook the Quinoa</h3>
<p>In a medium saucepan, bring the vegetable broth to a boil. Add the quinoa, reduce heat to low, cover, and simmer for 15 minutes or until the liquid is absorbed. Remove from heat and let stand, covered, for 5 minutes. Fluff with a fork and let cool.</p>

<h3>Step 2: Prepare the Vegetables</h3>
<p>While the quinoa is cooking, prepare all your vegetables. Dice the cucumber, chop the tomatoes, dice the bell pepper, and thinly slice the red onion.</p>

<h3>Step 3: Make the Dressing</h3>
<p>In a small bowl, whisk together the olive oil, lemon juice, oregano, salt, and pepper until well combined.</p>

<h3>Step 4: Assemble the Bowl</h3>
<p>Divide the cooked quinoa among four bowls. Top with the prepared vegetables, olives, and feta cheese. Drizzle with the dressing and garnish with fresh parsley.</p>

<h3>Step 5: Serve</h3>
<p>Serve immediately, or store in the refrigerator for up to 3 days. This dish is perfect for meal prep!</p>

<h2>Nutritional Benefits</h2>
<p>This Mediterranean quinoa bowl is rich in protein, fiber, and healthy fats. Quinoa provides complete protein, while the vegetables offer essential vitamins and antioxidants. The olive oil and olives provide heart-healthy monounsaturated fats.</p>

<h2>Variations</h2>
<p>Feel free to customize this recipe! You can add grilled chicken, chickpeas, or avocado. Substitute any vegetables you prefer—artichokes, roasted red peppers, or spinach all work great.</p>

<h2>Conclusion</h2>
<p>This Mediterranean quinoa bowl is a delicious and nutritious meal that comes together quickly. It\'s perfect for busy weeknights or meal prep for the week ahead.</p>',
2,
'Healthy Mediterranean Quinoa Bowl Recipe | Quick & Easy',
'Learn how to make a delicious and healthy Mediterranean quinoa bowl in just 30 minutes. Perfect for meal prep and packed with protein and vegetables.',
'published',
NOW() - INTERVAL 4 DAY);

-- Demo Blog 3: Nutrition Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('Understanding Macronutrients: Protein, Carbs, and Fats Explained', 
'understanding-macronutrients-protein-carbs-fats-explained',
'<h2>What Are Macronutrients?</h2>
<p>Macronutrients are the three main nutrients your body needs in large amounts to function properly: carbohydrates, proteins, and fats. Each plays a crucial role in maintaining your health and supporting your daily activities.</p>

<h2>Protein: The Building Blocks</h2>
<p>Protein is essential for building and repairing tissues, producing enzymes and hormones, and supporting immune function. Every cell in your body contains protein.</p>

<h3>How Much Do You Need?</h3>
<p>The recommended dietary allowance (RDA) for protein is 0.8 grams per kilogram of body weight. However, active individuals may need more—around 1.2-2.0 grams per kilogram.</p>

<h3>Best Sources</h3>
<ul>
<li>Lean meats (chicken, turkey, fish)</li>
<li>Legumes (beans, lentils, chickpeas)</li>
<li>Dairy products (Greek yogurt, cottage cheese)</li>
<li>Eggs</li>
<li>Nuts and seeds</li>
<li>Quinoa and soy products</li>
</ul>

<h2>Carbohydrates: Your Primary Energy Source</h2>
<p>Carbohydrates are your body\'s main source of energy. They\'re broken down into glucose, which fuels your brain and muscles.</p>

<h3>Types of Carbohydrates</h3>
<p><strong>Simple carbs:</strong> Found in fruits, milk, and refined sugars. They provide quick energy but should be consumed in moderation.</p>
<p><strong>Complex carbs:</strong> Found in whole grains, vegetables, and legumes. They provide sustained energy and are rich in fiber.</p>

<h3>How Much Do You Need?</h3>
<p>Carbohydrates should make up 45-65% of your total daily calories. Focus on complex carbohydrates from whole food sources.</p>

<h3>Best Sources</h3>
<ul>
<li>Whole grains (oats, brown rice, quinoa)</li>
<li>Fruits and vegetables</li>
<li>Legumes</li>
<li>Sweet potatoes</li>
</ul>

<h2>Fats: Essential for Health</h2>
<p>Fats are essential for absorbing vitamins, protecting organs, supporting cell growth, and providing energy. Not all fats are created equal.</p>

<h3>Types of Fats</h3>
<p><strong>Unsaturated fats:</strong> Heart-healthy fats found in olive oil, avocados, nuts, and fish. These should make up most of your fat intake.</p>
<p><strong>Saturated fats:</strong> Found in animal products and some plant oils. Should be consumed in moderation.</p>
<p><strong>Trans fats:</strong> Artificial fats that should be avoided as much as possible.</p>

<h3>How Much Do You Need?</h3>
<p>Fats should make up 20-35% of your total daily calories. Focus on healthy unsaturated fats.</p>

<h3>Best Sources</h3>
<ul>
<li>Avocados</li>
<li>Nuts and seeds</li>
<li>Olive oil</li>
<li>Fatty fish (salmon, mackerel)</li>
<li>Nut butters</li>
</ul>

<h2>Balancing Your Macronutrients</h2>
<p>The key to a healthy diet is balance. Rather than eliminating any macronutrient, focus on:</p>
<ul>
<li>Choosing whole food sources</li>
<li>Eating a variety of foods</li>
<li>Paying attention to portion sizes</li>
<li>Listening to your body\'s hunger and fullness cues</li>
</ul>

<h2>Conclusion</h2>
<p>Understanding macronutrients helps you make informed choices about your diet. Remember, there\'s no one-size-fits-all approach—your ideal macronutrient ratio depends on your age, activity level, health goals, and individual needs.</p>',
3,
'Understanding Macronutrients: Protein, Carbs, and Fats Explained',
'Learn about the three macronutrients—protein, carbohydrates, and fats—and how to balance them for optimal health and nutrition.',
'published',
NOW() - INTERVAL 3 DAY);

-- Demo Blog 4: Diet & Lifestyle Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('5 Morning Habits That Will Transform Your Day', 
'5-morning-habits-that-will-transform-your-day',
'<h2>Start Your Day Right</h2>
<p>Your morning routine sets the tone for the entire day. Establishing healthy morning habits can improve your mood, energy levels, productivity, and overall well-being. Here are five science-backed habits to incorporate into your morning routine.</p>

<h2>1. Wake Up at the Same Time Every Day</h2>
<p>Consistency is key when it comes to sleep. Waking up at the same time every day—even on weekends—helps regulate your circadian rhythm, leading to better sleep quality and more restful nights.</p>
<p><strong>Tip:</strong> Set a regular wake-up time and stick to it. Your body will naturally adjust, and you may find you don\'t even need an alarm after a while.</p>

<h2>2. Hydrate First Thing</h2>
<p>After 7-8 hours of sleep, your body is dehydrated. Drinking a glass of water first thing in the morning kickstarts your metabolism, rehydrates your body, and helps flush out toxins.</p>
<p><strong>Tip:</strong> Keep a glass of water by your bedside, or add a slice of lemon for extra flavor and vitamin C.</p>

<h2>3. Move Your Body</h2>
<p>Morning exercise doesn\'t have to be an intense workout. Even 10-15 minutes of movement can boost your energy, improve mood, and enhance mental clarity throughout the day.</p>
<p><strong>Tip:</strong> Try a quick yoga session, a brisk walk, or even just some stretching. Find something you enjoy that fits into your schedule.</p>

<h2>4. Eat a Nutritious Breakfast</h2>
<p>Breakfast truly is the most important meal of the day. A balanced breakfast provides the energy and nutrients your body needs to function optimally and can help prevent overeating later in the day.</p>
<p><strong>Tip:</strong> Aim for a combination of protein, healthy fats, and complex carbohydrates. Think Greek yogurt with berries, eggs with whole-grain toast, or oatmeal with nuts and fruit.</p>

<h2>5. Practice Mindfulness or Meditation</h2>
<p>Starting your day with a few minutes of mindfulness can reduce stress, improve focus, and set a positive tone for the hours ahead. You don\'t need to meditate for an hour—even 5-10 minutes can make a difference.</p>
<p><strong>Tip:</strong> Use a meditation app, practice deep breathing, or simply sit quietly and focus on your breath. Gratitude journaling is another great option.</p>

<h2>Bonus: Limit Technology in the First Hour</h2>
<p>Resist the urge to check your phone or email immediately upon waking. Giving yourself technology-free time in the morning allows you to set your own agenda rather than reacting to others\' demands.</p>

<h2>Making It Stick</h2>
<p>Don\'t try to implement all these habits at once. Start with one or two that resonate with you, and gradually add more as they become second nature. Remember, progress over perfection.</p>

<h2>Conclusion</h2>
<p>Your morning routine is a powerful tool for improving your overall quality of life. By incorporating these simple habits, you\'ll set yourself up for more productive, energetic, and fulfilling days. Start small, be consistent, and watch as these morning habits transform not just your days, but your life.</p>',
4,
'5 Morning Habits That Will Transform Your Day | Lifestyle Tips',
'Discover five simple morning habits that can boost your energy, improve your mood, and set you up for a successful day. Start transforming your mornings today.',
'published',
NOW() - INTERVAL 2 DAY);

-- Demo Blog 5: Health Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('The Benefits of Regular Exercise for Mental Health', 
'the-benefits-of-regular-exercise-for-mental-health',
'<h2>Exercise and Mental Health: The Connection</h2>
<p>While we often focus on the physical benefits of exercise—weight management, strength, and cardiovascular health—regular physical activity has profound effects on mental health and emotional well-being.</p>

<h2>1. Reduces Stress and Anxiety</h2>
<p>Exercise is one of the most effective ways to reduce stress and anxiety. Physical activity increases the production of endorphins—chemicals in the brain that act as natural painkillers and mood elevators.</p>
<p>Regular exercise also helps regulate the stress hormone cortisol, leading to lower baseline stress levels and better stress management throughout the day.</p>

<h2>2. Combats Depression</h2>
<p>Multiple studies have shown that exercise can be as effective as antidepressant medication for mild to moderate depression. Exercise promotes neural growth, reduces inflammation, and creates patterns of activity that calm the brain.</p>
<p>Even moderate exercise, like walking for 30 minutes a day, can make a significant difference in managing depressive symptoms.</p>

<h2>3. Improves Sleep Quality</h2>
<p>Regular physical activity can help you fall asleep faster and enjoy deeper, more restful sleep. Exercise helps regulate your circadian rhythm and reduces anxiety and depression, which can interfere with sleep.</p>
<p>Avoid intense exercise close to bedtime, as it may have the opposite effect. Morning or afternoon workouts are typically best for sleep.</p>

<h2>4. Boosts Self-Esteem and Confidence</h2>
<p>Setting and achieving fitness goals, no matter how small, can significantly boost your self-esteem and confidence. As you get stronger and more capable, you\'ll feel better about yourself and your abilities.</p>
<p>Physical activity also helps you feel better about your appearance, which can improve your overall body image and self-worth.</p>

<h2>5. Enhances Cognitive Function</h2>
<p>Exercise increases blood flow to the brain, which can help improve memory, attention, and problem-solving skills. Regular physical activity has been shown to increase the size of the hippocampus, the part of the brain responsible for memory and learning.</p>
<p>This is particularly important as we age, as exercise can help prevent cognitive decline and reduce the risk of dementia.</p>

<h2>6. Provides Social Connection</h2>
<p>Many forms of exercise involve social interaction, whether it\'s joining a fitness class, playing team sports, or simply walking with a friend. These social connections are crucial for mental health and can help combat feelings of loneliness and isolation.</p>

<h2>7. Serves as a Healthy Coping Mechanism</h2>
<p>Exercise provides a healthy outlet for managing difficult emotions. Instead of turning to unhealthy coping mechanisms, physical activity offers a constructive way to process stress, anger, and frustration.</p>

<h2>How Much Exercise Do You Need?</h2>
<p>The good news is that you don\'t need to become a fitness enthusiast to experience mental health benefits. The recommended amount is:</p>
<ul>
<li><strong>Moderate-intensity exercise:</strong> 150 minutes per week (about 30 minutes, 5 days a week)</li>
<li><strong>Vigorous-intensity exercise:</strong> 75 minutes per week (about 25 minutes, 3 days a week)</li>
</ul>
<p>Even shorter bouts of activity can provide immediate mood benefits.</p>

<h2>Getting Started</h2>
<p>If you\'re new to exercise or haven\'t been active in a while, start slowly. Choose activities you enjoy, and gradually increase the duration and intensity. Remember, any movement is better than none.</p>
<p>Consider activities like:</p>
<ul>
<li>Walking or hiking</li>
<li>Swimming</li>
<li>Dancing</li>
<li>Yoga or tai chi</li>
<li>Cycling</li>
<li>Team sports</li>
</ul>

<h2>Conclusion</h2>
<p>Regular exercise is one of the most powerful tools we have for maintaining and improving mental health. By incorporating physical activity into your routine, you can reduce stress, combat depression, improve sleep, boost confidence, and enhance cognitive function. Start with small steps, and remember that consistency is more important than intensity.</p>',
1,
'The Benefits of Regular Exercise for Mental Health | Wellness',
'Discover how regular exercise can improve your mental health, reduce stress and anxiety, combat depression, and boost overall well-being.',
'published',
NOW() - INTERVAL 1 DAY);

-- Demo Blog 6: Cooking Category
INSERT INTO blogs (title, slug, content, category_id, meta_title, meta_description, status, created_at) VALUES
('Easy Meal Prep Ideas for Busy Weeknights', 
'easy-meal-prep-ideas-for-busy-weeknights',
'<h2>Master the Art of Meal Prep</h2>
<p>Meal prepping is a game-changer for busy individuals and families. By dedicating a few hours on the weekend to prepare meals for the week, you can save time, money, and ensure you\'re eating healthy, home-cooked meals even on your busiest days.</p>

<h2>Why Meal Prep?</h2>
<p>Meal prepping offers numerous benefits:</p>
<ul>
<li><strong>Time savings:</strong> Prepare once, eat multiple times</li>
<li><strong>Cost effective:</strong> Reduces food waste and impulse purchases</li>
<li><strong>Healthier choices:</strong> You control ingredients and portions</li>
<li><strong>Less stress:</strong> No more "what\'s for dinner?" panic</li>
<li><strong>Better nutrition:</strong> Ensures balanced, home-cooked meals</li>
</ul>

<h2>Essential Meal Prep Tips</h2>

<h3>1. Plan Your Meals</h3>
<p>Start by planning your meals for the week. Consider your schedule, dietary preferences, and nutritional needs. Write out a meal plan and create a shopping list to stay organized.</p>

<h3>2. Choose the Right Containers</h3>
<p>Invest in good-quality, leak-proof containers in various sizes. Glass containers are excellent for reheating and don\'t absorb odors or stains. Consider portion-controlled containers to help with serving sizes.</p>

<h3>3. Prep in Stages</h3>
<p>Don\'t try to prep everything at once. Break it down:</p>
<ul>
<li><strong>Day 1:</strong> Wash and chop vegetables</li>
<li><strong>Day 2:</strong> Cook grains and proteins</li>
<li><strong>Day 3:</strong> Assemble meals and store</li>
</ul>

<h2>Easy Meal Prep Ideas</h2>

<h3>Protein-Packed Mason Jar Salads</h3>
<p>Layer your salads in mason jars to keep them fresh. Start with dressing at the bottom, then add hearty vegetables, proteins, and finally delicate greens on top. These stay fresh for up to 5 days.</p>
<p><strong>Suggested combination:</strong> Balsamic vinaigrette, chickpeas, cherry tomatoes, cucumbers, bell peppers, and mixed greens.</p>

<h3>Sheet Pan Dinners</h3>
<p>Sheet pan meals are perfect for meal prep. Simply arrange your protein and vegetables on a baking sheet, season, and roast. Portion into containers for easy reheating.</p>
<p><strong>Try this:</strong> Chicken thighs, sweet potatoes, broccoli, and bell peppers seasoned with olive oil, garlic, and herbs.</p>

<h3>Grain Bowls</h3>
<p>Cook a large batch of quinoa, brown rice, or farro at the beginning of the week. Then create different bowls by adding various proteins, vegetables, and sauces.</p>
<p><strong>Bowls to try:</strong></p>
<ul>
<li>Buddha bowl with roasted vegetables and tahini dressing</li>
<li>Burrito bowl with black beans, corn, and salsa</li>
<li>Mediterranean bowl with hummus and fresh vegetables</li>
</ul>

<h3>Soup and Stew Prep</h3>
<p>Soups and stews are perfect for meal prep—they often taste better the next day! Make a large batch and freeze individual portions for quick, healthy meals.</p>
<p><strong>Great options:</strong> Lentil soup, chicken vegetable soup, chili, or minestrone.</p>

<h3>Freezer-Friendly Breakfasts</h3>
<p>Prepare breakfast items that can be frozen and reheated:</p>
<ul>
<li>Breakfast burritos</li>
<li>Muffins (savory or sweet)</li>
<li>Breakfast sandwiches</li>
<li>Overnight oats (refrigerate, don\'t freeze)</li>
</ul>

<h2>Storage Guidelines</h2>
<p>Proper storage is crucial for food safety and quality:</p>
<ul>
<li><strong>Cooked meat:</strong> 3-4 days in refrigerator</li>
<li><strong>Cooked vegetables:</strong> 3-5 days in refrigerator</li>
<li><strong>Cooked grains:</strong> 4-6 days in refrigerator</li>
<li><strong>Soups and stews:</strong> 3-4 days in refrigerator, up to 3 months frozen</li>
</ul>

<h2>Time-Saving Strategies</h2>
<ul>
<li>Use a slow cooker or Instant Pot for hands-off cooking</li>
<li>Buy pre-cut vegetables when time is limited</li>
<li>Cook double batches and freeze half</li>
<li>Prep ingredients rather than full meals (chopped vegetables, cooked grains)</li>
<li>Use multi-tasking: roast vegetables while cooking grains</li>
</ul>

<h2>Conclusion</h2>
<p>Meal prepping doesn\'t have to be complicated or time-consuming. Start small with just a few meals, and gradually build your meal prep routine. The time and effort you invest will pay off in healthier meals, saved time, and reduced stress throughout your busy week.</p>',
2,
'Easy Meal Prep Ideas for Busy Weeknights | Cooking Tips',
'Learn how to save time and eat healthier with these easy meal prep ideas. Perfect for busy weeknights and meal planning.',
'published',
NOW());

