import Joi from 'joi';
import { countries } from 'countries-list';
import { CompanyType } from '../types/companyTypes';

const validCountries = Object.values(countries).map(country => country.name);

const companySchema = Joi.object({
  companyName: Joi.string().max(255).required(),
  businessType: Joi.string().max(255).required(),
  numberOfEmployees: Joi.number().integer().strict().min(1).max(10000000).required(),
  yearOfEstablishment: Joi.number()
    .integer()
    .strict()
    .min(1500)
    .max(new Date().getFullYear())
    .required(),
  country: Joi.string()
    .valid(...validCountries)
    .required(),
  city: Joi.string().max(255).required(),
  postCode: Joi.string().max(255).allow(null).allow(''),
  industry: Joi.string().max(255).required(),
  accountPassword: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$_.!@#%^&*()\-+=]{8,128}$/)
    .required(),
  confirmPassword: Joi.valid(Joi.ref('accountPassword')).required(),
  companyAddress: Joi.string().max(512).required(),
  personOfContact: Joi.string().max(255).required(),
  position: Joi.string().max(255).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9-\s]*[0-9]{8,}[0-9-\s]*$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required(),
  companyWebsite: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
}).with('accountPassword', 'confirmPassword');

const validateCompanyData = (data: CompanyType) => {
  const { error } = companySchema.validate(data);
  return error ? error.details[0].message : null;
};

export default validateCompanyData;
