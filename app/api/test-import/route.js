import ipcMap from "@/lib/ipc_label_map.json";

export async function GET() {
  const categories = Object.keys(ipcMap);
  
  return Response.json({
    status: "✅ ipcMap imported successfully",
    totalCategories: categories.length,
    sampleCategories: categories.slice(0, 5),
    firstCategory: {
      description: categories[0],
      ipcSection: ipcMap[categories[0]]
    }
  });
}
