import { NextRequest, NextResponse } from "next/server";
import { RegisterUserDTO } from "@/utils/dtos";
import { registerSchema } from "@/utils/schemas";
import prisma from "@/utils/db";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/utils/jwtGemeration";

/**
 * @method   Post
 * @route    ~/api/users/register
 * @description  Create a new user
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDTO;

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashPassword,
      },
      select: {
        username: true,
        email: true,
        id: true,
        isAdmin: true,
      }
    });

    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    return NextResponse.json({...newUser, message: 'Registered & Authenticated' }, { status: 201, headers: { 'Set-Cookie': cookie } });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
