# Solutions to Planned Coding Challenge: Memory Lane

### Solution Overview

This solution is a web application that allows users to create a memory lane and share it with friends and family. A memory lane is a collection of memories that happened in chronological order.

Here are the fields defined in the models:

**MemoryLane Model:**

- `slug`: A unique identifier for the memory lane (String, primary key).
- `user_name`: The name of the user who created the memory lane (String).
- `description`: A description of the memory lane (String).

**Memory Model:**

- `id`: A unique identifier for the memory (Int, primary key, auto-increment).
- `memory_lane_slug`: A reference to the associated memory lane (String).
- `title`: The title of the memory (String).
- `description`: A description of the memory (String).
- `timestamp`: The date and time when the memory occurred (DateTime).
- `images`: A string representing the images associated with the memory (String).

### Technical Design

The application is built using Next.js (TypeScript) and Tailwind CSS. Prisma is used as the ORM to interact with the database. Here are a few routes in the app:

- **/**: Ideally, it would be a landing page, but for this solution, it is a page where you can create a new Memory Lane.
- **/[memory_lane_slug]**: This screen shows all the memories in the memory lane. The user is able to add a new memory here or create a new memory lane.

### Setup and Run

Clone the repository and run the following commands:

```bash
# Install dependencies
npm install

# Prepare DB and run migrations
npm run db:generate
npm run db:migrate:dev

# Run the app
npm run dev
```

Open [http://localhost:3000/archit](http://localhost:3000/archit) with your browser to see the result.

### Future Improvements

- Implement authentication and authorization to secure the app.
- Enhance the UI to allow editing and deleting memories.
- Refactor backend code using middlewares for better organization (e.g., validations, error handling).
- Add meta tags for each page to improve social media sharing.
