
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  channelUrl: string;
  image: string;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
}

export interface ReviewItem {
  id: string;
  title: string;
  type: 'monthly' | 'final';
  date: string;
  pdfData?: string; // Base64 string for the PDF file
  pdfName?: string; // Name of the PDF file
  videoUrl?: string; // YouTube or external video link
}
