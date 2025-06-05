import { prisma } from '@/lib/db';
import { CreatePostInput } from './post.type';
import { BadRequestException } from '@/lib/exception/error.response';



export async function createPost(input: CreatePostInput) {
    //check if title exits
    const isPostTitleExists = await prisma.post.findFirst({
        where: {
            title: input.title,
        }
    });
    if (isPostTitleExists) {
        throw new BadRequestException(`Post with title "${input.title}" already exists.`);
    }
    //check if slug exits
    const isPostSlugExists = await prisma.post.findFirst({
        where: {
            slug: input.slug,
        }
    });
    if (isPostSlugExists) {
        throw new BadRequestException(`Post with slug "${input.slug}" already exists.`);
    }

    return await prisma.post.create({
        data: {
            title: input.title,
            slug: input.slug,
            description: input.description,
            content: input.content,
            estimated_time: input.estimated_time,
            views_count: 0, // mặc định
            created_at: new Date(),
            updated_at: new Date(),
        }
    })

}