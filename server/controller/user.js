
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from '../models/userModel.js'


export const signin = async (req, res) => {
    const { email, password } = req.body.data;

    try {
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: 'no such user exists' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

        // create JWTs
        const accessToken = jwt.sign({ name: existingUser.name, email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        const refreshToken = jwt.sign({ email: existingUser.email, time: Date.now() }, 'test_refreshToken',)

        //storing the new refreesh Token   
        userModel.findOneAndUpdate({ email: email }, { $set: { refreshToken: refreshToken } }, { new: false }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });


        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ name: existingUser.name, accessToken, message: 'Login successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, } = req.body.data;
    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        if (password !== confirmPassword) return res.status(401).json({ message: 'password doesnt match' });

        const hashedPassword = await bcrypt.hash(password, 12);


        const refreshToken = jwt.sign({ name: firstName + "" + lastName, email: email, time: Date.now() }, 'test_refreshToken',)

        const result = await userModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, refreshToken: refreshToken });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "920s" });
        console.log('real token------' + token);
        res.status(200).json({ result, token, refreshToken, message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wronggggggggggggg" + error });
        console.error(error.response.data);
    }


}