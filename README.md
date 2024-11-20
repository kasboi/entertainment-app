# **TMDb Movie Explorer**

## **Overview**

This project is a responsive web application that interacts with [The Movie Database (TMDb) API](https://developers.themoviedb.org/3) to display popular movies, manage favorites, and view detailed movie information. It is built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## **Getting Started**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v20+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- TMDb API Key: Sign up for an API key from [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction).

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/kasboi/entertainment-app.git
   cd entertainment-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or (due to react-query and react-intersection-observer not fully compatible with react v19+)
   npm install --force
   # or
   yarn install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your TMDb API key:
     ```env
     TMDB_TOKEN=your_api_key_here
     ```

4. Run the application:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open in browser: [http://localhost:3000](http://localhost:3000)

## **Design Decisions**

1. **Framework**:

   - Chose **Next.js** for its server-side rendering (SSR) capabilities and built-in routing.
   - Client-side rendering (CSR) was used on the homepage to tap into react-query infinite query capabilities.
   - Server side rendering was used on the `Movie` and `Favourites` page.
   - Route handler to handle data fetching on client side to prevent auth token leak

2. **Styling**:

   - Used **Tailwind CSS** for rapid UI development with a utility-first approach.
   - Ensured responsive design by leveraging Tailwind's breakpoint utilities.
   - Shimmer effect to indicate data fetching.

3. **State Management**:

   - Used `useState` and `localStorage` for managing favorites to keep the data local.

4. **Infinite Scrolling**:

   - Used `react-query` for data fetching and caching.
   - Implemented infinite scrolling with `useInfiniteQuery` for better user experience.

5. **TypeScript**:

   - Added strict types for API responses and component props, reducing runtime errors and improving maintainability.

6. **Trade-offs**:
   - **Local Filtering**: Search functionality filters fetched movies locally to avoid redundant API calls, but this may not scale for very large datasets.
   - **API Limitations**: TMDb API sends duplicate movie data in some cases, which is handled client-side with deduplication.
