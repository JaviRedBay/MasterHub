/**
 * Utilidad de seguridad, validación de imágenes externas y generación de avatares compactos (<= 20 KB)
 * Previene ataques XSS, SSRF local, archivos SVG con scripts, poliglotas y bombas de descompresión.
 */

const MAX_DOWNLOAD_BYTES = 8 * 1024 * 1024; // 8 MB máximo de descarga para evitar DoS
const MAX_AVATAR_DATA_URL_LENGTH = 20 * 1024; // 20 KB estrictos para el avatar del Master Panel
const FETCH_TIMEOUT_MS = 10000; // 10s timeout

const FORBIDDEN_EXTENSIONS = /\.(svg|svgz|html|htm|xhtml|js|mjs|cjs|php|asp|aspx|jsp|exe|bat|cmd|sh|ps1|xml|json|pdf|zip|rar|7z|tar|gz|wasm)(\?|#|$)/i;
const FORBIDDEN_HOSTNAMES = /^(localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|\[::1\]|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|169\.254\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/i;
const DANGEROUS_PAYLOAD_PATTERNS = /(<script|<svg|<!doctype|<html|javascript:|vbscript:|onload\s*=|onerror\s*=|<\?php)/i;

/**
 * Valida sintáctica y semánticamente que una URL externa sea segura para cargar una imagen.
 * @param {string} rawUrl
 * @returns {{ valid: boolean, url?: string, reason?: string }}
 */
export function validateExternalImageUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { valid: false, reason: 'La URL está vacía.' };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: false, reason: 'La URL está vacía.' };
  }

  if (trimmed.length > 2048) {
    return { valid: false, reason: 'La URL supera la longitud máxima permitida (2048 caracteres).' };
  }

  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return { valid: false, reason: 'La URL contiene caracteres de control no permitidos.' };
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, reason: 'El formato de la URL no es válido (debe comenzar por https:// o http://).' };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { valid: false, reason: `Protocolo "${parsed.protocol}" bloqueado por seguridad. Usa únicamente https:// o http://.` };
  }

  if (parsed.username || parsed.password) {
    return { valid: false, reason: 'No se permiten credenciales incrustadas en la URL.' };
  }

  if (!parsed.hostname || FORBIDDEN_HOSTNAMES.test(parsed.hostname)) {
    return { valid: false, reason: 'El dominio o dirección de red local no está permitido por seguridad.' };
  }

  if (FORBIDDEN_EXTENSIONS.test(parsed.pathname)) {
    return { valid: false, reason: 'Tipo de archivo bloqueado por seguridad. Solo se permiten imágenes rasterizadas (JPG, PNG, WebP, GIF, AVIF).' };
  }

  return { valid: true, url: parsed.href };
}

/**
 * Comprueba de forma rápida si una cadena es una URL externa segura (para sanitización de estado/JSON).
 * @param {string} str
 * @returns {boolean}
 */
export function isSafeExternalImageUrl(str) {
  if (!str || typeof str !== 'string') return false;
  return validateExternalImageUrl(str).valid;
}

/**
 * Comprueba si un Data URL de avatar generado es estrictamente una imagen rasterizada en base64 y <= 25 KB.
 * @param {string} dataUrl
 * @returns {boolean}
 */
export function isSafeAvatarDataUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return false;
  if (dataUrl.length > 26 * 1024) return false;
  return /^data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(dataUrl);
}

/**
 * Verifica los Magic Bytes (firma binaria real) del archivo descargado y escanea la cabecera
 * para descartar HTML, SVG, scripts o ejecutables camuflados.
 * @param {Uint8Array} bytes
 * @returns {{ valid: boolean, detectedMime?: string, reason?: string }}
 */
export function verifyImageMagicBytes(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength < 12) {
    return { valid: false, reason: 'El archivo descargado está vacío o truncado.' };
  }

  // Escaneo anti-script / anti-SVG / anti-HTML en los primeros 1024 bytes
  const headSlice = bytes.subarray(0, Math.min(1024, bytes.byteLength));
  let headText = '';
  for (let i = 0; i < headSlice.length; i++) {
    const code = headSlice[i];
    if (code >= 32 && code <= 126) {
      headText += String.fromCharCode(code);
    } else if (code === 9 || code === 10 || code === 13) {
      headText += ' ';
    }
  }
  if (DANGEROUS_PAYLOAD_PATTERNS.test(headText)) {
    return { valid: false, reason: 'Se ha detectado código ejecutable, HTML o SVG potencialmente peligroso en el archivo.' };
  }

  // 1. JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { valid: true, detectedMime: 'image/jpeg' };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
    bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A
  ) {
    return { valid: true, detectedMime: 'image/png' };
  }

  // 3. WebP: "RIFF" .... "WEBP"
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return { valid: true, detectedMime: 'image/webp' };
  }

  // 4. GIF: "GIF87a" o "GIF89a"
  if (
    bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61
  ) {
    return { valid: true, detectedMime: 'image/gif' };
  }

  // 5. BMP: "BM"
  if (bytes[0] === 0x42 && bytes[1] === 0x4D) {
    return { valid: true, detectedMime: 'image/bmp' };
  }

  // 6. AVIF / HEIF: .... "ftypavif" o "ftypavis"
  if (
    bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70 &&
    bytes[8] === 0x61 && bytes[9] === 0x76 && bytes[10] === 0x69
  ) {
    return { valid: true, detectedMime: 'image/avif' };
  }

  return {
    valid: false,
    reason: 'La firma binaria (Magic Bytes) no corresponde a una imagen válida (se requiere JPG, PNG, WebP, GIF o AVIF).'
  };
}

/**
 * Descarga de forma acotada los bytes de una URL de respuesta y valida cabeceras y firma binaria.
 * @param {string} targetUrl
 * @returns {Promise<{ blob: Blob, detectedMime: string }>}
 */
async function downloadAndInspectBytes(targetUrl) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      redirect: 'follow',
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`El servidor respondió con estado HTTP ${response.status}.`);
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (
      contentType.includes('svg') ||
      contentType.includes('html') ||
      contentType.includes('javascript') ||
      contentType.includes('xml') ||
      contentType.includes('json') ||
      contentType.includes('text/')
    ) {
      throw new Error(`El servidor devolvió un tipo de contenido no permitido (${contentType}). Solo se admiten imágenes.`);
    }

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > MAX_DOWNLOAD_BYTES) {
      throw new Error('La imagen supera el límite de seguridad de 8 MB.');
    }

    // Lectura controlada por stream para evitar desbordamiento de memoria
    let bytes;
    if (response.body && typeof response.body.getReader === 'function') {
      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          receivedLength += value.byteLength;
          if (receivedLength > MAX_DOWNLOAD_BYTES) {
            await reader.cancel();
            throw new Error('La descarga superó el límite de seguridad de 8 MB.');
          }
          chunks.push(value);
        }
      }

      bytes = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, position);
        position += chunk.byteLength;
      }
    } else {
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength > MAX_DOWNLOAD_BYTES) {
        throw new Error('La imagen supera el límite de seguridad de 8 MB.');
      }
      bytes = new Uint8Array(buffer);
    }

    const magicCheck = verifyImageMagicBytes(bytes);
    if (!magicCheck.valid) {
      throw new Error(magicCheck.reason);
    }

    return {
      blob: new Blob([bytes], { type: magicCheck.detectedMime }),
      detectedMime: magicCheck.detectedMime
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Descarga la imagen externa (intentando CORS directo y fallback seguro si el servidor remoto bloquea CORS),
 * verifica que es una imagen real mediante Magic Bytes + decodificación nativa, y genera un avatar
 * re-codificado en Canvas de <= 20 KB libre de metadatos o código oculto.
 *
 * @param {string} rawUrl URL externa introducida por el usuario
 * @param {number} maxDataUrlLength Límite máximo en bytes del Data URL (por defecto 20 KB = 20480)
 * @returns {Promise<{ validUrl: string, avatarThumb: string, byteSize: number, kbSize: string, width: number, height: number, detectedMime: string }>}
 */
export async function generateMasterPanelAvatarFromUrl(rawUrl, maxDataUrlLength = MAX_AVATAR_DATA_URL_LENGTH) {
  const urlValidation = validateExternalImageUrl(rawUrl);
  if (!urlValidation.valid) {
    throw new Error(urlValidation.reason);
  }

  const cleanUrl = urlValidation.url;
  let downloadResult;

  try {
    // 1. Intento directo con CORS estricto
    downloadResult = await downloadAndInspectBytes(cleanUrl);
  } catch (directErr) {
    // Si el fallo es por contenido peligroso o Magic Bytes inválidos, rechazar inmediatamente
    if (
      directErr.message &&
      (directErr.message.includes('firma binaria') ||
       directErr.message.includes('código ejecutable') ||
       directErr.message.includes('tipo de contenido no permitido') ||
       directErr.message.includes('límite de seguridad'))
    ) {
      throw directErr;
    }

    // 2. Fallback para servidores de imágenes que no envían cabecera Access-Control-Allow-Origin
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=400&h=400&fit=cover&output=webp`;
    try {
      downloadResult = await downloadAndInspectBytes(proxyUrl);
    } catch (proxyErr) {
      throw new Error(
        directErr.message && !directErr.message.includes('Failed to fetch')
          ? directErr.message
          : 'No se pudo descargar o verificar como imagen válida la URL indicada.'
      );
    }
  }

  // 3. Decodificación real en el motor de imágenes del navegador
  const objectUrl = URL.createObjectURL(downloadResult.blob);
  try {
    const img = await new Promise((resolve, reject) => {
      const imageEl = new Image();
      imageEl.onload = () => resolve(imageEl);
      imageEl.onerror = () => reject(new Error('El archivo no pudo decodificarse como una imagen válida.'));
      imageEl.src = objectUrl;
    });

    const natW = img.naturalWidth || img.width;
    const natH = img.naturalHeight || img.height;

    if (!natW || !natH || natW < 8 || natH < 8) {
      throw new Error('Las dimensiones de la imagen son demasiado pequeñas o inválidas.');
    }
    if (natW > 8192 || natH > 8192) {
      throw new Error('Las dimensiones de la imagen superan el límite de seguridad (8192x8192 px).');
    }

    // 4. Re-codificación limpia en Canvas (elimina EXIF, metadatos y cualquier payload no-píxel)
    // Recorte cuadrado inteligente: centrado horizontalmente y ligeramente orientado a la zona superior en retratos verticales
    const cropSize = Math.min(natW, natH);
    const sx = Math.round((natW - cropSize) / 2);
    const sy = natH > natW ? Math.round((natH - cropSize) * 0.18) : Math.round((natH - cropSize) / 2);

    const candidateSizes = [160, 144, 128, 112, 96];
    const candidateQualities = [0.82, 0.72, 0.62, 0.52, 0.42];

    let finalDataUrl = '';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    outerLoop:
    for (const targetDim of candidateSizes) {
      canvas.width = targetDim;
      canvas.height = targetDim;
      ctx.clearRect(0, 0, targetDim, targetDim);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, targetDim, targetDim);

      for (const quality of candidateQualities) {
        let attempt = canvas.toDataURL('image/webp', quality);
        if (!attempt.startsWith('data:image/webp')) {
          attempt = canvas.toDataURL('image/jpeg', quality);
        }
        finalDataUrl = attempt;
        if (attempt.length <= maxDataUrlLength) {
          break outerLoop;
        }
      }
    }

    if (!finalDataUrl || !isSafeAvatarDataUrl(finalDataUrl)) {
      throw new Error('No fue posible generar un avatar seguro por debajo de 20 KB.');
    }

    const byteSize = finalDataUrl.length;
    const kbSize = (byteSize / 1024).toFixed(1);

    return {
      validUrl: cleanUrl,
      avatarThumb: finalDataUrl,
      byteSize,
      kbSize,
      width: natW,
      height: natH,
      detectedMime: downloadResult.detectedMime
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

