'use strict'
const Image = use('App/Models/Image')
class ImageController {
  async index ({ request, response, view }) {
    const images = Image.all()

    return images
  }

  async store ({ request }) {
    const data = request.only(['name', 'file_name'])

    const image = await Image.create(data)

    return image
  }
}

module.exports = ImageController
