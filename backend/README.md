# CodeVector Backend Assignment

## Overview

This project implements a scalable backend service for browsing a large product catalog containing 200,000 products. The API supports:

- Browse products sorted by newest first
- Filter products by category
- Efficient cursor-based pagination
- Consistent pagination while data changes
- Bulk product generation and seeding

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Why I Chose This Stack

I chose Node.js and MongoDB because I am most comfortable with them and can confidently explain and extend the implementation. MongoDB also provides efficient indexing and cursor-based querying, making it suitable for handling large datasets and pagination.

---

## Database Design

Each product contains:

- \_id
- name
- category
- price
- createdAt
- updatedAt

Schema indexes:

```js
productSchema.index({
  updatedAt: -1,
  _id: -1,
});
```

This index supports efficient sorting and pagination.

---

## Product Generation

A seed script generates 200,000 products using batch inserts.

Instead of inserting records one-by-one, products are inserted using `insertMany()` in batches to improve performance and reduce database overhead.

Run:

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
| category  | Filter products by category  |
| cursor    | Cursor for pagination        |

Examples:

```http
GET /api/products
```

```http
GET /api/products?limit=20
```

```http
GET /api/products?category=Electronics
```

```http
GET /api/products?limit=20&cursor=<cursor>
```

---

## Pagination Approach

I used cursor-based pagination instead of offset-based pagination.

### Why Not Offset Pagination?

Offset pagination using `skip()` can become inefficient on large datasets and may produce duplicate or missing records when new products are added or updated while a user is browsing.

### Why Cursor Pagination?

Cursor pagination uses the last retrieved record as a reference point for the next page.

Benefits:

- Better performance on large datasets
- Stable pagination
- Prevents duplicate records
- Prevents skipped records
- Works correctly when data changes during browsing

---

## Performance Considerations

Implemented:

- Bulk inserts using `insertMany()`
- MongoDB indexing
- Cursor-based pagination
- Query filtering at database level

---

## Testing

Tested with:

- 200,000 seeded products
- Category filtering
- Cursor pagination
- Multiple page requests
- Large dataset queries

---

## How I Used AI

I used AI tools (ChatGPT) as a development assistant to:

- Discuss pagination strategies
- Review implementation approaches
- Validate design decisions
- Improve documentation

All code was reviewed, tested, and understood before integration.

---

## What I Would Improve With More Time

- Encoded composite cursors (`updatedAt + _id`)
- API validation and request sanitization
- Load testing with higher concurrency
- Redis caching after traffic analysis
- Monitoring and performance metrics
- Automated tests
