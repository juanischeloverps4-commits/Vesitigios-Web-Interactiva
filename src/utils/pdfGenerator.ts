import { LibraryDocumentItem } from '../data/libraryDocumentsData';

/**
 * Downloads the authentic, original PDF document.
 * Utilizes the direct high-speed Google Drive download URL (with Content-Disposition: attachment)
 * which completely avoids browser/proxy streaming timeouts on large files like ELGOLPE.pdf (45 MB),
 * while falling back smoothly to the local static asset.
 */
export function downloadLibraryPdf(docItem: LibraryDocumentItem) {
  const fileName = docItem.pdfFileName;
  const targetUrl = docItem.driveDownloadUrl || `/${encodeURIComponent(fileName)}`;

  const link = document.createElement('a');
  link.href = targetUrl;
  link.setAttribute('download', fileName);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Opens the authentic, original PDF document in a new browser tab for direct reading
 * using the verified Google Drive PDF viewer or local URL.
 */
export function openLibraryPdfInNewTab(docItem: LibraryDocumentItem) {
  const targetUrl = docItem.driveViewUrl || `/${encodeURIComponent(docItem.pdfFileName)}`;
  const link = document.createElement('a');
  link.href = targetUrl;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
