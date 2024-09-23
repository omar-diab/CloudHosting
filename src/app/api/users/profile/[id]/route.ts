import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDTO } from "@/utils/dtos";
import bcrypt from 'bcryptjs'
import { updateUserSchema } from "@/utils/schemas";


interface Props {
  params: { id: string };
}

/**
 * @method   DELETE
 * @route    ~/api/users/profile/:id
 * @description  Delete profile by id
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id == user.id) {
      // Delete the user
      await prisma.user.delete({ where: { id: parseInt(params.id) } });

      // Delete the comments that belong to the user
      const comments = user?.comments.map(comment => comment.id)

      await prisma.comment.deleteMany({
        where: { id: { in: comments } }
      })

      return NextResponse.json(
        { message: "Your profile account deleted successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Access denied, the account not yours" },
      { status: 403 } // Forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method   GET
 * @route    ~/api/users/profile/:id
 * @description  Get profile by id
 * @access private
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "Access denied, the account not yours" },
        { status: 403 } // Forbidden
      );
    }
    
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method   PUT
 * @route    ~/api/users/profile/:id
 * @description  Update profile by id
 * @access private
*/

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "Access denied, the account not yours" },
        { status: 403 } // Forbidden
      );
    }
    
    const body = await request.json() as UpdateUserDTO;

    const validation = updateUserSchema.safeParse(body);

    if(!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    if (body.password) {
      const slat = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, slat);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    })
    
    const { password, ...other } = updatedUser;

    return NextResponse.json({...other}, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}