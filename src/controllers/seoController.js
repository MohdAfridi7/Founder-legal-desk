import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SEO from "@/models/SEO";
import { cloudinary } from "@/lib/cloudinary";

/* ==========================================
   CREATE SEO
========================================== */

export const createSEO = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const pageName = formData.get("pageName");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const canonicalUrl = formData.get("canonicalUrl");
    const metaKeywords = formData.get("metaKeywords");

    const ogTitle = formData.get("ogTitle");
    const ogDescription = formData.get("ogDescription");

    const twitterTitle = formData.get("twitterTitle");
    const twitterDescription = formData.get("twitterDescription");

    const schemaType = formData.get("schemaType");
    const schemaJson = formData.get("schemaJson");

    const ogImageFile = formData.get("ogImage");
    const twitterImageFile = formData.get("twitterImage");

    if (
      !pageName ||
      !metaTitle ||
      !metaDescription ||
      !canonicalUrl ||
      !ogImageFile ||
      !twitterImageFile
    ) {
      return NextResponse.json(
        {
          success: false,
          msg: "All required fields are mandatory",
        },
        {
          status: 400,
        }
      );
    }

    if (metaTitle.length > 60) {
      return NextResponse.json(
        {
          success: false,
          msg: "Meta Title should not exceed 60 characters",
        },
        {
          status: 400,
        }
      );
    }

    if (metaDescription.length > 160) {
      return NextResponse.json(
        {
          success: false,
          msg: "Meta Description should not exceed 160 characters",
        },
        {
          status: 400,
        }
      );
    }

    try {
      new URL(canonicalUrl);
    } catch {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid Canonical URL",
        },
        {
          status: 400,
        }
      );
    }

    const exists = await SEO.findOne({
      pageName: pageName.toLowerCase(),
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO already exists for this page",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // Upload OG Image
    // ==========================

    const ogBytes = await ogImageFile.arrayBuffer();
    const ogBuffer = Buffer.from(ogBytes);

    const ogBase64 = `data:${ogImageFile.type};base64,${ogBuffer.toString(
      "base64"
    )}`;

    const ogUpload = await cloudinary.uploader.upload(ogBase64, {
      folder: "lawyer-seo",
    });

    // ==========================
    // Upload Twitter Image
    // ==========================

    const twitterBytes = await twitterImageFile.arrayBuffer();
    const twitterBuffer = Buffer.from(twitterBytes);

    const twitterBase64 = `data:${twitterImageFile.type};base64,${twitterBuffer.toString(
      "base64"
    )}`;

    const twitterUpload = await cloudinary.uploader.upload(twitterBase64, {
      folder: "lawyer-seo",
    });

    const seo = await SEO.create({
      pageName: pageName.toLowerCase(),
      metaTitle,
      metaDescription,
      canonicalUrl,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage: ogUpload.secure_url,
      twitterTitle,
      twitterDescription,
      twitterImage: twitterUpload.secure_url,
      schemaType,
      schemaJson,
    });

    return NextResponse.json({
      success: true,
      msg: "SEO created successfully",
      seo,
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

/* ==========================================
   GET SEO BY PAGE NAME (PUBLIC — used by frontend pages)
========================================== */

export const getSeoByPageName = async (pageName) => {
  try {
    await connectDB();

    const seo = await SEO.findOne({
      pageName: pageName.toLowerCase(),
    });

    if (!seo) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      seo,
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

/* ==========================================
   GET ALL SEO
========================================== */

export const getAllSEO = async () => {
  try {
    await connectDB();

    const seo = await SEO.find()
      .select("-__v")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      seo,
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

/* ==========================================
   GET SEO BY ID
========================================== */

export const getSEOById = async (id) => {
  try {
    await connectDB();

    const seo = await SEO.findById(id);

    if (!seo) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      seo,
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

/* ==========================================
   UPDATE SEO
========================================== */

export const updateSEO = async (req, id) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const pageName = formData.get("pageName");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const canonicalUrl = formData.get("canonicalUrl");
    const metaKeywords = formData.get("metaKeywords");

    const ogTitle = formData.get("ogTitle");
    const ogDescription = formData.get("ogDescription");

    const twitterTitle = formData.get("twitterTitle");
    const twitterDescription = formData.get("twitterDescription");

    const schemaType = formData.get("schemaType");
    const schemaJson = formData.get("schemaJson");

    const ogImageFile = formData.get("ogImage");
    const twitterImageFile = formData.get("twitterImage");

    const seo = await SEO.findById(id);

    if (!seo) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO not found",
        },
        {
          status: 404,
        }
      );
    }

    if (metaTitle && metaTitle.length > 60) {
      return NextResponse.json(
        {
          success: false,
          msg: "Meta Title should not exceed 60 characters",
        },
        {
          status: 400,
        }
      );
    }

    if (metaDescription && metaDescription.length > 160) {
      return NextResponse.json(
        {
          success: false,
          msg: "Meta Description should not exceed 160 characters",
        },
        {
          status: 400,
        }
      );
    }

    if (canonicalUrl) {
      try {
        new URL(canonicalUrl);
      } catch {
        return NextResponse.json(
          {
            success: false,
            msg: "Invalid Canonical URL",
          },
          {
            status: 400,
          }
        );
      }
    }

    if (pageName && pageName !== seo.pageName) {
      const exists = await SEO.findOne({
        pageName: pageName.toLowerCase(),
        _id: { $ne: id },
      });

      if (exists) {
        return NextResponse.json(
          {
            success: false,
            msg: "Page Name already exists",
          },
          {
            status: 400,
          }
        );
      }
    }

    // ============================
    // Update OG Image
    // ============================

    if (ogImageFile && ogImageFile.size > 0) {

      if (seo.ogImage) {
        const publicId = seo.ogImage
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `lawyer-seo/${publicId}`
        );
      }

      const bytes = await ogImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = `data:${ogImageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "lawyer-seo",
      });

      seo.ogImage = upload.secure_url;
    }

    // ============================
    // Update Twitter Image
    // ============================

    if (twitterImageFile && twitterImageFile.size > 0) {

      if (seo.twitterImage) {
        const publicId = seo.twitterImage
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `lawyer-seo/${publicId}`
        );
      }

      const bytes = await twitterImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = `data:${twitterImageFile.type};base64,${buffer.toString(
        "base64"
      )}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "lawyer-seo",
      });

      seo.twitterImage = upload.secure_url;
    }

    seo.pageName = pageName
      ? pageName.toLowerCase()
      : seo.pageName;

    seo.metaTitle = metaTitle ?? seo.metaTitle;
    seo.metaDescription =
      metaDescription ?? seo.metaDescription;
    seo.canonicalUrl =
      canonicalUrl ?? seo.canonicalUrl;
    seo.metaKeywords =
      metaKeywords ?? seo.metaKeywords;

    seo.ogTitle = ogTitle ?? seo.ogTitle;
    seo.ogDescription =
      ogDescription ?? seo.ogDescription;

    seo.twitterTitle =
      twitterTitle ?? seo.twitterTitle;

    seo.twitterDescription =
      twitterDescription ??
      seo.twitterDescription;

    seo.schemaType =
      schemaType ?? seo.schemaType;

    seo.schemaJson =
      schemaJson ?? seo.schemaJson;

    await seo.save();

    return NextResponse.json({
      success: true,
      msg: "SEO updated successfully",
      seo,
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

/* ==========================================
   DELETE SEO
========================================== */

export const deleteSEO = async (id) => {
  try {
    await connectDB();

    const seo = await SEO.findById(id);

    if (!seo) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO not found",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================
    // Delete OG Image
    // ==========================

    if (seo.ogImage) {
      const publicId = seo.ogImage
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(
        `lawyer-seo/${publicId}`
      );
    }

    // ==========================
    // Delete Twitter Image
    // ==========================

    if (seo.twitterImage) {
      const publicId = seo.twitterImage
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(
        `lawyer-seo/${publicId}`
      );
    }

    await SEO.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      msg: "SEO deleted successfully",
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