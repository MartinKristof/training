import { NextRequest, NextResponse } from 'next/server';

// Mock data - in real app this would come from a database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

// GET /api/users
export async function GET() {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return NextResponse.json({
    users,
    total: users.length,
    message: 'Users retrieved successfully',
  });
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Create new user (in real app, save to database)
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        user: newUser,
        message: 'User created successfully',
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

// PUT /api/users
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userIndex = users.findIndex(user => user.id === body.id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...body };

    return NextResponse.json({
      user: users[userIndex],
      message: 'User updated successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

// DELETE /api/users
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return NextResponse.json({
    user: deletedUser,
    message: 'User deleted successfully',
  });
}
