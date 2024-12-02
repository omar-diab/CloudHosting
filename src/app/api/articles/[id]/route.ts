import { NextRequest, NextResponse } from "next/server";
import { UpdateArticlesDTO } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Get single aticle by id
 * @access public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update single aticle by id
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Access denied, you are not an admin" },
        { status: 403 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as UpdateArticlesDTO;

    const UpdateArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(UpdateArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Delete single aticle by id
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Access denied, you are not an admin" },
        { status: 403 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // Delete the article
    const DeletedArticle = await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });

    // Delete all comments that belong to this article
    const commentsId: number[] = article?.comments.map((comment) => comment.id);

    await prisma.comment.deleteMany({
      where: { id: { in: commentsId } },
    });

    return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
