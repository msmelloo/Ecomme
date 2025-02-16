// Simple in-memory storage
const users: { username: string; email: string; password: string }[] = []

export async function createUser(userData: {
  username: string
  email: string
  password: string
}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Basic validation
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error("All fields are required")
  }

  if (userData.password.length < 6) {
    throw new Error("Password must be at least 6 characters long")
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.email === userData.email || user.username === userData.username)

  if (existingUser) {
    throw new Error("User with this email or username already exists")
  }

  // In a real app, you would hash the password before storing
  users.push(userData)

  return { success: true }
}

export async function getUsers() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users
}

