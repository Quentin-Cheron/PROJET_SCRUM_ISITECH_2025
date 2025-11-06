import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const emailsString = formData.get("emails") as string;

    if (!emailsString) {
      return NextResponse.json(
        { error: "Aucun email fourni" },
        { status: 400 },
      );
    }

    const emails: string[] = JSON.parse(emailsString);

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 },
      );
    }

    if (emails.length === 0) {
      return NextResponse.json(
        { error: "Aucun destinataire fourni" },
        { status: 400 },
      );
    }

    // Convertir les fichiers en attachments pour Resend
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return {
          filename: file.name,
          content: buffer,
        };
      }),
    );

    // Envoyer l'email à chaque destinataire
    const results = await Promise.allSettled(
      emails.map(async (email) => {
        return await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: "quentin.cheron26200@hotmail.com",
          subject: "Nouveaux fichiers partagés avec vous",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Nouveaux fichiers partagés</h2>
              <p>Bonjour,</p>
              <p>Vous avez reçu ${files.length} fichier${files.length > 1 ? "s" : ""} :</p>
              <ul style="list-style: none; padding: 0;">
                ${files
                  .map(
                    (file) =>
                      `<li style="margin: 8px 0; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                        📎 ${file.name} (${(file.size / 1024).toFixed(2)} KB)
                      </li>`,
                  )
                  .join("")}
              </ul>
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                Les fichiers sont joints à cet email.
              </p>
            </div>
          `,
          attachments,
        });
      }),
    );

    // Compter les succès et les échecs
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    if (failed > 0) {
      return NextResponse.json(
        {
          success: true,
          message: `Envoi partiel : ${succeeded} réussi(s), ${failed} échoué(s)`,
          succeeded,
          failed,
        },
        { status: 207 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Fichiers envoyés avec succès à ${succeeded} destinataire(s)`,
      succeeded,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi des fichiers:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi des fichiers" },
      { status: 500 },
    );
  }
}
