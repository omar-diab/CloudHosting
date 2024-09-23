import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDTO } from "@/utils/dtos";
import { CommentSchema } from "@/utils/schemas";

/**
 * @method POST
 * @route ~/api/comments
 * @description Create a new comment
 * @access private
*/

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "Access denied, you are not authenticated" },
        { status: 401 } // Unauthorized
      );
    }

    const body = (await request.json()) as CreateCommentDTO;

    const validation = CommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description Get all comments
 * @access private
*/

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Access denied, you are not an admin" },
        { status: 403 } // Forbidden
      );
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
