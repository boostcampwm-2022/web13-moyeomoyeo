export abstract class ImageStore {
  abstract upload(file: Express.Multer.File): Promise<string>;
}
