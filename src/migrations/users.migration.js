import { v4 } from "uuid";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { createConnection, getConnection } from "../database.js";

const users = [
  {
    email: "test@mail.com",
    password: "123456",
  },
];

export const migrateUsers = async () => {
  await createConnection();
  const db = getConnection();

  users.forEach(async (user) => {
    const userFoud = db.data.users.find((u) => u.email === user.email);

    if (!userFoud) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      const newUser = {
        id: v4(),
        email: user.email,
        password: hash,
      };

      try {
        db.data.users.push(newUser);
        await db.write();

        console.log(`User ${user.email} created`);
      } catch (error) {
        throw new Error(`Error creating user ${user.email}`);
      }
    } else {
      console.log(`User ${user.email} already exists`);
    }
  });
};
