export type User = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUsers(): Promise<User[]> {
  // Simulate API call
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
}

export async function fetchUserDetails(userId: string): Promise<User> {
  // Simulate API call
  const users = await fetchUsers();
  const user = users.find(u => u.id === parseInt(userId));
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
