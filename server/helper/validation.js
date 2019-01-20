import joi from 'joi';

const schema = {
  parcel: joi.object().keys({
    from: joi.string().min(2).max(128).required(),
    destination: joi.string().max(2).max(128),
    weight: joi.string().alphanum().required(),
  }),
  user: joi.object().keys({
    firstName: joi.string().min(3).max(128).required(),
    lastName: joi.string().min(3).max(128).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).uppercase(1).lowercase(1)
      .required()
  })
};

export default schema;
