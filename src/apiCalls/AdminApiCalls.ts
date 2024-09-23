import { domain } from "@/utils/constants";
import { Comment } from "@prisma/client";

export async function getAllArticles(token: string): Promise<Comment[]> {
  const response = await fetch(`http://localhost:3000/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  console.log(token)

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

    return response.json();
}
