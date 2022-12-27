const User = require("../models/user");
const UserOTPVerification = require("../models/userOtpVerification");
const senOTPVerificationEmail = require("../services/VerificationEmail");
const bcrypt = require("bcrypt");
const user = require("../models/user");

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
        return res.json({
          status: "SUCCES",
          message: `LOGIN SUCCESS`,
          data: {
            phone: req.body.phone,
            id: Usersignin._id
          },
        })
      }
    } catch (error) {
      console.log(error);
    }
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
    const UserFindPhone = await User.find({ phone: find })
    if (!UserFindPhone.length) {
      const UserFindEmail = await user.find({ email: find })
      if (!UserFindEmail.length) {
        return res.json({
          status: "FAILD",
          message: `Không có người dùng nào`,
        })
      } else {
        console.log("Email", UserFindEmail);
        return res.json({
          status: "SUCCESs",
          data: {
            email: UserFindEmail[0].email,
            id: UserFindEmail[0]._id,
            phone: UserFindEmail[0].phone,
            name: UserFindEmail[0].name,
            avatar: UserFindEmail[0].avatar,
          },
        })
      }
    }
    else {
      console.log("Phone", UserFindPhone);
      return res.json({
        status: "SUCCESs",
        data: {
          email: UserFindPhone[0].email,
          id: UserFindPhone[0]._id,
          phone: UserFindPhone[0].phone,
          name: UserFindPhone[0].name,
          avatar: UserFindPhone[0].avatar,
        },
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
  }
};

module.exports = userController;
