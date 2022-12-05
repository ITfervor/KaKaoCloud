const express = require("express");
const axios = require("axios");

// const URL = "http://localhost:9000/v1";

const URL = "http://localhost:9000/v2";

//ajax 요청을 할 때 누가 요청 했는지 확인해주기 위해서
//  origin header를 추가
axios.defaults.headers.origin = "http://localhost:4000";

//토큰 발급 코드
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });

      if (tokenResult.data && tokenResult.data.code === 200) {
        req.session.jwt = tokenResult.data.token;
      }
    }
    //토큰 내용확인
    const result = await axios.get(`${URL}/${api}`, {
      headers: { authorization: req.session.jwt },
    });
    return result;
  } catch (error) {
    //토큰 유효 기간 만료
    if (error.response.status === 419) {
      // 기존 토큰 삭제
      delete req.session.jwt;
      return request(req, api);
    }
    return error.response;
  }
};

const router = express.Router();

router.get("/mypost", async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.get("/test", async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post("http://localhost:9000/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      console.log(req.session.jwt, "req session");
      console.log(tokenResult, "tokenResult");
      if (tokenResult.data && tokenResult.data.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        //토큰 발급실패
        return res.json(tokenResult.data);
      }
    }
    //토큰 내용확인
    const result = await axios.get("http://localhost:9000/v1/test", {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
