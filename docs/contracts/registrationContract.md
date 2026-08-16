POST /api/accounts

Input:
{
  email,
  username,
  password
}

Rules:
- all required
- email minimally valid
- email unique
- username unique
- no password complexity requirements
- password hashed before persistence

Created Account:
{
  id,
  normalized email,
  username,
  passwordHash,
  verified: false
}

Success:
201 Created

Known invalid registration:
appropriate 4xx response