const User = require("../models/user");
const UserOTPVerification = require("../models/userOtpVerification");
const senOTPVerificationEmail = require("../services/VerificationEmail");
const bcrypt = require("bcrypt");
const authMethod = require("../auth/auth.method")
const randToken = require("rand-token");
var ObjectId = require('mongoose').Types.ObjectId;

const jwtVariable = {
  accessTokenSecret: "access-token-secret-example",
  accessTokenLife: "10m",
  refreshTokenSize: 100,
}

const userController = {
  getAllUsers(req, res) {
    User.find()
      .then((data) => {
        console.log("got all users");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  async signup(req, res) {
    const { phone, email } = req.body
    const userdefaultPhone = await User.findOne({ phone: phone })
    const userdefaultEmail = await User.findOne({ email: email })
    if (userdefaultPhone || userdefaultEmail) {
      return res.json({
        status: 'error',
        error: 'Tài khoản đã được đăng ký'
      })
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(newUser);
      newUser
        .save()
        .then((data) => {
          senOTPVerificationEmail(data, res)
        })
        .catch((err) => {
          console.log("err", err);
          res.send([])
        });
    }
  },
  async verifyOTP(req, res) {
    try {
      let { Userid, otp } = req.body;
      if (!Userid || !otp) {
        throw Error("Emty otp details are not allowed");
      } else {
        const UserOTPVerificationRecords = await UserOTPVerification.find({
          Userid,
        });
        if (UserOTPVerificationRecords.length <= 0) {
          throw new Error(
            "Account record doesn't exist or has been verified already."
          );
        } else {
          const { expiresAt } = UserOTPVerificationRecords[0];
          const hashedOTP = UserOTPVerificationRecords[0].otp;

          if (expiresAt < Date.now()) {
            await UserOTPVerification.deleteMany({ Userid });
            throw new Error("Code has expired. Please request again. ");
          } else {
            const validOTP = await bcrypt.compare(otp, hashedOTP);
            if (!validOTP) {
              throw new Error("Invalid code passes. Check your inbox.");
            }
            else {
              await User.updateOne({ _id: Userid }, { isVerified: true });
              await UserOTPVerification.deleteOne({ Userid });
              return res.json({
                status: "VERIFIED",
                message: `User email verified successfully.`,
              });
            }
          }
        }
      }
    } catch (error) {
      return res.json({
        status: "FAILD",
        message: error.message,
      });
    }
  },
  async signin(req, res) {
    try {
      const Usersignin = await User.findOne({ phone: req.body.phone })
      if (!Usersignin) {
        return res.json({
          status: "FAILD",
          message: `Số điện thoại chưa được đăng ký`,
        })
      } else {
        if (Usersignin.isVerified === false) {
          return res.json({
            status: "FAILD",
            message: `Bạn cần xác nhận email trước khi đăng nhập`,
          })
        }
        if (!bcrypt.compareSync(req.body.password, Usersignin.password)) {
          return res.json({
            status: "FAILD",
            message: `Mật khẩu không đúng`,
          })
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenSize = process.env.ACCESS_TOKEN_SIZE;

        const dataForAccessToken = {
          id: Usersignin._id,
        };

        const accessToken = await authMethod.generateToken(
          dataForAccessToken,
          accessTokenSecret,
          accessTokenLife,
        );

        if (!accessToken) {
          return res
            .status(401)
            .send('Đăng nhập không thành công, vui lòng thử lại.');
        }
        else {
          let refreshToken = randToken.generate(accessTokenSize); // tạo 1 refresh token ngẫu nhiên
          console.log("USERSIGN", Usersignin);
          if (!Usersignin.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await User.findByIdAndUpdate(Usersignin._id, { refreshToken: refreshToken });
          } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = Usersignin.refreshToken;
          }
          console.log("req.body ", req.body);
          if (req.body.remember) {
            res.cookie('User', {
              phone: req.body.phone,
              id: Usersignin._id,
              avatar: Usersignin.avatar,
              name: Usersignin.name,
              email: Usersignin.email,
              accessToken,
              refreshToken
            }, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
          }
          return res.json({
            status: "SUCCES",
            message: `LOGIN SUCCESS`,
            data: {
              phone: req.body.phone,
              id: Usersignin._id,
              avatar: Usersignin.avatar,
              name: Usersignin.name,
              email: Usersignin.email,
              accessToken,
              refreshToken
            },
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async refreshToken(req, res) {
    const id = this.checkJWT(req, res);
    if (!ObjectId.isValid(id)) {
      return id;
    }
    // Tạo access token mới
    const dataForAccessToken = {
      id,
    };
    const accessTokenLife =
      process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    );
    if (!accessToken) {
      return res
        .status(400)
        .send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
      accessToken,
    });
  },
  //Get by id
  getUserByID: async (req, res) => {
    User.findById(req.body.id)
      .populate("contacts")
      .then((data) => {
        console.log("got the user has id " + req.body.id);
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  getUserByEmail: async (req, res) => {
    const UserFind = await User.findOne({ email: req.body.email })
    if (UserFind) {
      senOTPVerificationEmail(UserFind, res)
    } else {
      return res.json({
        status: "FAILD",
        message: `Email chưa được đăng ký`,
      })
    }
  },
  getUserByEmailOrPhone: async (req, res) => {
    const find = req.body.find
    const userId = req.body.userId

    console.log("123123", req.body);

    //const userId = this.checkJWT(req,res);
    // if(!ObjectId.isValid(userId)){
    //   return userId;
    // }
    const UserFind = await User.find({ $or: [{ phone: find }, { email: find }] })
    if (UserFind.length) {
      UserFind[0].contacts.filter((e) => {
        return e == userId
      })
      return res.json({
        status: "SUCCESS",
        data: {
          type: UserFind[0].contacts.length != 0,//Nếu type = 1 là có kết bạn và ngược lại
          email: UserFind[0].email,
          id: UserFind[0]._id,
          phone: UserFind[0].phone,
          name: UserFind[0].name,
          avatar: UserFind[0].avatar,
          typeRes: find == UserFind[0].phone ? 1 : 0// Nếu tìm bằng số điện thoại thì type bằng 1 và ngược lại
        },
      })
    } else {
      return res.json({
        status: "ERROR",
        data: null,
      })
    }
  },
  
  updatePassword: async (req, res) => {
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    User.findByIdAndUpdate(req.body.id, { password: req.body.newPassword })
      .then((data) => {
        console.log("update password success");
        res.send(data);
      })
      .catch((err) => {
        console.log("err", err);
        res.send([]);
      });
  },
  checkJWT: async (req, res) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
      return res.status(400).send('Không tìm thấy access token.');
    }
    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
      return res.status(400).send('Không tìm thấy refresh token.');
    }

    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;


    // Decode access token đó
    const decoded = await authMethod.decodeToken(
      accessTokenFromHeader,
      accessTokenSecret,
    );
    if (!decoded) {
      return res.status(400).send('Access token không hợp lệ.');
    }

    const id = decoded.payload.id; // Lấy id từ payload
    console.log("id", id);
    const user = await User.findById(id);
    console.log("USER", user);
    if (!user) {
      return res.status(401).send('User không tồn tại.');
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      return res.status(400).send('Refresh token không hợp lệ.');
    }

    return id;
  },
  checkLogin: async (req, res) => {
    console.log("req.cookies--------", req.cookies);
    if (req.cookies) {
      return res.send({
        status: "SUCCESS",
        message: `LOGIN SUCCESS`,
        data: req.cookies.User
      });
    }
    return res.send({ message: "failed" });
  }
};

module.exports = userController;
