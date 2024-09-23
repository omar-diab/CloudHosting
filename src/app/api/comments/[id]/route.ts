import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDTO } from "@/utils/dtos";

interface Props {
  params: { id: string };
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description Update a comment
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "Access denied, the comment not yours" },
        { status: 403 } // Forbidden
      );
    }

    const body = (await request.json()) as UpdateCommentDTO;

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @description Delete a comment
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);

    if (user === null) {
      return NextResponse.json(
        { message: "Access denied, No token provided" },
        { status: 403 } // Forbidden
      );
    }

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json({ message: "Comment Deleted" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Access denied, You are not the author of this comment" },
      { status: 403 } // Forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
