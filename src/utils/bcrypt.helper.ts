import bcrypt from "bcrypt";

export const hashHandler = async ({
  salt,
  text,
}: {
  salt: number;
  text: string;
}) => {
  try {
    const hash = await bcrypt.hash(text, salt);
    return hash;
  } catch (err) {
    throw new Error("hash error !");
  }
};
