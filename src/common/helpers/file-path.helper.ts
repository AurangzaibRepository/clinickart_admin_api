export function getUploadPath(filePath?: string): string | undefined {
  if (!filePath) {
    return undefined;
  }

  return filePath.replace(/\\/g, '/').replace(/^uploads\//, '');
}

export function getFileUrl(
  filePath: string | null | undefined,
  baseUrl: string,
): string | null {
  if (!filePath) {
    return null;
  }

  return `${baseUrl}/${filePath}`;
}
