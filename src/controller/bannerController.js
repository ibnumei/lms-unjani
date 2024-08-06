const Multer = require('multer');
const { logError } = require('../util/ServerTool');
const { bannerService } = require('../service/index');

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

class BannerController {
  static async uploadBanner(req, res) {
    try {
      upload.single('file')(req, res, async (ex) => {
        if (ex) {
          res.status(400);
          res.json({ success: false, message: 'Failed to upload',  })
        } else {
          const data = await bannerService.bannerUpload(req.body, req.file, req.decodedJwt.username)
          res.json({ success: true, message: 'Success to upload', data  })
        }
      })
    } catch (ex) {
      console.log(ex)
      logError('BannerController.getUserDb', ex);
      res.json({ success: false, message: 'Fail to get user', ex });
    }
  }

  static async getBanner(req, res) {
    try {
      const data = await bannerService.getBanner();
      res.json({ success: true, data });
    } catch (ex) {
      logError('BannerController.getHomeBanner', ex);
      res.json({ success: false, message: 'Fail to get Home Banner', ex });
    }
  }

}

module.exports = BannerController;
