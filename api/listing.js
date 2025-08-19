import { google } from 'googleapis';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:L',
    });

    const [headers, ...rows] = response.data.values || [[], []];
    
    const listings = rows.map(row => {
      const listing = {};
      headers.forEach((header, index) => {
        listing[header] = row[index] || '';
      });
      
      return {
        projectTitle: listing['Project Title'] || '',
        location: listing['Location'] || '',
        propertyType: listing['Property Type'] || '',
        roiRange: listing['ROI Range'] || '',
        startingInvestment: listing['Starting Investment'] || '',
        description: listing['Description'] || '',
        mainImage: listing['Main Image URL'] || '',
        galleryImages: listing['Gallery Images'] || '',
        blueprintBasic: listing['Blueprint Basic Price'] || '',
        blueprintStandard: listing['Blueprint Standard Price'] || '',
        blueprintPremium: listing['Blueprint Premium Price'] || '',
        status: listing['Status'] || 'Available'
      };
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}