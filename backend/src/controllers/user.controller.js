import * as service from '../services/user.service.js';

export async function login(req, res) {
  const {
    email,
    password,
    user_type
  } = req.body;

  const user = await service.login(
    email,
    password,
    Number(user_type)
  );

  res.json(user);
}