import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { full, fullWhite, icon } = await req.json();

    const rootDir = process.cwd();
    const publicDir = path.join(rootDir, 'public');
    const assetsDir = path.join(rootDir, 'src', 'assets');

    if (full) {
      const base64Data = full.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(publicDir, 'logo.png'), buf);
      fs.writeFileSync(path.join(assetsDir, 'logo.png'), buf);
    }

    if (fullWhite) {
      const base64Data = fullWhite.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(publicDir, 'logo-white.png'), buf);
      fs.writeFileSync(path.join(assetsDir, 'logo-white.png'), buf);
    }

    if (icon) {
      const base64Data = icon.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(path.join(publicDir, 'icon.png'), buf);
      fs.writeFileSync(path.join(assetsDir, 'icon.png'), buf);
    }

    return NextResponse.json({ success: true, message: 'Logos saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
