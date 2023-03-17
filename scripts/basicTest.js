import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 5 },
    { duration: "1m", target: 10 },
    { duration: "1m", target: 15 },
    { duration: "1m", target: 5 },
    { duration: "1m", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% of requests must complete below 1.5s
  },
};

const BASE_URL = "https://test-api.k6.io";
const USERNAME = "TestUser";
const PASSWORD = "SuperCroc2020";

export default () => {
  const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("access") !== "",
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json("access")}`,
    },
  };

  const myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
  // Verify that there is more than one crocodile return:
  check(myObjects, { "retrieved crocodiles": (obj) => obj.length > 0 });
  sleep(1);
};
