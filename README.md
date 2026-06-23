# Product Catalog Backend

A scalable backend service built for the CodeVector Labs Internship Assignment.

The application supports browsing a large catalog of **200,000+ products**, category filtering, and efficient cursor-based pagination while maintaining consistency when data changes.

---

## Features

* Browse products sorted by newest first
* Filter products by category
* Cursor-based pagination
* Handles large datasets efficiently
* MongoDB indexing for optimized queries
* Bulk product generation and seeding
* REST API architecture
* Responsive frontend (Bonus)

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Frontend (Bonus)

* React
* Tailwind CSS
* Axios
* Vite

---

## Database Schema

Each product contains:

```js
{
  _id,
  name,
  category,
  price,
  createdAt,
  updatedAt
}
```

### Indexing

```js
productSchema.index({
  updatedAt: -1,
  _id: -1,
});
```

This index supports efficient sorting and cursor-based pagination.

---

## Product Generation

A seed script generates **200,000 products** using batch inserts.

### Why Batch Inserts?

Instead of inserting documents one-by-one, products are inserted using `insertMany()` in batches to improve performance and reduce database overhead.

### Run Seed Script

```bash
npm run seed
```

---

## API Endpoints

### Get Products

```http
GET /api/products
```

### Query Parameters

| Parameter | Description                  |
| --------- | ---------------------------- |
| limit     | Number of products to return |
| category  | Filter by category           |
| updatedAt | Cursor timestamp             |
| id        | Cursor product id            |

---

## Example Requests

### Get First Page

```http
GET /api/products
```

### Limit Results

```http
GET /api/products?limit=10
```

### Filter By Category

```http
GET /api/products?category=Electronics
```

### Fetch Next Page

```http
GET /api/products?limit=10&updatedAt=2026-06-22T16:19:05.296Z&id=686abc123
```

---

## Example Response

```json
{
  "success": true,
  "count": 10,
  "nextCursor": {
    "updatedAt": "2026-06-22T16:19:05.296Z",
    "id": "686abc123"
  },
  "products": [
    {
      "_id": "686abc123",
      "name": "Product 1",
      "category": "Electronics",
      "price": 1200,
      "createdAt": "2026-06-22T16:19:05.296Z",
      "updatedAt": "2026-06-22T16:19:05.296Z"
    }
  ]
}
```

---

## Pagination Strategy

### Why Not Offset Pagination?

A common approach is:

```js
.skip(page * limit)
```

This becomes inefficient on large datasets and may return duplicate or missing records when products are inserted or updated while a user is browsing.

### Cursor-Based Pagination

This project uses a composite cursor based on:

```txt
updatedAt + _id
```

Benefits:

* Better performance on large datasets
* Stable pagination
* Prevents duplicate records
* Prevents skipped records
* Works correctly when products are added or updated during browsing

---

## Performance Optimizations

Implemented:

* Bulk inserts using `insertMany()`
* Compound index on `updatedAt` and `_id`
* Cursor-based pagination
* Database-level filtering
* Lean queries for reduced memory usage

---

## Testing

Tested with:

* 200,000 generated products
* Category filtering
* Pagination across multiple pages
* Cursor navigation
* Large dataset queries

---

## How I Used AI

AI tools were used as a development assistant for:

* Discussing pagination approaches
* Reviewing implementation ideas
* Validating design decisions
* Improving documentation

All code was reviewed, tested, and understood before integration.

---

## Future Improvements

Given more time, I would add:

* Encoded cursors
* Automated API tests
* Load testing reports
* Redis caching after traffic analysis
* Request validation middleware
* Monitoring and observability

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd project
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Start Development Server

```bash
npm run dev
```

### Seed Database

```bash
npm run seed
```

---

## Live Demo

### Frontend

```txt
https://codevector-task.netlify.app/
```

### Backend

```txt
https://codevector-task-qdmz.onrender.com
```

---

## Author

**Bhavendra Kumar**

GitHub: https://github.com/bhavendra-kumar
