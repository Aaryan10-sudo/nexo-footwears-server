const autocannon = require("autocannon");

const targetUrl = "https://nexo-footwears.up.railway.app";
const duration = 30;

const options = autocannon(
  {
    url: targetUrl,
    duration: duration,
  },
  (err, result) => {
    if (err) {
      console.error("Error during test:", err);
    } else {
      console.log("Benchmark completed!");
      console.log("Result:", result);
    }
  }
);

autocannon.track(options);
