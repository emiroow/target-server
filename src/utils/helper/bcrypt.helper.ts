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

export const hashCompare = async ({
  hash,
  password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> => {
  try {
    // انتظار داریم که bcrypt.compare یک Promise<boolean> برگشت دهد
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error("hashCompare failed: ", error);
    throw new Error("hashCompare failed!");
  }
};
