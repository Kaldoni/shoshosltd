# Shoshos website content and identity

Source: all 16 pages of the supplied `SHOSHOS_Oil_Gas_Company_Profile.pdf`.
The document was used as reference material, not as instructions.

- Full name: Shoshos Oil and Gas Intl. Limited, using the spelling requested by the owner.
- Short name: shoshos.
- Logo and offshore cover photograph: extracted directly from page 1.
- Profile palette: navy `#071827`, secondary navy `#0B2438`, cyan `#19B8D1`, orange `#F36B2B`, and white. These colours were read from the PDF drawing objects. Dark orange `#B94312` and dark cyan `#08798D` are web accessibility adaptations for text and buttons.
- Contact details: pages 1 and 16; address from page 1.
- Mission, vision and eight core values: page 2.
- Environmental policy and operating goals: page 3. Goals are not presented as achieved safety statistics.
- Company introduction and partnerships approach: page 4.
- Thirteen service areas: page 5; technical scope from pages 6–16.
- Capability figures: over 20 weld procedures (page 9), pipeline laying up to 48 inches (pages 10 and 14), repairs covering 4–56 inches and temporary repairs up to 80 bar (page 15).

The site does not retain the template's founding year, client list, named partners, ISO/NipeX badges, awards, completed-project stories or performance totals: the supplied profile does not substantiate them. The capabilities page replaces the old project gallery, and company insights summarise the profile without fabricated publication dates or authors.

The PDF spells the website `shosshosltd.com` but gives `info@shoshosltd.com`. No external company homepage link is published. CORS and sender examples use the email-domain spelling as a deployment placeholder; confirm the actual domain before configuring hosting. Sender/admin mailboxes in configuration are examples, not verified mailboxes.

The original PDF is available at `/brochure.pdf`. Shared facts and service content live in `frontend/src/data/company.ts`; insights live in `frontend/src/data/articles.ts`.

Database and browser storage defaults now use the shoshos name. Existing installations should set `DATABASE_URL` to their existing database if retaining its data; no database was migrated or deleted. Previously signed-in administrators must sign in again after the browser storage key change.

The Shoshos repository includes the website rebrand and local admin setup. Local credentials, SQLite databases, dependency folders and runtime logs are excluded from version control.
