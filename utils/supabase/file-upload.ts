import { createClient } from "@/utils/supabase/client";

export async function uploadFileToSupabase(file: File): Promise<string> {
  const supabase = createClient();
  const fileName = `${Date.now()}-${file.name}`;

  const { data: uploadData, error } = await supabase.storage
    .from("test-results")
    .upload(fileName, file);

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  // const { data: publicUrlData } = supabase.storage.from("test-results").getPublicUrl(fileName);

  // if (!publicUrlData || !publicUrlData.publicUrl) {
  //   throw new Error("Failed to retrieve public URL for the uploaded file.");
  // }

  // return publicUrlData.publicUrl;
  return fileName;
}