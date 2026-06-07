# Lead Magnet PDF — Outline & Production Notes

**Title:** घुटने के दर्द से राहत — 10 दिन के टिप्स
**English subtitle:** 10-Day Knee Pain Relief Guide by Dr. Dheeraj Dubay
**Audience:** Hindi-speaking patients 45+ who haven't yet booked surgery
**Goal:** Build trust + capture phone, NOT replace medical advice

---

## Page 1 — Cover

- **Title (large, Devanagari):** घुटने के दर्द से राहत
- **Subtitle:** 10 दिन में बेहतर महसूस करने के डॉक्टर-अनुमोदित घरेलू उपाय
- **Author byline:** Dr. Dheeraj Dubay — Director, Robotic Joint Replacement, Shalby Hospital Jaipur
- **Credentials line (smaller):** 23+ वर्ष अनुभव · 35,000+ सफल सर्जरी · Forbes World Record
- **Hero visual:** Photo of the doctor in OPD OR an X-ray with positive imagery
- **Footer:** Website + WhatsApp number

---

## Page 2 — About Dr. Dheeraj Dubay (trust section)

- 3-paragraph intro in Hindi
- Bullet-list of credentials (MBBS, MS Ortho, FJRS Germany)
- "अब तक 60,000+ मरीज़ों ने डॉ. दुबे से इलाज लिया है"
- Photo + signature

---

## Page 3 — Important note (medical disclaimer)

**यह गाइड किसके लिए है:**
- ✓ जिनको कभी-कभी घुटने में दर्द या सूजन हो
- ✓ जो सर्जरी से बचने के लिए जल्दी कदम उठाना चाहते हैं
- ✓ जो अपने डॉक्टर से बात करने से पहले जानकारी चाहते हैं

**यह गाइड किसके लिए नहीं है:**
- ✗ अगर 3+ महीने से लगातार तेज़ दर्द है — सीधे डॉक्टर से मिलें
- ✗ अगर चोट लगी हो — तुरंत X-ray करवाएं
- ✗ अगर बुखार के साथ जोड़ों में सूजन — संक्रमण हो सकता है

**यह सलाह डॉक्टर की जगह नहीं है। दर्द बढ़े तो डॉ. दुबे को +91-89553-73205 पर WhatsApp करें।**

---

## Pages 4–8 — The 10 Tips (2 per page, with visual)

Each tip:
- **Hindi heading** (e.g., "1. रोज़ 10 मिनट गर्म पानी से सेंक")
- **What to do** (3–4 lines in simple Hindi)
- **Why it works** (1 line)
- **When to stop** (1 line — safety)
- Small icon or illustration

### Tip suggestions (doctor to validate before publish):
1. रोज़ 10 मिनट गर्म पानी से सेंक — सुबह और रात
2. हल्दी-दूध सोने से पहले — सूजन कम करता है (हल्दी 1/2 चम्मच)
3. वज़न कम रखें — हर 1 किलो वज़न = घुटनों पर 4 किलो दबाव
4. कुर्सी पर बैठने का अभ्यास — ज़मीन/पालथी से बचें
5. सीढ़ियाँ धीरे चढ़ें — मज़बूत पैर पहले ऊपर, कमज़ोर पैर पहले नीचे
6. क्वाड्रिसेप्स (जांघ की मांसपेशी) मज़बूत करने का व्यायाम — 5 मिनट रोज़
7. विटामिन D + कैल्शियम वाला आहार — दूध, दही, हरी सब्ज़ी, धूप
8. लंबे समय तक एक ही पोज़ में न बैठें — हर 30 मिनट पर हिलें
9. आरामदायक जूते पहनें — एड़ी और टखने को सहारा दें
10. पानी पीते रहें — दिन में 8–10 गिलास (जोड़ की चिकनाई के लिए)

---

## Page 9 — When surgery becomes the right answer

- 5 warning signs that mean it's time to consult a specialist (Hindi)
- Reassurance: "Robotic Knee Replacement से अब 1 दिन में चलना संभव है"
- Photo: a smiling patient post-surgery (with consent)

---

## Page 10 — How to reach Dr. Dubay

- **WhatsApp:** +91-89553-73205 (with QR code)
- **Clinic:** Shalby Hospital Jaipur + Vidhyadhar Nagar
- **Website:** drdubay.in
- **OPD camps:** "हम Churu, Sardarsahar, Sikar, Bikaner, Jhunjhunu में हर महीने OPD camp लगाते हैं — WhatsApp करके अगली तारीख जानें"
- **CTA button on PDF:** "अभी अपॉइंटमेंट बुक करें" (WhatsApp deep link)

---

## Design notes for the PDF designer

- **Format:** A4 portrait, ~10 pages
- **Font:** Noto Sans Devanagari (Hindi), Open Sans / Roboto (English/numbers)
- **Color palette:** Brand blue `#2563eb` + emerald `#10b981` accent (matches drdubay.in)
- **File size:** Target under 2 MB so it downloads fast on Jaipur 4G
- **Filename:** `ghutne-ke-dard-se-rahat.pdf`
- **Drop location:** `drdubey-v2/public/downloads/ghutne-ke-dard-se-rahat.pdf`
- **Replaces:** the current placeholder PDF in the same path

---

## After the real PDF is ready

1. Place the file at `drdubey-v2/public/downloads/ghutne-ke-dard-se-rahat.pdf`
2. Commit + push (deploys automatically via Vercel)
3. Verify: open drdubay.in in an incognito tab, wait 20 seconds, fill the popup form → PDF should auto-download
4. Check `/admin/patients` — the new Lead row will have `source: "lead-magnet"`

## Open questions for the doctor

- Are all 10 tips medically sound and brand-safe?
- Should we add a section on Ayurveda / traditional remedies, or stick to medical evidence-based advice?
- Patient consent for the post-surgery photo on page 9?
- Any specific phrasing the doctor wants for the "when to consider surgery" page?
