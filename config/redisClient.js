import { createClient } from "redis";

const { REDIS_PASS, REDIS_URI, REDIS_PORT } = process.env;
const redisClient = createClient({
  password: REDIS_PASS,
  socket: {
    host: REDIS_URI,
    port: REDIS_PORT,
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
redisClient.isOpen
  ? console.log("Connected to cache!")
  : console.log("Couldn't able to connect to cache!");

export default redisClient;
