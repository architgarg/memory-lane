import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Fields, Files, IncomingForm } from 'formidable'
import fs from 'fs'
import FormData from 'form-data'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm()

    form.parse(req, async (err: Error, _fields: Fields, files: Files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the file' })
        return
      }

      const file = Array.isArray(files.fileToUpload)
        ? files.fileToUpload[0]
        : files.fileToUpload

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' })
        return
      }

      const formData = new FormData()
      formData.append('reqtype', 'fileupload')
      formData.append('fileToUpload', fs.createReadStream(file.filepath))

      try {
        const response = await axios.post(
          'https://catbox.moe/user/api.php',
          formData,
          {
            headers: formData.getHeaders(),
          },
        )

        res.status(200).json({ url: response.data })
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' })
      }
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
