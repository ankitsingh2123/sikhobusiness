import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const about = formData.get("about") as string | null;
    const file = formData.get("file") as File | null;

    let avatarUrl = undefined;

    if (file && file.size > 0) {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      // Attempt to create the bucket if it doesn't exist
      try {
        await supabase.storage.createBucket('avatars', { public: true });
      } catch (e) {
        // Ignore
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error("Supabase Storage Error:", error);
        return NextResponse.json(
          { error: "Image upload failed. Please ensure you have created an 'avatars' bucket in your Supabase Storage dashboard and made it public." }, 
          { status: 500 }
        );
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
        
      avatarUrl = publicUrl;
    }

    // Update User in DB
    const updateData: any = {};
    if (name) updateData.name = name;
    if (about !== null) updateData.about = about;
    if (avatarUrl) updateData.avatar = avatarUrl;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData
      });
    }

    return NextResponse.json({ success: true, avatarUrl, name });
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
