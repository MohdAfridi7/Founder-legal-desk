    import { NextResponse } from "next/server";
    import { connectDB } from "@/lib/db";
    import Blog from "@/models/Blog";
    import slugify from "@/utils/slugify";
    import { cloudinary } from "@/lib/cloudinary";


   export const createBlog = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const date = formData.get("date");
    const readTime = formData.get("readTime");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const keywords = formData.get("keywords");


    const tags =
      formData.get("tags")?.split(",").map((tag) => tag.trim()) || [];

    const file = formData.get("featuredImage");

    if (
      !title ||
      !shortDescription ||
      !description ||
      !category ||
      !file ||
  !readTime
    ) {
      return NextResponse.json(
        {
          success: false,
          msg: "All required fields are mandatory",
        },
        { status: 400 }
      );
    }

    // Upload Image
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const upload = await cloudinary.uploader.upload(base64, {
      folder: "lawyer-blog",
    });

    let slug = slugify(title);

    const exists = await Blog.findOne({ slug });

    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      shortDescription,
      description,
      category,
      tags,
      featuredImage: upload.secure_url,
      author: author || "Admin",
      date: date || new Date(),
      readTime,
      metaTitle,
      metaDescription,
      keywords,
    });

    return NextResponse.json({
      success: true,
      msg: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
};



    export const getAllBlogs = async () => {
    try {
        await connectDB();

        const blogs = await Blog.find().sort({
        createdAt: -1,
        });

        return NextResponse.json({
        success: true,
        blogs,
        });

    } catch (error) {
        return NextResponse.json(
        {
            success: false,
            msg: error.message,
        },
        {
            status: 500,
        }
        );
    }
    };


    export const getBlogById = async (id) => {
    try {
        await connectDB();

        const blog = await Blog.findById(id);

        if (!blog) {
        return NextResponse.json(
            {
            success: false,
            msg: "Blog not found",
            },
            {
            status: 404,
            }
        );
        }

        return NextResponse.json({
        success: true,
        blog,
        });

    } catch (error) {
        return NextResponse.json(
        {
            success: false,
            msg: error.message,
        },
        {
            status: 500,
        }
        );
    }
    };



    export const getBlogBySlug = async (slug) => {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          msg: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
};


export const updateBlog = async (req, id) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const date = formData.get("date");
    const readTime = formData.get("readTime");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const keywords = formData.get("keywords");
   

    const tags =
      formData.get("tags")?.split(",").map((tag) => tag.trim()) || [];

    const file = formData.get("featuredImage");

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          msg: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update slug
    if (title && title !== blog.title) {
      let slug = slugify(title);

      const exists = await Blog.findOne({
        slug,
        _id: { $ne: id },
      });

      if (exists) {
        slug = `${slug}-${Date.now()}`;
      }

      blog.slug = slug;
    }

    // Image update
    if (file && file.size > 0) {

      // Delete old image
      if (blog.featuredImage) {
        const publicId = blog.featuredImage
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(`lawyer-blog/${publicId}`);
      }

      // Upload new image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "lawyer-blog",
      });

      blog.featuredImage = upload.secure_url;
    }

    blog.title = title ?? blog.title;
    blog.shortDescription = shortDescription ?? blog.shortDescription;
    blog.description = description ?? blog.description;
    blog.category = category ?? blog.category;
    blog.tags = tags.length ? tags : blog.tags;
    blog.author = author ?? blog.author;
    blog.date = date || blog.date;
    blog.readTime = readTime ?? blog.readTime;
    blog.metaTitle = metaTitle ?? blog.metaTitle;
    blog.metaDescription = metaDescription ?? blog.metaDescription;
    blog.keywords = keywords ?? blog.keywords;

    await blog.save();

    return NextResponse.json({
      success: true,
      msg: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
};



 export const deleteBlog = async (id) => {
  try {
    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          msg: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    // Delete image from Cloudinary
    if (blog.featuredImage) {
      const publicId = blog.featuredImage
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(`lawyer-blog/${publicId}`);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      msg: "Blog deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
};


export const getRelatedBlogs = async (id) => {
  try {
    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          msg: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    const relatedBlogs = await Blog.find({
      _id: { $ne: id },
      category: blog.category,
    })
      .select(
        "title slug shortDescription featuredImage category readTime createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(3);

    return NextResponse.json({
      success: true,
      relatedBlogs,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
};