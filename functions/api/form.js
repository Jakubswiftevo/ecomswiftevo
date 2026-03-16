export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body = await context.request.json();
    const source = body.source || "ecomswiftevo.pl";

    let subject, html;

    if (source === "lead-magnet") {
      // Lead magnet — poradnik PDF
      const name = body.name || "";
      const email = body.email || "";
      const store = body.store || "";

      if (!email || !email.includes("@")) {
        return new Response(JSON.stringify({ status: "error", detail: "Invalid email" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 1. Wyślij PDF do leada
      const leadEmail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "EcomSwiftEvo <kontakt@swiftevo.eu>",
          to: email,
          subject: "Twój poradnik: 5 Automatyzacji AI dla E-commerce",
          html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:0;">
  <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:40px 30px;border-radius:8px 8px 0 0;">
    <p style="color:#3b82f6;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">SwiftEvo — AI Automation Agency</p>
    <h1 style="color:#ffffff;font-size:22px;margin:0;line-height:1.3;">Twój poradnik jest gotowy!</h1>
  </div>
  <div style="padding:30px;background:#ffffff;">
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 20px;">${name ? `Cześć ${name}!` : "Cześć!"}</p>
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 24px;">Dziękujemy za zainteresowanie. Oto Twój darmowy poradnik — <strong>5 Automatyzacji AI, które oszczędzają sklepom online 20 godzin tygodniowo</strong>.</p>
    <div style="text-align:center;margin:28px 0;">
      <a href="https://ecomswiftevo.pl/assets/5-automatyzacji-ai-ecommerce.pdf" style="display:inline-block;padding:14px 32px;background:#3b82f6;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">Pobierz PDF</a>
    </div>
    <p style="color:#64748b;font-size:14px;line-height:1.7;margin:24px 0 0;">Chcesz zobaczyć jak te automatyzacje wyglądałyby w Twoim sklepie? Umów się na bezpłatną 30-minutową konsultację:</p>
    <div style="text-align:center;margin:20px 0;">
      <a href="https://calendly.com/jakubsocha-ai/bezplatna-konsultacja-ai-automatyzacji" style="display:inline-block;padding:12px 28px;background:#ffffff;color:#3b82f6;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;border:2px solid #3b82f6;">Zarezerwuj termin</a>
    </div>
  </div>
  <div style="padding:20px 30px;background:#f1f5f9;border-radius:0 0 8px 8px;">
    <p style="color:#94a3b8;font-size:12px;margin:0;text-align:center;">SwiftEvo — AI Automation Agency · <a href="https://ecomswiftevo.pl" style="color:#64748b;">ecomswiftevo.pl</a></p>
  </div>
</div>`,
        }),
      });

      if (!leadEmail.ok) {
        const err = await leadEmail.text();
        return new Response(JSON.stringify({ status: "error", detail: err }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 2. Powiadomienie dla Ciebie o nowym leadzie
      subject = `Nowy lead (poradnik): ${email}`;
      html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#1e293b;border-bottom:2px solid #22c55e;padding-bottom:10px;">Nowy lead — poradnik PDF</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="padding:8px;color:#64748b;width:140px;">Imię</td><td style="padding:8px;color:#1e293b;font-weight:600;">${name || "-"}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td style="padding:8px;color:#64748b;">Sklep</td><td style="padding:8px;color:#1e293b;">${store || "-"}</td></tr>
  </table>
  <p style="color:#94a3b8;font-size:12px;">Lead z landing page: ecomswiftevo.pl/poradnik — ${new Date().toISOString()}</p>
</div>`;

    } else if (source === "brief-wdrozeniowy") {
      // Brief wdrożeniowy
      const name = body.contact_name || "Nieznany";
      const email = body.contact_email || "-";
      const phone = body.contact_phone || "-";
      const role = body.contact_role || "-";
      const channel = body.contact_channel || "-";
      const storeName = body.store_name || "-";
      const storeUrl = body.store_url || "-";
      const platform = body.platform || "-";
      const industry = body.industry || "-";
      const orders = body.orders_monthly || "-";
      const products = body.products_count || "-";
      const teamSize = body.team_size || "-";
      const marketplaces = body.marketplaces || "-";
      const modules = Array.isArray(body.modules) ? body.modules.join(", ") : (body.modules || "-");
      const problem = body.biggest_problem || "-";
      const timeWasted = body.time_wasted || "-";
      const timeline = body.timeline || "-";
      const currentSolution = body.current_solution || "-";
      const emailTool = body.email_tool || "-";
      const crmTool = body.crm_tool || "-";
      const notifChannel = Array.isArray(body.notification_channel) ? body.notification_channel.join(", ") : (body.notification_channel || "-");
      const shippingTool = body.shipping_tool || "-";
      const otherTools = body.other_tools || "-";
      const budgetSetup = body.budget_setup || "-";
      const budgetMonthly = body.budget_monthly || "-";
      const notes = body.notes || "-";

      subject = `Brief wdrożeniowy: ${storeName} (${name})`;

      html = `
<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;">
  <h2 style="color:#1e293b;border-bottom:3px solid #3b82f6;padding-bottom:12px;">Brief wdrożeniowy — ${storeName}</h2>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Sklep</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px;color:#64748b;width:180px;">Nazwa</td><td style="padding:8px;color:#1e293b;font-weight:600;">${storeName}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">URL</td><td style="padding:8px;"><a href="${storeUrl}">${storeUrl}</a></td></tr>
    <tr><td style="padding:8px;color:#64748b;">Platforma</td><td style="padding:8px;color:#1e293b;font-weight:600;">${platform}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Branża</td><td style="padding:8px;">${industry}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Zamówienia/msc</td><td style="padding:8px;font-weight:600;">${orders}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Produkty (SKU)</td><td style="padding:8px;">${products}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Zespół</td><td style="padding:8px;">${teamSize}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Marketplace'y</td><td style="padding:8px;">${marketplaces}</td></tr>
  </table>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Kontakt</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px;color:#64748b;width:180px;">Imię i nazwisko</td><td style="padding:8px;color:#1e293b;font-weight:600;">${name}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Stanowisko</td><td style="padding:8px;">${role}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Telefon</td><td style="padding:8px;font-weight:600;">${phone}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Preferowany kanał</td><td style="padding:8px;">${channel}</td></tr>
  </table>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Wybrane moduły</h3>
  <div style="background:#eff6ff;padding:15px;border-radius:8px;border:1px solid #bfdbfe;">
    <p style="color:#1e40af;margin:0;font-weight:600;font-size:15px;">${modules}</p>
  </div>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Sytuacja klienta</h3>
  <div style="background:#f1f5f9;padding:15px;border-radius:8px;margin-bottom:12px;">
    <p style="color:#64748b;margin:0 0 5px;font-size:11px;text-transform:uppercase;">Największy problem</p>
    <p style="color:#1e293b;margin:0;line-height:1.6;">${problem}</p>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px;color:#64748b;width:180px;">Czas tracony dziennie</td><td style="padding:8px;font-weight:600;">${timeWasted}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Kiedy chce startować</td><td style="padding:8px;font-weight:600;">${timeline}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Obecne rozwiązanie</td><td style="padding:8px;">${currentSolution}</td></tr>
  </table>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Narzędzia</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px;color:#64748b;width:180px;">Email marketing</td><td style="padding:8px;">${emailTool}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">CRM / Arkusze</td><td style="padding:8px;">${crmTool}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Powiadomienia</td><td style="padding:8px;">${notifChannel}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Kurier</td><td style="padding:8px;">${shippingTool}</td></tr>
    <tr><td style="padding:8px;color:#64748b;">Inne</td><td style="padding:8px;">${otherTools}</td></tr>
  </table>

  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Budżet</h3>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px;color:#64748b;width:180px;">Wdrożenie (jednorazowo)</td><td style="padding:8px;font-weight:600;font-size:15px;">${budgetSetup}</td></tr>
    <tr style="background:#f8fafc;"><td style="padding:8px;color:#64748b;">Abonament miesięczny</td><td style="padding:8px;font-weight:600;font-size:15px;">${budgetMonthly}</td></tr>
  </table>

  ${notes !== "-" ? `
  <h3 style="color:#3b82f6;margin:24px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Uwagi</h3>
  <div style="background:#f1f5f9;padding:15px;border-radius:8px;">
    <p style="color:#1e293b;margin:0;line-height:1.6;">${notes}</p>
  </div>` : ""}

  <p style="color:#94a3b8;font-size:12px;margin-top:24px;padding-top:12px;border-top:1px solid #e2e8f0;">Brief wdrożeniowy — ecomswiftevo.pl/formularz-klienta — ${body.ts || new Date().toISOString()}</p>
</div>`;

    } else {
      // Główny formularz kontaktowy (strona główna)
      const name = body.name || "Nieznany";
      const email = body.email || "-";
      const store = body.store || "-";
      const mod = body.module || "-";
      const msg = body.msg || "-";

      subject = `Nowy lead: ${name} — ${mod}`;

      html = `
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
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "EcomSwiftEvo <kontakt@swiftevo.eu>",
        to: "kontakt@swiftevo.eu",
        subject: subject,
        html: html,
        reply_to: body.contact_email || body.email || undefined,
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
