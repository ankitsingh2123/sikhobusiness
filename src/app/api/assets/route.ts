import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  const basePath = 'C:/Users/ankit/.gemini/antigravity/brain/c7cad261-ec1f-4da9-85f7-0a474797c227';
  let filename = '';
  
  if (name === 'business') filename = 'business_tech_3d_1777288932303.png';
  if (name === 'creative') filename = 'creative_art_3d_1777288949032.png';
  if (name === 'finance') filename = 'finance_growth_3d_1777288965499.png';

  if (!filename) return new NextResponse('Not found', { status: 404 });

  const filePath = path.join(basePath, filename);
  
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: { 
        'Content-Type': 'image/png', 
        'Cache-Control': 'public, max-age=31536000' 
      }
    });
  } catch (e) {
    return new NextResponse('File not found', { status: 404 });
  }
}
