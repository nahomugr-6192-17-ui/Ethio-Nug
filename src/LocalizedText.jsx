import { KewtiFonts } from "kewti_components";

export default function LocalizedText({
  lang,
  children,
  className = "",
  type = "body",
}) {

  // Choose font based on text type
  const font =
    type === "heading"
      ? "abinet"
      : "menbere";

  // Amharic only
  if (lang === "am") {
    return (
      <KewtiFonts font={font}>
        <span className={className}>
          {children}
        </span>
      </KewtiFonts>
    );
  }

  // English fallback
  return (
    <span className={className}>
      {children}
    </span>
  );
}