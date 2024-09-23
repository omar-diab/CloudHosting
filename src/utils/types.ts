import { Article, Comment, User } from "@prisma/client";

type st = string;
type num = number;
type bool = boolean;

export type JWTPayload = {
    id : num,
    isAdmin: bool,
    username: st,
}

export type CommentWithUser = Comment & { user : User}

export type SingleArticle = Article & { comments : CommentWithUser[]}