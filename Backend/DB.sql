CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  status BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO tasks (title, description, priority, category, due_date, username, completed, updated_at)
VALUES 
('Prepare Quarterly Report', 'Compile all financial data and create a comprehensive report for the last quarter. Ensure all figures are accurate and the report is ready for the management meeting.', 'Urgent', 'Work', '2024-08-01', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Plan Family Reunion', 'Organize the annual family reunion. Coordinate with relatives, book a venue, and arrange for catering services. Make sure to consider dietary restrictions and preferences.', 'High', 'Family', '2024-08-02', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Buy Groceries', 'Create a detailed shopping list and purchase all necessary items for the week. Include fresh produce, dairy products, and household essentials.', 'Low', 'Misc', '2024-08-03', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Project Kickoff Meeting', 'Schedule and prepare for the project kickoff meeting. Outline the project goals, timeline, and deliverables. Ensure all team members are informed and ready.', 'Urgent', 'Work', '2024-08-04', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Family Vacation Planning', 'Research and plan the upcoming family vacation. Choose a destination, book flights and accommodations, and create an itinerary for activities.', 'High', 'Family', '2024-08-05', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Organize Garage Sale', 'Sort through items in the garage and identify things to sell. Advertise the garage sale locally and prepare the items for display.', 'Low', 'Misc', '2024-08-06', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Client Presentation Preparation', 'Create and polish the presentation for the upcoming client meeting. Ensure all slides are accurate, visually appealing, and align with the client’s requirements.', 'Urgent', 'Work', '2024-08-07', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Prepare Holiday Cards', 'Design and write holiday cards for family and friends. Make sure to include a personal message in each card and send them out in time for the holidays.', 'High', 'Family', '2024-08-08', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Renew Driver’s License', 'Check the expiration date of your driver’s license and gather the necessary documents. Visit the local DMV to renew your license before it expires.', 'Low', 'Misc', '2024-08-09', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Annual Performance Review', 'Prepare the performance review documentation for your team. Schedule one-on-one meetings with each team member to discuss their performance and set goals for the next year.', 'Urgent', 'Work', '2024-08-10', 'premium@example.com', false, CURRENT_TIMESTAMP);


INSERT INTO tasks (title, description, priority, category, due_date, username, completed, updated_at)
VALUES 
('Update Website Content', 'Review and update the content on the company website to ensure all information is current and accurate.', 'High', 'Work', '2024-08-11', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Host Dinner Party', 'Plan and host a dinner party for friends and family. Decide on a menu, send invitations, and prepare the food and drinks.', 'Low', 'Family', '2024-08-12', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Complete Online Course', 'Finish the remaining modules of the online course you started. Take notes and complete all assignments.', 'Urgent', 'Misc', '2024-08-13', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Team Building Activity', 'Organize a team building activity to improve team cohesion and morale. Choose an activity that everyone will enjoy.', 'High', 'Work', '2024-08-14', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Family Movie Night', 'Choose a movie, prepare snacks, and set up a cozy space for a family movie night. Make sure everyone is comfortable.', 'Low', 'Family', '2024-08-15', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Fix Leaky Faucet', 'Identify the source of the leak in the kitchen faucet and fix it. If necessary, buy replacement parts from the hardware store.', 'Urgent', 'Misc', '2024-08-16', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Prepare Sales Presentation', 'Create a detailed sales presentation for the upcoming client meeting. Highlight key products and services, and include case studies.', 'High', 'Work', '2024-08-17', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Birthday Celebration', 'Plan and organize a birthday celebration. Choose a theme, buy decorations, and arrange for food and entertainment.', 'Low', 'Family', '2024-08-18', 'premium@example.com', true, CURRENT_TIMESTAMP),
('Weekly Grocery Shopping', 'Make a list of groceries needed for the week and purchase them from the local supermarket. Ensure all essentials are covered.', 'Urgent', 'Misc', '2024-08-19', 'premium@example.com', false, CURRENT_TIMESTAMP),
('Annual Budget Review', 'Review the annual budget and make necessary adjustments. Ensure all expenses are accounted for and financial goals are on track.', 'High', 'Work', '2024-08-20', 'premium@example.com', true, CURRENT_TIMESTAMP);
