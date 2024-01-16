import { USER_FILE } from "../Constants/fileConstants";
import { readDataFromFile, writeDataToFile } from "../Utilities/read-write";
import UserType from "../types/user.type";
import { v4 as uuidv4 } from "uuid";

export async function getUsers(): Promise<UserType[] | string> {
  try {
    const users = await readDataFromFile(USER_FILE);
    if (users) {
      return users as UserType[];
    } else {
      throw new Error("No users found");
    }
  } catch (error: any) {
    console.error(`Error getting users: ${error.message}`);
    return "Getting user operation failed";
  }
}

export async function getUser(userId: string): Promise<UserType | string> {
  try {
    const users = await readDataFromFile(USER_FILE);
    const user = users.find((u: UserType) => u.id === userId);
    if (user) {
      return user;
    } else {
      throw new Error(`User with ID ${userId} not found`);
    }
  } catch (error: any) {
    console.error(`Error getting user: ${error.message}`);
    return "Getting user operation failed";
  }
}

export async function getUserByEmail(email: string): Promise<UserType | null> {
  try {
    const users = await readDataFromFile(USER_FILE);
    const user = users.find((u: UserType) => u.email === email);

    if (user) {
      return user;
    } else {
      throw new Error(`User with email ${email} not found`);
    }
  } catch (error: any) {
    console.error(`Error getting user by email: ${error.message}`);
    return null;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const users = await readDataFromFile(USER_FILE);

    const user = users.find((u: UserType) => u.username === username);

    if (user) {
      return user;
    } else {
      throw new Error(`User with username ${username} not found`);
    }
  } catch (error: any) {
    console.error(`Error getting user by username: ${error.message}`);
    return "Getting user by username operation failed";
  }
}

export async function updateUser(
  userId: string,
  updatedUserData: Partial<UserType>
): Promise<string> {
  try {
    const users = await readDataFromFile(USER_FILE);
    const updatedUsers = users.map((user: UserType) =>
      user.id === userId ? { ...user, ...updatedUserData } : user
    );
    await writeDataToFile(USER_FILE, updatedUsers);
    return "User updated successfully";
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`);
    return "Update user operation failed";
  }
}

export async function deleteUser(userId: string): Promise<string> {
  try {
    const users = await readDataFromFile(USER_FILE);
    const updatedUsers = users.filter((user: UserType) => user.id !== userId);
    await writeDataToFile(USER_FILE, updatedUsers);
    return "User deleted successfully";
  } catch (error: any) {
    console.error(`Error deleting user: ${error.message}`);
    return "Delete user operation failed";
  }
}

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<string> {
  try {
    const users = await readDataFromFile(USER_FILE);
    const newUserId = uuidv4();
    const newUser = {
      id: newUserId,
      username: username,
      email: email,
      password: password,
      bio: "", // Set initial values for other fields
      role: "user", // Set initial values for other fields
      post: [],
      groups: [],
      friends: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profileImage: null,
      coverImage: null,
    };

    const updatedUsers = [...users, newUser];

    await writeDataToFile(USER_FILE, updatedUsers);

    return "User created successfully";
  } catch (error: any) {
    console.error(`Error creating user: ${error.message}`);
    return "Create user operation failed";
  }
}
