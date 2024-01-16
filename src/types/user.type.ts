interface UserType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: string;
  post: string[];
  groups: string[];
  friends: number[];
  createdAt: string;
  updatedAt: string;
  profileImage: string | null;
  coverImage: string | null;
}

export default UserType;
