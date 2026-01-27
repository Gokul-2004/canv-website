// Supabase Edge Function to send registration confirmation email with token
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@certinal.com'

serve(async (req) => {
  try {
    // Get the request body
    const { record } = await req.json()

    // Generate a unique token number (6 digits)
    const tokenNumber = String(Math.floor(100000 + Math.random() * 900000))

    // Update the record with the token number
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update the registration with token number
    const { error: updateError } = await supabaseAdmin
      .from('thit_registrations')
      .update({ token_number: tokenNumber })
      .eq('id', record.id)

    if (updateError) {
      console.error('Error updating token:', updateError)
    }

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #14AC53 0%, #0d7a3a 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .token-box {
              background: #f5f5f5;
              border: 2px dashed #14AC53;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .token-number {
              font-size: 32px;
              font-weight: bold;
              color: #14AC53;
              letter-spacing: 4px;
            }
            .footer {
              background: #f9f9f9;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              background: #14AC53;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Registering!</h1>
            <p>Certinal at Apollo THIT 2026</p>
          </div>
          <div class="content">
            <p>Dear ${record.name || 'Valued Guest'},</p>
            
            <p>Thank you for registering to receive your copy of <strong>"When the CIO Holds the Scalpel"</strong> at THIT 2026!</p>
            
            <div class="token-box">
              <p style="margin: 0 0 10px 0; font-weight: bold;">Your Collection Token:</p>
              <div class="token-number">${tokenNumber}</div>
            </div>
            
            <p><strong>Please present this token number at Booth #121</strong> to collect your complimentary copy of the book.</p>
            
            <p><strong>Event Details:</strong></p>
            <ul>
              <li><strong>Date:</strong> January 30–31, 2026</li>
              <li><strong>Location:</strong> HICC, Hyderabad, India</li>
              <li><strong>Booth:</strong> #121</li>
            </ul>
            
            <p>We look forward to meeting you at the event!</p>
            
            <p>Best regards,<br>The Certinal Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>© 2026 Certinal. All Rights Reserved.</p>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [record.email],
        subject: 'Your Book Collection Token - Certinal at THIT 2026',
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.json()
      throw new Error(`Resend API error: ${JSON.stringify(error)}`)
    }

    const emailData = await resendResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        tokenNumber,
        emailId: emailData.id 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
