import httpClient from "@/app/lib/api";
import axios from "axios";

// ฟังก์ชันสุ่ม ID 4 หลัก
export const generateShortId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// ฟังก์ชันหา ID ที่ไม่ซ้ำ
export const getUniqueId = async (): Promise<string> => {
  let isUnique = false;
  let newId = "";
  
  while (!isUnique) {
    newId = generateShortId();
    try {
      const { exists } = await httpClient.get<{ exists: boolean }>(`/blogs/check-id/${newId}`);
      if (!exists) isUnique = true;
    } catch (error) {
      // ถ้าเช็คไม่ได้ ให้ถือว่าใช้ได้ (หรือจัดการตามความเหมาะสม)
      isUnique = true;
    }
  }
  return newId;
};

// ฟังก์ชันช่วยอัปโหลดไฟล์ไปยัง Storage ตามโฟลเดอร์ ID
export const uploadFileToFolder = async (file: File, folderId: string): Promise<string> => {
  const { uploadUrl, publicUrl } = await httpClient.get<{ uploadUrl: string, publicUrl: string }>(
    `/admin/upload/signed-url`,
    {
      params: {
        filename: file.name,
        contentType: file.type,
        folder: `blogs/${folderId}` // ใช้ ID 4 หลักเป็นชื่อโฟลเดอร์
      }
    }
  );

  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type }
  });

  return publicUrl;
};

// ฟังก์ชันลบไฟล์รูปภาพ
export const deleteFileFromStorage = async (url: string): Promise<void> => {
  try {
    await httpClient.delete(`/admin/upload`, { params: { url } });
  } catch (error) {
    console.error("Failed to delete file:", url, error);
  }
};

