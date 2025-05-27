import { Injectable, InternalServerErrorException } from '@nestjs/common';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.get('S3_REGION');
    const accessKeyId = this.configService.get('S3_ACCESS_KEY');
    const secretAccessKey = this.configService.get('S3_SECRET_ACCESS_KEY');
    this.bucketName = this.configService.get('S3_BUCKET_NAME')!;

    if (!s3_region) {
      throw new Error('S3_REGION not found in environment variables');
    }

    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadSingleFile({
    file,
  }: {
    file: Express.Multer.File;
    isPublic: boolean;
  }) {
    try {
      const key = `${uuidv4()}`;
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',

        Metadata: {
          originalName: file.originalname,
        },
      });

      const uploadResult = await this.client.send(command);
      const location = (await this.getFileUrl(key)).url;

      return {
        location,
        key,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getFileUrl(key: string) {
    return { url: `https://${this.bucketName}.s3.amazonaws.com/${key}` };
  }
}
