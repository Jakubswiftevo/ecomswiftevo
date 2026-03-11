export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await context.request.json();

    const name = body.name || "Nieznany";
    const email = body.email || "-";
    const store = body.store || "-";
    const mod = body.module || "-";
    const msg = body.msg || "-";

    const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#1e293b;border-bottom:2px solid #3b82f6;padding-bottom:10px;">Nowy lead ze strony EcomSwiftEvo</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="padding:8px;color:#64748b;width:140px;">Imię</td><td style="padding:8px;color:#1e293b;font-weight:600;">${name}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:8px;color:#64748b;">Sklep</td><td style="padding:8px;color:#1e293b;">${store}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Zainteresowanie</td><td style="padding:8px;color:#1e293b;font-weight:600;">${mod}</td></tr>
  </table>
  <div style="background:#f1f5f9;padding:15px;border-radius:8px;margin:20px 0;">
    <p style="color:#64748b;margin:0 0 5px;font-size:12px;">WIADOMOŚĆ</p>
    <p style="color:#1e293b;margin:0;line-height:1.6;">${msg}</p>
  </div>
  <p style="color:#94a3b8;font-size:12px;">Wysłano z formularza ecomswiftevo.pl</p>
</div>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "EcomSwiftEvo <onboarding@resend.dev>",
        to: "kontakt@swiftevo.eu",
        subject: `Nowy lead: ${name} — ${mod}`,
        html: html,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const err = await resendResponse.text();
      return new Response(JSON.stringify({ status: "error", detail: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", detail: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
