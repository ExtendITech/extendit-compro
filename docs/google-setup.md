# Google Sheets Integration Guide

To save the Contact Wizard data directly to a Google Sheet, you can use a Google Apps Script deployed as a Web App. This is a free and secure way to handle form submissions without a dedicated backend.

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Name it "Extend IT Leads" (or similar).
3. In the first row, add headers for your data columns:
   - `Timestamp`
   - `Identity`
   - `Mission`
   - `AI Integration`
   - `Budget`
   - `Timeline`
   - `Name`
   - `Email/Profile`

## Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**.
2. Delete any code in the `Code.gs` file and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.identity,
    data.mission,
    data.aiIntegration,
    data.budget,
    data.timeline,
    data.name,
    data.email,
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy as Web App

1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the following:
   - **Description**: "Lead Form API"
   - **Execute as**: "Me" (your email)
   - **Who has access**: **"Anyone"** (This is crucial so your website can send data without login).
4. Click **Deploy**.
5. Copy the **Web App URL** (it starts with `https://script.google.com/macros/s/...`).

## Step 4: Connect to React App

1. Open `src/components/ContactWizard.tsx`.
2. Find the `handleSubmit` function.
3. Replace the comment with the actual fetch call:

```typescript
const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    await fetch("YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      mode: "no-cors", // Important for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setIsSuccess(true);
  } catch (error) {
    console.error("Error submitting form", error);
    // Handle error (optional)
  } finally {
    setIsSubmitting(false);
  }
};
```

**Note:** The `mode: 'no-cors'` is required for Google Apps Script. This means you won't get a readable response back (like "success"), but the data _will_ be sent to the sheet.

Deployment ID
AKfycbxruXgcRjsnIT2LNcKdAydSvxysc7XB-SqznvEBi05-nisK1C1gX3chmF6hG-MQmGy3
Web app
URL
https://script.google.com/macros/s/AKfycbxruXgcRjsnIT2LNcKdAydSvxysc7XB-SqznvEBi05-nisK1C1gX3chmF6hG-MQmGy3/exec
