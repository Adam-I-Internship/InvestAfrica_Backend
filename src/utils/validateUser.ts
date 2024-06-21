import Joi from 'joi';
import { UserType } from '../types/userTypes';

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required(),
  accountPassword: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$_.!@#%^&*()\-+=]{8,128}$/)
    .required(),
  confirmPassword: Joi.valid(Joi.ref('accountPassword')).required(),
}).with('accountPassword', 'confirmPassword');

const validateUserData = (data: UserType) => {
  const { error } = userSchema.validate(data);
  return error ? error.details[0].message : null;
};

export default validateUserData;
