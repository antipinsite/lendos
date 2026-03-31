import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
    const params = event.context.params?.path

    const path = Array.isArray(params)
        ? params.join('/')
        : params || ''

    const url = `http://localhost:1337/uploads/${path}`

    const response = await fetch(url)

    if (!response.ok) {
        throw createError({
            statusCode: response.status,
            statusMessage: 'Image not found'
        })
    }

    // пробрасываем content-type
    const contentType = response.headers.get('content-type')
    if (contentType) {
        setHeader(event, 'content-type', contentType)
    }

    return sendStream(event, response?.body)
})