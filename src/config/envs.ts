import 'dotenv/config';
import * as joi from 'joi';

interface envVars {
  PORT: number;
  PRODUCTS_MICROSERVICES_HOST: string;
  PRODUCTS_MICROSERVICES_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation Error ${error.message}`);
}

const envVars: envVars = value;

export const envs = {
  port: envVars.PORT,
  productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
};
