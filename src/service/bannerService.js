const { fileDao } = require('../dao');

class BannerService {
  static async bannerUpload(body, file, username) {
    const payload = {
      ...body,
      file_name: file.originalname,
      file_type: file.mimetype,
      file: file.buffer
    }
    return fileDao.saveFile(payload, username)
  }

  static async getBanner() {
    return fileDao.getBanner();
  }
}

module.exports = BannerService;
