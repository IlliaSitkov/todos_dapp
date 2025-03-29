The **ToDos DApp** is a decentralized application built on the Internet Computer (ICP) blockchain. It allows users to manage their tasks and categories in a secure and decentralized manner. Each user has their own set of categories and todos, which are stored securely on the blockchain and associated with their unique principal ID.

The app can be accessed via this link [https://cft6s-gyaaa-aaaai-q3wbq-cai.icp0.io/](https://cft6s-gyaaa-aaaai-q3wbq-cai.icp0.io/)
\
A demo of the app: [https://youtu.be/Jn3a_t3ifU8](https://youtu.be/Jn3a_t3ifU8)

## Features

- **User Authentication**: Each user is identified by their unique `Principal` ID.
- **Category Management**:
  - Add new categories.
  - Retrieve all categories.
  - Remove categories.
  - Retrieve a category by id.
- **Todo Management**:
  - Add todos to specific categories.
  - Retrieve todos from a category.
  - Update todo text.
  - Toggle todo completion status.
  - Delete todos.

## Endpoints

### Category Endpoints

1. **Get All Categories**

   - **Function**: `getCategories()`
   - **Description**: Retrieves all categories for the authenticated user.
   - **Returns**: An array of categories, each containing:
     - `id`: The category ID.
     - `name`: The category name.

2. **Add Category**

   - **Function**: `addCategory(name: Text)`
   - **Description**: Adds a new category for the authenticated user.
   - **Parameters**:
     - `name`: The name of the category.

3. **Remove Category**

   - **Function**: `removeCategory(categoryId: Nat)`
   - **Description**: Removes a category by its ID for the authenticated user.
   - **Parameters**:
     - `categoryId`: The ID of the category to remove.

4. **Get Category**
   - **Function**: `getCategory(categoryId: Nat)`
   - **Description**: Retrieves a category by its id.
   - **Parameters**:
     - `categoryId`: The ID of the category to retrieve.

---

### Todo Endpoints

1. **Get Todos**

   - **Function**: `getTodos(categoryId: Nat)`
   - **Description**: Retrieves all todos for a specific category.
   - **Parameters**:
     - `categoryId`: The ID of the category.
   - **Returns**: An array of todos, each containing:
     - `id`: The todo ID.
     - `text`: The todo text.
     - `completed`: A boolean indicating whether the todo is completed.

2. **Get Todo**

   - **Function**: `getTodo(categoryId: Nat, todoId: Nat)`
   - **Description**: Retrieves a specific todo by its ID within a category.
   - **Parameters**:
     - `categoryId`: The ID of the category.
     - `todoId`: The ID of the todo.
   - **Returns**: The todo object if found, otherwise `null`.

3. **Add Todo**

   - **Function**: `addTodo(text: Text, categoryId: Nat)`
   - **Description**: Adds a new todo to a specific category.
   - **Parameters**:
     - `text`: The text of the todo.
     - `categoryId`: The ID of the category.

4. **Update Todo**

   - **Function**: `updateTodo(text: Text, categoryId: Nat, todoId: Nat)`
   - **Description**: Updates the text of a specific todo.
   - **Parameters**:
     - `text`: The new text for the todo.
     - `categoryId`: The ID of the category.
     - `todoId`: The ID of the todo.

5. **Toggle Todo Completion**

   - **Function**: `toggleTodo(categoryId: Nat, todoId: Nat)`
   - **Description**: Toggles the completion status of a specific todo.
   - **Parameters**:
     - `categoryId`: The ID of the category.
     - `todoId`: The ID of the todo.

6. **Delete Todo**
   - **Function**: `deleteTodo(categoryId: Nat, todoId: Nat)`
   - **Description**: Deletes a specific todo from a category.
   - **Parameters**:
     - `categoryId`: The ID of the category.
     - `todoId`: The ID of the todo.

---

## Built with
- **React**: frontend
- **Motoko**: backend
---

## How to Run the Application

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v16 or later).
- Install [dfx](https://internetcomputer.org/docs/building-apps/getting-started/quickstart) (The DFINITY SDK).

### Setup

In the project root directory:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local Internet Computer replica:

   ```bash
   dfx start
   ```

3. In a new terminal in the project root directory deploy canisters:

   ```bash
   dfx deploy
   ```

4. Access backend playground and frontend app via links provided in the console (examples):

Frontend:

```
http://dfdal-2uaaa-aaaaa-qaama-cai.localhost:4943/
```

Backend:

```
http://127.0.0.1:4943/?canisterId=dccg7-xmaaa-aaaaa-qaamq-cai&id=cinef-v4aaa-aaaaa-qaalq-cai
```

---

## Project Structure

- **Backend**: Contains the Motoko code for the canister logic.
- **Frontend**: Contains the React-based UI for interacting with the Todos DApp.

---
