import fs from 'fs';
import path from 'path';

// Helper function to save waitlist entries locally as a backup
// This is a fallback in case the Supabase database connection fails
export async function saveSubmissionToFile(data: any) {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'waitlist-data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create a filename based on date and restaurant name
    const sanitizedName = data.restaurantName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const filename = `${new Date().toISOString().split('T')[0]}-${sanitizedName}.json`;
    const filePath = path.join(dataDir, filename);
    
    // Add timestamp to the data
    const submissionData = {
      ...data,
      submissionTime: new Date().toISOString(),
    };
    
    // Write the data to a file
    fs.writeFileSync(filePath, JSON.stringify(submissionData, null, 2));
    
    return { success: true, filePath };
  } catch (error) {
    console.error('Failed to save submission to file:', error);
    return { success: false, error };
  }
}

// Helper function to retrieve all submissions
export function getAllSubmissions() {
  try {
    const dataDir = path.join(process.cwd(), 'waitlist-data');
    if (!fs.existsSync(dataDir)) {
      return { success: true, submissions: [] };
    }
    
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    const submissions = files.map(file => {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
      return JSON.parse(content);
    });
    
    return { success: true, submissions };
  } catch (error) {
    console.error('Failed to retrieve submissions:', error);
    return { success: false, error };
  }
} 