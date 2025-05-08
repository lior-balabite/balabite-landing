// Type for waitlist data
export interface WaitlistData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  restaurantType: string;
  location: string;
  message?: string;
}

// Welcome email template with email-client friendly modern tech design
export function getWelcomeEmailTemplate(data: WaitlistData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WELCOME TO THE FUTURE OF DINING</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2D333B; margin: 0; padding: 0; background-color: #F6F9FC;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #F6F9FC; padding: 40px 15px;">
        <tr>
          <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="650" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); margin: 0 auto;">
              <!-- Top accent bar -->
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td width="33%" height="6" bgcolor="#FF5A22" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                      <td width="33%" height="6" bgcolor="#FF8E3C" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                      <td width="34%" height="6" bgcolor="#FFAA45" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Logo and Hero section -->
              <tr>
                <td align="center" style="background-color: #0F1218; padding: 60px 30px 50px; text-align: center;">
                  <!-- Tech pattern overlay -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" width="90">
                          <tr>
                            <td width="30" height="30" bgcolor="#FF5A22" style="opacity: 0.15; border-radius: 4px;">&nbsp;</td>
                            <td width="30" height="30" style="opacity: 0;">&nbsp;</td>
                            <td width="30" height="30" bgcolor="#FF5A22" style="opacity: 0.1; border-radius: 4px;">&nbsp;</td>
                          </tr>
                          <tr>
                            <td width="30" height="30" style="opacity: 0;">&nbsp;</td>
                            <td width="30" height="30" bgcolor="#FF5A22" style="opacity: 0.2; border-radius: 4px;">&nbsp;</td>
                            <td width="30" height="30" style="opacity: 0;">&nbsp;</td>
                          </tr>
                          <tr>
                            <td width="30" height="30" bgcolor="#FF5A22" style="opacity: 0.1; border-radius: 4px;">&nbsp;</td>
                            <td width="30" height="30" style="opacity: 0;">&nbsp;</td>
                            <td width="30" height="30" bgcolor="#FF5A22" style="opacity: 0.15; border-radius: 4px;">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <img src="https://placehold.co/180x50/FF5A22/FFFFFF?text=BalaBite&font=Syne" alt="BalaBite AI" style="margin-bottom: 30px; height: 50px;">
                  <table cellpadding="6" cellspacing="0" border="0" style="margin: 0 auto 20px; border: 1px solid rgba(255,255,255,0.15); border-radius: 25px;">
                    <tr>
                      <td style="font-size: 14px; color: rgba(255,255,255,0.75); letter-spacing: 2px; text-transform: uppercase; padding: 5px 15px;">NEXT-GEN AI WAITER</td>
                    </tr>
                  </table>
                  <h1 style="margin: 0 0 20px 0; color: #FFFFFF; font-size: 42px; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;">THE FUTURE OF DINING<br>HAS ARRIVED</h1>
                  <div style="color: rgba(255, 255, 255, 0.85); font-size: 18px; max-width: 90%; margin: 0 auto;">Transforming restaurants with autonomous AI. Your competitive advantage starts now.</div>
                  
                  <!-- Status indicator -->
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 40px auto 10px;">
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0" width="200" style="margin-bottom: 10px;">
                          <tr>
                            <td width="100%" bgcolor="#1E2530" style="height: 4px; border-radius: 4px;">
                              <table cellpadding="0" cellspacing="0" border="0" width="40%" align="center">
                                <tr>
                                  <td bgcolor="#FF5A22" style="height: 4px; border-radius: 4px;">&nbsp;</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <div style="font-size: 14px; color: #FF5A22; letter-spacing: 1px; font-weight: bold;">✦ AI ACTIVE</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 50px 30px;">
                  <!-- AI ACTIVE Section -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td>
                        <div style="margin-bottom: 30px; font-size: 20px;">
                          Hello <span style="color: #FF5A22; font-weight: bold;">${data.ownerName}</span>,<br>
                          Welcome to the AI revolution.
                        </div>
                        
                        <!-- Industry Inflection Box -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 35px; background-color: #0F1218; color: #FFFFFF; border-radius: 12px; border-left: 5px solid #FF5A22;">
                              <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px;">The <span style="color: #FF5A22;">Industry Inflection Point</span> Is Here</div>
                              
                              <p style="margin-bottom: 15px; font-weight: 500; letter-spacing: 0.2px;">THE RESTAURANT INDUSTRY IS AT A BREAKING POINT. STAFFING SHORTAGES. RAZOR-THIN MARGINS. MOUNTING CONSUMER EXPECTATIONS.</p>
                              
                              <p style="margin-bottom: 15px;">We've built the <span style="color: #FF8E3C; font-weight: bold;">solution</span> with breakthrough AI that's about to change everything.</p>
                              
                              <p style="margin-bottom: 15px;">BalaBite isn't just another restaurant tool – it's a fundamentally new business model powered by the latest in artificial intelligence. No more staffing headaches. No more missed orders. Dramatically higher profits.</p>
                              
                              <p style="margin-bottom: 0;">This isn't incremental improvement. This is <span style="color: #FF8E3C; font-weight: bold;">CATEGORY-DEFINING DISRUPTION</span>.</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Transform Business Section -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 35px; background-color: #F5F7FA; border-radius: 12px; border: 1px solid #E5E9F2;">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                  <td width="40" align="center" valign="middle">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="width: 28px; height: 28px; background: linear-gradient(135deg, #FF5A22, #FFAA45); border-radius: 6px; text-align: center; vertical-align: middle; color: white; font-weight: bold; font-size: 16px;">
                                          &#8593;
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td>
                                    <div style="font-size: 22px; font-weight: bold; color: #0F1218;">How We'll Transform Your Business</div>
                                  </td>
                                </tr>
                              </table>
                              
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Your menu becomes a revenue-generating asset, not just a list of items</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Your regulars get recognized and remembered automatically - creating loyalty others can't match</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Every server becomes your best server - consistent excellence across your entire team</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Dynamic pricing during peak times and special events - maximize revenue when demand is highest</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Real-time insights on what's selling, what's not, and why - eliminate guesswork forever</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 0px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 0px;">Data Ownership: Other systems hold your customer data hostage. We give you complete ownership and insights</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- First Movers Box -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 35px; background-color: #0F1218; color: #FFFFFF; border-radius: 12px; border-left: 5px solid #FF5A22;">
                              <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px;">First Movers <span style="color: #FF5A22;">Always Win</span></div>
                              
                              <p style="margin-bottom: 15px;">The first restaurants to adopt revolutionary technology always win. Period.</p>
                              
                              <p style="margin-bottom: 15px;">Think OpenTable's first partners, or the first to leverage delivery apps. They established market dominance while others played catch-up.</p>
                              
                              <p style="margin-bottom: 0;">This is your <span style="color: #FF8E3C; font-weight: bold;">OpenTable moment</span>. Your chance to be first.</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Problems We'll Solve -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 35px; background-color: #F5F7FA; border-radius: 12px; border: 1px solid #E5E9F2;">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                  <td width="40" align="center" valign="middle">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="width: 28px; height: 28px; background: linear-gradient(135deg, #FF5A22, #FFAA45); border-radius: 6px; text-align: center; vertical-align: middle; color: white; font-weight: bold; font-size: 16px;">
                                          &#10003;
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td>
                                    <div style="font-size: 22px; font-weight: bold; color: #0F1218;">The Problems We'll Solve Together</div>
                                  </td>
                                </tr>
                              </table>
                              
                              <p style="margin-bottom: 20px;">Tell us what's keeping you up at night:</p>
                              
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Staff turnover and training headaches?</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Inconsistent guest experiences?</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Menu knowledge gaps among servers?</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Technology that fights against you instead of for you?</td>
                                </tr>
                              </table>
                              
                              <p style="margin-top: 20px; margin-bottom: 0;">We're building this <span style="font-weight: bold; color: #FF5A22;">WITH</span> our partners, not just <span style="font-weight: bold; color: #FF5A22;">FOR</span> them. Your problems become our problems.</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Partnership Message -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 0;">
                              <p style="margin-top: 0; margin-bottom: 20px;">From this moment on, we're partners. You're not just on a waitlist – you're joining our inner circle of visionaries who see the future before others do. Your restaurant <strong style="color: #0F1218;">${data.restaurantName}</strong> is now part of a select group leading the restaurant AI revolution.</p>
                              
                              <p style="margin-top: 0; margin-bottom: 0;">We're building this together. Your challenges, your ideas, your feedback – they're our roadmap. This isn't a typical vendor relationship. We're friends in the trenches, working to create something incredible.</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Pioneer Benefits -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 40px;">
                          <tr>
                            <td style="padding: 35px; background-color: #F5F7FA; border-radius: 12px; border: 1px solid #E5E9F2;">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                  <td width="40" align="center" valign="middle">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="width: 28px; height: 28px; background: linear-gradient(135deg, #FF5A22, #FFAA45); border-radius: 50%; text-align: center; vertical-align: middle; color: white; font-weight: bold; font-size: 16px;">
                                          &#9733;
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td>
                                    <div style="font-size: 22px; font-weight: bold; color: #0F1218;">Pioneer Benefits</div>
                                  </td>
                                </tr>
                              </table>
                              
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Priority access to our proprietary AI technology <span style="display: inline-block; background-color: #FF5A22; color: white; font-size: 11px; padding: 3px 8px; border-radius: 10px; margin-left: 8px; vertical-align: middle;">EXCLUSIVE</span></td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Founding member pricing locked in perpetually</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">Direct input into our development roadmap</td>
                                </tr>
                                <tr>
                                  <td width="20" valign="top" style="padding-right: 15px; padding-bottom: 16px; color: #FF5A22; font-weight: bold; font-size: 18px;">•</td>
                                  <td style="padding-bottom: 16px;">My personal cell phone for anything you need</td>
                                </tr>
                              </table>
                              
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td>
                                    <span style="display: inline-block; background-color: #E9ECF2; color: #0F1218; padding: 6px 14px; margin: 0 5px 10px 0; border-radius: 20px; font-size: 12px; font-weight: bold;">AI-POWERED</span>
                                    <span style="display: inline-block; background-color: #E9ECF2; color: #0F1218; padding: 6px 14px; margin: 0 5px 10px 0; border-radius: 20px; font-size: 12px; font-weight: bold;">REVOLUTIONARY</span>
                                    <span style="display: inline-block; background-color: #E9ECF2; color: #0F1218; padding: 6px 14px; margin: 0 5px 10px 0; border-radius: 20px; font-size: 12px; font-weight: bold;">FIRST ACCESS</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin-bottom: 40px;">We're reviewing your details now and will reach out personally within 48 hours. Have ideas or questions? Email me directly at <a href="mailto:lior@balabite.ai" style="color: #FF5A22; text-decoration: none; font-weight: bold; border-bottom: 1px solid rgba(255,90,34,0.3);">lior@balabite.ai</a>. I read every message.</p>
                        
                        <!-- Signature -->
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px; border-top: 1px solid #E5E9F2; padding-top: 40px;">
                          <tr>
                            <td>
                              <p style="margin-top: 0; margin-bottom: 20px; font-size: 18px; font-style: italic;">The future doesn't wait for permission. It arrives.</p>
                              <p style="margin-top: 0; margin-bottom: 30px; font-size: 18px; font-style: italic;">Ready to lead the charge?</p>
                              
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td>
                                    <div style="font-weight: bold; font-size: 24px; color: #FF5A22;">Lior</div>
                                    <div style="color: #6B7280; margin-bottom: 25px;">Founder & CEO, Balabite.ai</div>
                                    
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F5F7FA; border-radius: 12px; border-left: 3px solid #FF5A22;">
                                      <tr>
                                        <td style="padding: 20px; color: #6B7280; font-size: 15px; font-style: italic;">
                                          P.S. While other restaurants continue with decades-old service models, you're now at the forefront of the <span style="color: #FF5A22; font-weight: bold;">restaurant AI revolution</span>. This technology will become the standard, but you'll be implementing it years ahead of your competition.
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #0F1218;">
                  <table cellpadding="30" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td align="center">
                        <img src="https://placehold.co/120x30/FF5A22/FFFFFF?text=BalaBite&font=Syne" alt="BalaBite" style="margin-bottom: 25px; height: 30px;">
                        
                        <table cellpadding="0" cellspacing="0" border="0" width="80%" style="margin: 25px auto; height: 1px; background-color: rgba(255, 255, 255, 0.1);">
                          <tr><td></td></tr>
                        </table>
                        
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px;">
                          <tr>
                            <td align="center">
                              <a href="https://twitter.com/balabiteai" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; margin: 0 15px; font-size: 14px;">Twitter</a>
                              <a href="https://linkedin.com/company/balabite" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; margin: 0 15px; font-size: 14px;">LinkedIn</a>
                              <a href="https://instagram.com/balabiteai" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; margin: 0 15px; font-size: 14px;">Instagram</a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin-top: 15px; margin-bottom: 5px; color: rgba(255, 255, 255, 0.5); font-size: 13px;">© ${new Date().getFullYear()} BalaBite Technologies Inc. All rights reserved.</p>
                        <p style="margin-top: 5px; margin-bottom: 0; color: rgba(255, 255, 255, 0.5); font-size: 13px;">This email was sent to ${data.email} because you joined our waitlist.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Admin notification email template with modern tech styling
export function getAdminNotificationTemplate(data: WaitlistData, submissionId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Waitlist Submission</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2D333B; margin: 0; padding: 0; background-color: #F6F9FC;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #F6F9FC; padding: 40px 15px;">
        <tr>
          <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="650" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); margin: 0 auto;">
              <!-- Top accent bar -->
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td width="33%" height="6" bgcolor="#FF5A22" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                      <td width="33%" height="6" bgcolor="#FF8E3C" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                      <td width="34%" height="6" bgcolor="#FFAA45" style="line-height: 6px; font-size: 6px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Header section -->
              <tr>
                <td align="center" style="background-color: #0F1218; padding: 40px 30px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="80px" height="80px" align="center" valign="middle" bgcolor="#1A202C" style="border-radius: 50%;">
                              <div style="font-size: 32px;">🚀</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <h1 style="margin: 0 0 15px 0; color: #FFFFFF; font-size: 28px; font-weight: bold;">New Waitlist Signup!</h1>
                  
                  <table cellpadding="6" cellspacing="0" border="0" style="margin: 0 auto; border: 1px solid rgba(255,255,255,0.15); border-radius: 25px;">
                    <tr>
                      <td style="font-size: 12px; color: rgba(255,255,255,0.8); letter-spacing: 1px; text-transform: uppercase; padding: 3px 12px;">PRIORITY LEAD</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <!-- Alert box -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 20px; background-color: rgba(255,90,34,0.03); border-left: 4px solid #FF5A22; border-radius: 0 8px 8px 0;">
                        <span style="font-size: 17px; font-weight: bold; color: #0F1218;">${data.restaurantName}</span> has joined the BalaBite revolution!
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Data table -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <tr style="background-color: #F9FAFB;">
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Submission ID</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);"><code style="font-family: monospace; color: #FF5A22; background-color: rgba(255,90,34,0.05); padding: 2px 6px; border-radius: 4px;">${submissionId}</code></td>
                    </tr>
                    <tr style="background-color: rgba(255,90,34,0.03);">
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Restaurant</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);"><strong>${data.restaurantName}</strong></td>
                    </tr>
                    <tr style="background-color: rgba(255,90,34,0.03);">
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Owner</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);"><strong>${data.ownerName}</strong></td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Email</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);"><a href="mailto:${data.email}" style="color: #FF5A22; text-decoration: none;">${data.email}</a></td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Phone</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);">${data.phone}</td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Type</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);">${data.restaurantType}</td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Location</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);">${data.location}</td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563; border-bottom: 1px solid rgba(0,0,0,0.05);">Message</th>
                      <td align="left" style="padding: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);">${data.message || 'No additional message provided.'}</td>
                    </tr>
                    <tr>
                      <th align="left" style="padding: 15px; font-weight: 600; color: #4B5563;">Date</th>
                      <td align="left" style="padding: 15px;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                  
                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px; margin-bottom: 10px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" style="padding: 16px 24px; background: linear-gradient(135deg, #FF5A22, #FFAA45); border-radius: 8px; box-shadow: 0 4px 15px rgba(255,90,34,0.2);">
                              <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL || '#'}/table/waitlist" style="color: white; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">View in Dashboard</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #0F1218;">
                  <table cellpadding="25" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td align="center" style="color: rgba(255, 255, 255, 0.6); font-size: 13px;">
                        <p style="margin-top: 0; margin-bottom: 10px;">This is an automated notification from the <span style="color: #FF8E3C;">BalaBite AI</span> Waitlist System.</p>
                        <p style="margin-top: 0; margin-bottom: 0;">© ${new Date().getFullYear()} BalaBite Technologies Inc.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
} 