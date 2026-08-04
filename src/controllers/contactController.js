import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import sendEmail from "@/utils/sendEmail";

export const createContact = async (req) => {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      companyName,
      helpType,
      message,
    } = body;

    if (!name || !email || !helpType || !message) {
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

    const contact = await Contact.create({
      name,
      email,
      phone,
      companyName,
      helpType,
      message,
    });

    // Mail Admin
    await sendEmail(
      process.env.EMAIL_USER,
      "New Contact Form Submission",
      `
Name : ${name}

Email : ${email}

Phone : ${phone}

Company : ${companyName}

Help Type : ${helpType}

Message :

${message}
`
    );

    // Mail User
    await sendEmail(
      email,
      "We received your message",
      `Hi ${name},

Thank you for contacting us.

We have received your message successfully.

Our team will contact you soon.

Regards,
Founders Legal Desk`
    );

    return NextResponse.json({
      success: true,
      msg: "Message sent successfully",
      contact,
    });

 } catch (error) {
  console.error("CONTACT ERROR:", error);

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


export const getAllContacts = async () => {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      contacts,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};



export const getContactById = async (id) => {
  try {
    await connectDB();

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          msg: "Contact not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      contact,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};




export const deleteContact = async (id) => {
  try {
    await connectDB();

    await Contact.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      msg: "Contact deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};