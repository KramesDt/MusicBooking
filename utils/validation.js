const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match'
    }),
  fullName: Joi.string().required(),
  walletAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).allow('', null)
    .messages({
      'string.pattern.base': 'Invalid wallet address format'
    }),
  referralCode: Joi.string().allow('', null)
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Deposit pending schema
const depositPendingSchema = Joi.object({
  txHash: Joi.string().required(),
  amount: Joi.number().positive().required(),
  fromAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required()
    .messages({
      'string.pattern.base': 'Invalid wallet address format'
    })
});

// Deposit confirmation schema
const depositConfirmSchema = Joi.object({
  txHash: Joi.string().required(),
  amount: Joi.number().positive().required(),
  fromAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required()
    .messages({
      'string.pattern.base': 'Invalid wallet address format'
    })
});

// Withdrawal request schema
const withdrawalRequestSchema = Joi.object({
  amount: Joi.number().positive().required(),
  withdrawalType: Joi.string().valid('interest', 'principal').required(),
  toAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required()
    .messages({
      'string.pattern.base': 'Invalid wallet address format'
    })
});

// Update user schema
const updateUserSchema = Joi.object({
  fullName: Joi.string(),
  password: Joi.string().min(6),
  confirmPassword: Joi.string().valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'any.only': 'Passwords do not match'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  depositPendingSchema,
  depositConfirmSchema,
  withdrawalRequestSchema,
  updateUserSchema
};
