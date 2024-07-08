# Todo List Application

This is a Todo List web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to manage their tasks with different lists and add, delete, or mark tasks as completed.

## Features

- **Default Lists:** Includes default lists such as "Today" with initial tasks.
- **Custom Lists:** Users can create custom lists by accessing /:customListName.
- **Task Management:** Add new tasks, mark them as completed, and delete tasks.
- **Responsive Design:** The application is responsive and works well on different devices.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB Atlas account or a local MongoDB server running

## Installation

1. **Clone the repository:**
git clone https://github.com/your-username/todolist.git
cd todolist


2. **Install dependencies:**
npm install


3. **Set up MongoDB Atlas:**
- Create a MongoDB Atlas account if you don't have one.
- Replace `uri` variable in `app.js` with your MongoDB connection string.

## Running the Application

To run the application, execute the following command:
node app.js

The server will start running on `http://localhost:3000`.

## Usage

### Default List

Navigate to `http://localhost:3000/` to view the "Today" list.
Add new tasks using the input field provided.

### Custom List

Access custom lists by navigating to `http://localhost:3000/:customListName`.
Replace `:customListName` with your desired list name (e.g., `http://localhost:3000/work` for a "Work" list).

### Adding Tasks

Enter a task name in the input field and click the "+" button to add it to the current list.

### Deleting Tasks

To delete a task, check the checkbox next to the task and click the submit button below.

## Contributing

Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

