# Small E-commerce project

This project allows you to simulate orders with a button on the frontend of the application, then add one or more products to the cart (the cart is using Redux toolkit and localStorage to save products; after creating the order, the localStorage is cleared), and check the created order on the Dashboard;

## 3 Entities

- Product
- Category
- Order

## Relation

- Product & Category : Many to Many
- Order & Product: One to Many

## Features (Backend)

- DTOs implemented
- When a product is created it is added to a category, and that category receives the ID of that product.
- When updating a product, you can add one or more categories to a product,
  the ID of that product will be registered in all the categories mentionned.
- When you delete a product, that product's ID is deleted from all categories it belongs to.
- When deleting a category, the ID of that category will be deleted from all products it belongs to.
  This way, consistency will be maintained.

- Error handling.
- When an order is created an event is listened for each order creation to send email notification with Nodemailer using the implemented email service.
- Image upload has been implemented in the backend with AWS S3 and generates an URL to save with new product creation.

## Features (Frontend)

- Material UI.
- Form validations with Formik and Yup.
  -Datagrid for listing Products, Categories and Order.
- When editing a product, you could add one or more categories.
- Image upload
- When the cart is empty the order simulation button is disabled.

## Dashboard de KPIs via Mongo DB Aggregation:

- Total quantity of orders.
- Average value per order.
- Total revenue.
- Orders by period (daily, weekly, monthly).
- Number of categories.
- Daily sale with dates and chart.

## Tech Stack

**Frontend:** React, Material UI, Formik, Yup, Datagrid, Custom Hooks, Redux toolkit, toast notification

**Backend:** NestJs, Express, AWS S3, Mongo DB, Nodemailer, Cors, Helmet, Event, @nestjs/config

**TOOLS:** Docker

## API Reference

#### Get all products

```http
  GET /product
```

#### Get single product

```http
  GET /product/${id}
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of product to fetch |

#### Update one product

```http
  PATCH /product/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of product to update |

#### Delete one product

```http
  DELETE /product/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of product to delete |

#### Populate Product & Category

```http
  GET /product/category/populate
```

#### Get all catgeories

```http
  GET /category
```

#### Get single category

```http
  GET /category/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of category to fetch |

#### Update one category

```http
  PATCH /category/${id}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of category to update |

#### Delete one category

```http
  DELETE /category/${id}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of category to delete |

#### Count categories

```http
  GET /count/result
```

#### Get all orders

```http
  GET /order
```

#### Get single order

```http
  GET /order/${id}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required & valid**. Id of order to fetch |

#### Update one order

```http
  PATCH /category/${id}
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Required & valid**. Id of order to update |

#### Delete one order

```http
  DELETE /order/${id}
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Required & valid**. Id of order to delete |

#### Upload imagem (We only use upload service inside product)

```http
  POST /upload
```

#### Sending E-mail (We only use email service not the enpoint via event)

```http
  POST /email
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`S3_ACCESS_KEY`
`S3_SECRET_ACCESS_KEY`
`S3_REGION`
`S3_BUCKET_NAME`
`EMAIL_HOST`
`EMAIL_USERNAME`
`EMAIL_PASSWORD`

## Installation

Download nest-fullstack Github folder (Should have docker install)

```bash
  cd nest-fullstack
  RUN  docker compose up -d
```

To build and run images in a container.

Restore Mongo DB Database from the ROOT folder

```bash
  docker cp ./db.archive mongo-db:/db.archive
```

```bash
  docker exec -it mongo-db mongorestore --uri mongodb://localhost:27017 --gzip --archive=db.archive
```

## Screenshots

![Home Page](./images-print/home.png)

![Home Page](./images-print/dashboard.png)

![Home Page](./images-print/orders.png)

![Home Page](./images-print/product.png)

![Home Page](./images-print/update-product.png)

![Home Page](./images-print/product-endpoint-print.png)

![Home Page](./images-print/category-endpoint-print.png)
