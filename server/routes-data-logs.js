import listEndpoints from "express-list-endpoints";

export const logRoutesData = (app) => {
  const PORT = process.env.PORT;
  console.log(`Server running on port ${PORT}`);
  console.log(
    listEndpoints(app).map((route) => {
      const url = `http://localhost:${PORT}${route.path}`;
      delete route.middlewares;
      return { ...route, url };
    })
  );
};
