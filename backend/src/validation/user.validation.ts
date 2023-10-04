export const createUserValidation = {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email'},
          name: { type: 'string'},
          password: { type: 'string', minLength: 3, maxLength: 4 },
        },
        required: ['email','name','password'] 
      }
    }
  }