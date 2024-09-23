import prisma from "@/utils/db";
import { LoginUserDTO } from "@/utils/dtos";
import { loginSchema } from "@/utils/schemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/jwtGemeration";


/**
 * @method  POST
 * @route   ~/api/users/login     
 * @description Login user
 * @access public 
*/

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDTO;

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid password or email" },
        { status: 400 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      { 
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
       }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
