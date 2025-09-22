require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "Odinbook";

async function uploadPhoto(file) {
  const filePath = file.originalname;
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.log(JSON.stringify(error));
    throw error;
  } else {
    return getFileUrl(filePath);
  }
}

function getFileUrl(filePath) {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
}

module.exports = {
  uploadPhoto,
};
