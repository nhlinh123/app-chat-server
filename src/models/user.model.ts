import {getModelForClass, index, modelOptions, pre, prop} from "@typegoose/typegoose";
import bcrypt from 'bcryptjs';

@index({ email: 1 })
@pre<User>('save', async function () {
    // Hash password if the password is new or was updated
    if (!this.isModified('password')) return;

    // Hash password with costFactor of 12
    this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @prop()
    name: string;

    @prop({unique: true, required: true})
    email: string

    @prop({required: true, minlength: 6, maxlength: 20, select: false})
    password: string;

    @prop({default: 'user'})
    role: string;

    // Instance method to check if passwords match
    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const userModel = getModelForClass(User);
export default userModel;
