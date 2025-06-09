export type User = {
  id: number;
  name: string;
  email: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
};

export const fetchUserDetails = async (userId: string): Promise<User> => {
  // Simulate API call
  const users = await fetchUsers();
  const user = users.find(u => u.id === parseInt(userId));
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
