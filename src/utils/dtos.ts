type st = string;
type num = number;
type bool = boolean;

// DTO : Data Transfer Object

export interface CreateArticlesDTO {
    title: st,
    description: st 
}

export interface UpdateArticlesDTO {
    title?: st,
    description?: st 
}

export interface RegisterUserDTO {
    username: st,
    email: st,
    password: st,
}

export interface LoginUserDTO {
    email: st,
    password: st,
}

export interface UpdateUserDTO {
    username?: st,
    email?: st,
    password?: st,
}

export interface CreateCommentDTO {
    text: st,
    articleId: num,
}

export interface UpdateCommentDTO {
    text: st,
}