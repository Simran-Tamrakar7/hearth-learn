"use client";

/* ============================================================================
 * HEADING: SHARED — ImageField (paste URL or upload file)
 * Used by: /manuals, /library, /rest/games, /rest/cookbook, /showcase-wall
 * ponytail: uploads become data URLs (localStorage quota ~5MB). Upgrade: /api/uploads.
 * ========================================================================== */

export function ImageField({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const shown = value.startsWith("data:") ? "" : value;

  function onFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-1.5">
      <span className="block text-[11px] font-semibold text-[#52635E]">{label}</span>
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-1.5 min-w-0">
          <input
            type="url"
            value={shown}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL"
            aria-label={`${label} URL`}
            className="w-full h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
          />
          <label className="inline-flex items-center h-8 px-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] text-[11px] font-semibold text-[#52635E] cursor-pointer hover:border-[#1C2A26]">
            Upload file
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        {value ? (
          <img src={value} alt="" className="h-16 w-16 rounded-xl object-cover border border-[#E7E0D3] shrink-0" />
        ) : (
          <div className="h-16 w-16 rounded-xl border border-dashed border-[#E7E0D3] bg-[#FAF7F2] shrink-0" />
        )}
      </div>
    </div>
  );
}
