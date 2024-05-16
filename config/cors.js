const cors = {
  origin: (origin, callback) => {
    if (process.env.ORIGINS.split(",").indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = { cors };
