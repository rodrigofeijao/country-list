A simple country list wih pagination and some flags to bring more color.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the countries list.

## Pagination

Idealy the pagination would have been done using the Graph query, but this version of the server do not provide such feature, so instead the pagination is done locally using a simple chucking approach after the full content is loaded.
