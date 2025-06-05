import { prisma } from "@/lib/db";
import { BadRequestException } from "@/lib/exception/error.response";
import { PostCreateOneSchema } from "@/lib/validators/schemas";
import { NextResponse, NextRequest } from "next/server";
import { createPost } from "./post.service";
import { CREATED } from "@/lib/exception/success.response";
import { protectedRoute, withErrorHandler } from "@/lib/api-handler";
import { slugify } from "@/util/index";




const POST_POST_CONTROLLER = async (req: NextRequest) => {
    const body = await req.json();
    //validate data
    const validate = PostCreateOneSchema.safeParse({ data: {slug: "default",...body} })
    if (!validate.success) {
        throw new BadRequestException(validate.error.errors.map(err => err.message));
    }
    if (body.slug === undefined || body.slug === null) {
        body.slug = slugify(body.title) //thêm slug
    }

    //create post
    const post = await createPost({
        title: validate.data.data.title,
        slug: validate.data.data.slug,
        description: validate.data.data.description,
        content: validate.data.data.content,
        estimated_time: validate.data.data.estimated_time
    })


    return new CREATED({
        message: "Post created successfully",
        metadata: post
    }).send();


};

// const GET_POST_CONTROLLER = async (req: NextRequest) => {
//      return new CREATED({
//         message: "Post created successfully",
//         metadata: []
//     }).send();
// };

//protected route
export const POST = withErrorHandler(protectedRoute(POST_POST_CONTROLLER))

