import { NextResponse, NextRequest } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { ErrorCodes } from "@ivysbeauty/shared/src/errors";
import { requireOwner } from "@/lib/auth-session";

export async function POST(req: NextRequest) {
  try {
    await requireOwner();
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCodes.BAD_REQUEST,
            message: "No file provided",
          },
        },
        { status: 400 }
      );
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCodes.BAD_REQUEST,
            message: "File type must be an image",
          },
        },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const imageUrl = await uploadImage(buffer);

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
      },
    });
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("[Upload API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCodes.INTERNAL_ERROR,
          message: "Failed to upload image",
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}
