import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Compress and optimize image using Sharp
 * Target: Maximum 1MB file size while maintaining quality
 * 
 * @param {string} inputPath - Path to the uploaded image
 * @param {string} outputPath - Path where compressed image will be saved
 * @returns {Promise<{success: boolean, path: string, size: number, error?: string}>}
 */
export const compressImage = async (inputPath, outputPath) => {
  try {
    const stats = fs.statSync(inputPath);
    const originalSizeMB = stats.size / (1024 * 1024);

    // If image is already under 1MB, we can optimize it slightly
    if (originalSizeMB <= 1) {
      // Light optimization without heavy compression
      await sharp(inputPath)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .png({ 
          quality: 85,
          progressive: true,
          compressionLevel: 9
        })
        .webp({ 
          quality: 85
        })
        .toFile(outputPath);

      const compressedStats = fs.statSync(outputPath);
      const compressedSizeMB = compressedStats.size / (1024 * 1024);

      // If still under 1MB, use the optimized version
      if (compressedSizeMB <= 1) {
        return {
          success: true,
          path: outputPath,
          size: compressedStats.size
        };
      }
      // If optimization made it bigger, keep original
      fs.unlinkSync(outputPath);
      fs.copyFileSync(inputPath, outputPath);
      return {
        success: true,
        path: outputPath,
        size: stats.size
      };
    }

    // Image is larger than 1MB - need compression
    let quality = 85;
    let targetSizeMB = 1;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      await sharp(inputPath)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: quality,
          progressive: true,
          mozjpeg: true
        })
        .png({ 
          quality: quality,
          progressive: true,
          compressionLevel: 9
        })
        .webp({ 
          quality: quality
        })
        .toFile(outputPath);

      const compressedStats = fs.statSync(outputPath);
      const compressedSizeMB = compressedStats.size / (1024 * 1024);

      // Success if under 1MB
      if (compressedSizeMB <= targetSizeMB) {
        return {
          success: true,
          path: outputPath,
          size: compressedStats.size,
          originalSize: stats.size,
          compressionRatio: ((1 - compressedSizeMB / originalSizeMB) * 100).toFixed(1)
        };
      }

      // If still too large, reduce quality and try again
      quality -= 10;
      attempts++;

      // If quality gets too low, resize more aggressively
      if (quality < 50) {
        await sharp(inputPath)
          .resize(1600, 1600, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ 
            quality: 75,
            progressive: true,
            mozjpeg: true
          })
          .toFile(outputPath);

        const finalStats = fs.statSync(outputPath);
        const finalSizeMB = finalStats.size / (1024 * 1024);

        // Accept if reasonably close to target (within 1.2MB)
        if (finalSizeMB <= 1.2) {
          return {
            success: true,
            path: outputPath,
            size: finalStats.size,
            originalSize: stats.size,
            compressionRatio: ((1 - finalSizeMB / originalSizeMB) * 100).toFixed(1),
            warning: 'Image compressed to meet size limit. Quality may be reduced.'
          };
        }

        // Last resort: convert to JPEG and compress heavily
        await sharp(inputPath)
          .resize(1600, 1600, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ 
            quality: 70,
            progressive: true,
            mozjpeg: true
          })
          .toFile(outputPath);

        return {
          success: true,
          path: outputPath,
          size: fs.statSync(outputPath).size,
          originalSize: stats.size,
          compressionRatio: ((1 - (fs.statSync(outputPath).size / (1024 * 1024)) / originalSizeMB) * 100).toFixed(1),
          warning: 'Image heavily compressed to meet 1MB limit.'
        };
      }
    }

    // If all attempts failed, return error
    throw new Error('Unable to compress image to target size after multiple attempts');

  } catch (error) {
    console.error('Image compression error:', error);
    
    // Clean up output file if it exists
    if (fs.existsSync(outputPath)) {
      try {
        fs.unlinkSync(outputPath);
      } catch (unlinkError) {
        console.error('Error cleaning up failed compression:', unlinkError);
      }
    }

    return {
      success: false,
      error: error.message,
      path: null
    };
  }
};

/**
 * Get image metadata
 */
export const getImageMetadata = async (imagePath) => {
  try {
    const metadata = await sharp(imagePath).metadata();
    const stats = fs.statSync(imagePath);
    
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: stats.size,
      sizeMB: (stats.size / (1024 * 1024)).toFixed(2)
    };
  } catch (error) {
    console.error('Error getting image metadata:', error);
    return null;
  }
};

