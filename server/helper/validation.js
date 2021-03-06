import joi from 'joi';

const schema = {
  parcel: joi.object().keys({
    from: joi.string().min(2).max(128).required(),
    destination: joi.string().min(2).max(128),
    weight: joi.number().required(),
  }),
  user: joi.object().keys({
    firstName: joi.string().min(3).max(128).required(),
    lastName: joi.string().min(3).max(128).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
      .required()
  })
};

export default schema;
