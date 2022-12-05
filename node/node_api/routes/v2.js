const express = require("express");
const { verifyToken, apiLimiter } = require("./middlewares");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Domain, User, Post, Hashtag } = require("../models");

//데이터를 리턴하는 요청 처리
router.get("/posts/my", apiLimiter, verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({ code: 200, payload: posts });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
});

//토큰발급
router.post("/token", apiLimiter, async (req, res) => {
  const { clientSecret } = req.body;
  console.log(clientSecret, "!23");
  try {
    //도메인 찾기
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않는 도메인입니다.",
      });
    }
    // 토큰 생성

    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
        issuer: "kjh", //누가발급했니 ?
      }
    );

    return res.json({
      code: 200,
      message: "토큰 생성완료",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "토큰 생성 오류",
    });
  }
});

//토큰을 확인하기 위한 처리
router.get("/test", apiLimiter, verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
