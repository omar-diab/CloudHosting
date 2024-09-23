import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @description Log out from the account
 * @access public
 */

export function GET(request: NextRequest) {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json({
         message: "You Logged Out" },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
