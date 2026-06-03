export function normalizeImageSource(image) {
  if (!image) return null;

  if (typeof image === "number") {
    return image;
  }

  if (typeof image === "string") {
    const trimmed = image.trim();
    return trimmed ? { uri: trimmed } : null;
  }

  if (typeof image === "object") {
    if (typeof image.uri === "string" && image.uri.trim()) {
      return { uri: image.uri };
    }

    if (typeof image.default === "number") {
      return image.default;
    }

    if (typeof image.default === "string" && image.default.trim()) {
      return { uri: image.default };
    }

    return image;
  }

  return null;
}
