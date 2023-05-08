"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetail = void 0;
const User_1 = require("../entities/User");
const user_validation_1 = require("../middlewares/validations/user.validation");
const datasource_config_1 = require("../config/datasource.config");
const userDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, user_validation_1.validateUserData)(req.body);
        if (valid.error) {
            // throw new Error("User provided invalid details");
            res.status(400).json({ error: valid.error.details[0].message });
        }
        else {
            // const imageUrl = { previewImg };
            const newUser = new User_1.User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.phone = req.body.phone;
            newUser.address = req.body.address;
            newUser.password = req.body.password;
            // newUser.fileLink = imageUrl as any;
            newUser.fileLink = req.body.fileLink;
            yield datasource_config_1.AppDataSource.manager.save(newUser);
            res.status(200).json({ message: "data saved", userDetails: newUser });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.userDetail = userDetail;
